
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import toast from "react-hot-toast";
import Topbar from "../components/topbar";
import { useApplication } from "../context/ApplicationContext";


function ChevronRight() {
  return (
    <svg width="5" height="7" viewBox="0 0 5 7" fill="none">
      <path
        d="M2.68333 3.5L0 0.816667L0.816667 0L4.31667 3.5L0.816667 7L0 6.18333L2.68333 3.5Z"
        fill="#44474E"
      />
    </svg>
  );
}


export default function ApplicationReview() {

  const [user, setUser] = useState<any>(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const [applicationData, setApplicationData] =
    useState<any>(null);

  const [remarks, setRemarks] = useState("");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [recommendation, setRecommendation] =
    useState<
      | "recommended_with_salary"
      | "recommended_without_salary"
      | "not_recommended"
      | ""
    >("");

  const [approval, setApproval] =
    useState<
      | "approved_with_salary"
      | "approved_without_salary"
      | "not_approved"
      | ""
    >("");

  const [signature, setSignature] =
    useState<File | null>(null);


  const {
    applicationData: contextApplicationData
  } = useApplication();


  // ======================================
  // GET LOGGED-IN USER
  // ======================================

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    console.log("Stored User:", storedUser);

    if (!storedUser) {

      navigate("/");

      return;

    }

    setUser(JSON.parse(storedUser));

  }, [navigate]);


  // ======================================
  // FETCH APPLICATION
  // ======================================

  useEffect(() => {

    if (!id) return;

    axios.get(
      `http://127.0.0.1:8000/api/applications/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`
        }
      }
    )

      .then((res) => {

        console.log(
          "Application Response:",
          res.data
        );

        setApplicationData(res.data);

      })

      .catch((err) => {

        console.error(
          "Application Fetch Error:",
          err
        );

        toast.error(
          "Failed to load application."
        );

      });

  }, [id]);


  // ======================================
  // CURRENT ROLE
  // ======================================

  const currentRole =
    applicationData?.application?.current_step?.role?.role_name;


  console.log("Current Role:", currentRole);


  // ======================================
  // ROLE CONDITIONS
  // ======================================

  const isSubjectOfficer =
    currentRole === "Subject Officer";


  const isCheckOfficer =
    currentRole === "Check Officer";


  const isRecommendedOfficer =
    currentRole === "Recommended Officer" || currentRole === "Recommended Officer-II" || currentRole === "Recommended Officer-III";


  const isChiefSecretary =
    currentRole === "Chief Secretary";


  // ======================================
  // BUTTON PERMISSIONS
  // ======================================

  const canForward =
    isSubjectOfficer ||
    isCheckOfficer ||
    isRecommendedOfficer;


  const canReturn =
    isSubjectOfficer ||
    isCheckOfficer ||
    isRecommendedOfficer ||
    isChiefSecretary;


  const canComplete =
    isChiefSecretary;


  // ======================================
  // DISABLE CONDITIONS
  // ======================================

  const isReturnDisable =
    (
      isRecommendedOfficer &&
      recommendation !== "not_recommended"
    ) ||
    (
      isChiefSecretary &&
      approval !== "not_approved"
    );


  const isForwardDisable =
    isRecommendedOfficer &&
    recommendation === "not_recommended";


  const isCompleteDisable =
    isChiefSecretary &&
    approval === "not_approved";


  // ======================================
  // SIGNATURE PREVIEW
  // ======================================

  const handleSignatureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      e.target.files?.[0] || null;

    setSignature(file);

  };


  // ======================================
  // APPROVE / COMPLETE
  // ======================================

  const handleApprove = async () => {

    try {

      if (!isChiefSecretary) {

        toast.error(
          "Only Chief Secretary can complete."
        );

        return;

      }


      if (!approval) {

        toast.error(
          "Please select Approved or Not Approved."
        );

        return;

      }


      if (!signature) {

        toast.error(
          "Please upload your signature."
        );

        return;

      }


      const token =
        localStorage.getItem("token");


      const formData = new FormData();

      formData.append(
        "remarks",
        remarks
      );

      formData.append(
        "approval",
        approval
      );

      formData.append(
        "signature",
        signature
      );


      const response = await axios.post(

        `http://127.0.0.1:8000/api/applications/${id}/approve`,

        formData,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );


      toast.success(
        response.data.message
      );


      navigate("/dashboard");


    } catch (error: any) {

      console.error(error);


      if (
        error.response?.status === 422
      ) {

        const errors =
          error.response.data.errors;

        Object.values(errors).forEach(
          (messages: any) => {

            toast.error(messages[0]);

          }
        );

        return;

      }


      toast.error(

        error.response?.data?.error ||

        error.response?.data?.message ||

        "Something went wrong."

      );

    }

  };


  // ======================================
  // FORWARD
  // ======================================

  const handleForward = async () => {

    try {

      if (!canForward) {

        toast.error(
          "You are not allowed to forward."
        );

        return;

      }


      if (isRecommendedOfficer) {

        if (!recommendation) {

          toast.error(
            "Please select Recommendation."
          );

          return;

        }


        if (!signature) {

          toast.error(
            "Please upload your signature."
          );

          return;

        }

      }


      const token =
        localStorage.getItem("token");


      const formData = new FormData();


      formData.append(
        "remarks",
        remarks
      );


      if (isRecommendedOfficer) {

        formData.append(
          "recommendation",
          recommendation
        );

        formData.append(
          "signature",
          signature as File
        );

      }


      const response = await axios.post(

        `http://127.0.0.1:8000/api/applications/${id}/forward`,

        formData,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "multipart/form-data"

          }
        }

      );


      toast.success(
        response.data.message
      );


      navigate("/dashboard");


    } catch (error: any) {

      console.error(error);


      if (
        error.response?.status === 422
      ) {

        const errors =
          error.response.data.errors;

        Object.values(errors).forEach(
          (messages: any) => {

            toast.error(messages[0]);

          }
        );

        return;

      }


      toast.error(

        error.response?.data?.error ||

        error.response?.data?.message ||

        "Something went wrong."

      );

    }

  };


  // ======================================
  // RETURN
  // ======================================

  const handleReturn = async () => {

    try {

      if (!canReturn) {

        toast.error(
          "You are not allowed to return."
        );

        return;

      }


      if (isRecommendedOfficer) {

        if (!recommendation) {

          toast.error(
            "Please select Recommended or Not Recommended."
          );

          return;

        }


        if (!signature) {

          toast.error(
            "Please upload your signature."
          );

          return;

        }

      }


      const token =
        localStorage.getItem("token");


      const formData = new FormData();


      formData.append(
        "remarks",
        remarks
      );


      if (isRecommendedOfficer) {

        formData.append(
          "recommendation",
          recommendation
        );

        formData.append(
          "signature",
          signature as File
        );

      }


      const response = await axios.post(

        `http://127.0.0.1:8000/api/applications/${id}/return`,

        formData,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "multipart/form-data"

          }
        }

      );


      toast.success(
        response.data.message
      );


      navigate("/dashboard");


    } catch (error: any) {

      console.error(error);


      if (
        error.response?.status === 422
      ) {

        const errors =
          error.response.data.errors;

        Object.values(errors).forEach(
          (messages: any) => {

            toast.error(messages[0]);

          }
        );

        return;

      }


      toast.error(

        error.response?.data?.error ||

        error.response?.data?.message ||

        "Something went wrong."

      );

    }

  };


  // ======================================
  // PAGE UI
  // ======================================

  return (

    <div className="flex h-screen bg-[#FAF9FD] font-[Inter,sans-serif] overflow-hidden relative">


      {/* MOBILE SIDEBAR */}

      <Navbar
        user={user}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />


      {/* MAIN AREA */}

      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">


        {/* TOPBAR */}

        <Topbar
          user={user}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />


        {/* CONTENT */}

        <main className="flex-1 px-4 sm:px-6 py-6 space-y-8 overflow-y-auto">


          {/* PAGE HEADER */}

          <div>

            <nav className="flex items-center gap-2 mb-3">

              <span className="text-[#44474E] text-xs font-semibold leading-4">
                Home
              </span>

              <ChevronRight />

              <span className="text-[#44474E] text-xs font-semibold leading-4">
                Leave Request
              </span>

              <ChevronRight />

              <span className="text-[#002046] font-['Noto_Sans_Sinhala'] text-xs font-bold leading-4">
                {applicationData?.application?.application_no}
              </span>

            </nav>

          </div>


          {/* REVIEW SECTION */}

          <div className="flex flex-col gap-8 p-8">


            <div className="bg-white rounded-lg shadow p-6">


              {/* ======================================
                  REMARKS
                  ====================================== */}

              <h2 className="text-xl font-semibold mb-4">
                Add Your Comment
              </h2>


              <textarea
                rows={5}
                value={remarks}
                onChange={(e) =>
                  setRemarks(e.target.value)
                }
                className="w-full border rounded-lg p-3"
                placeholder="Write your review remarks..."
              />


              {/* ======================================
                  RECOMMENDATION SECTION
                  ONLY RECOMMENDED OFFICER
                  ====================================== */}

              {isRecommendedOfficer && (

                <div className="mt-6 border-t pt-6">

                  <h3 className="text-lg font-semibold text-[#002046] mb-4">
                    Recommendation
                  </h3>


                  <div className="flex gap-8 flex-wrap">


                    {/* RECOMMENDED WITH SALARY */}

                    <label className="flex items-center gap-2 cursor-pointer">

                      <input
                        type="radio"
                        name="recommendation"
                        value="recommended_with_salary"
                        checked={
                          recommendation ===
                          "recommended_with_salary"
                        }
                        onChange={() =>
                          setRecommendation(
                            "recommended_with_salary"
                          )
                        }
                        className="w-4 h-4"
                      />

                      <span>
                        Recommended with salary
                      </span>

                    </label>


                    {/* RECOMMENDED WITHOUT SALARY */}

                    <label className="flex items-center gap-2 cursor-pointer">

                      <input
                        type="radio"
                        name="recommendation"
                        value="recommended_without_salary"
                        checked={
                          recommendation ===
                          "recommended_without_salary"
                        }
                        onChange={() =>
                          setRecommendation(
                            "recommended_without_salary"
                          )
                        }
                        className="w-4 h-4"
                      />

                      <span>
                        Recommended without salary
                      </span>

                    </label>


                    {/* NOT RECOMMENDED */}

                    <label className="flex items-center gap-2 cursor-pointer">

                      <input
                        type="radio"
                        name="recommendation"
                        value="not_recommended"
                        checked={
                          recommendation ===
                          "not_recommended"
                        }
                        onChange={() =>
                          setRecommendation(
                            "not_recommended"
                          )
                        }
                        className="w-4 h-4"
                      />

                      <span>
                        Not recommended
                      </span>

                    </label>

                  </div>


                  {/* RECOMMENDED OFFICER SIGNATURE */}

                  <div className="mt-6">

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Your Signature
                    </label>


                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={handleSignatureChange}
                      className="block w-full border rounded-lg p-3"
                    />


                    {signature && (

                      <div className="mt-4">

                        <p className="text-sm text-green-600 mb-2">
                          Selected: {signature.name}
                        </p>


                        <div className="border rounded-lg p-4 bg-gray-50 w-fit">

                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Signature Preview
                          </p>


                          <img
                            src={URL.createObjectURL(signature)}
                            alt="Signature Preview"
                            className="max-w-100 max-h-50 object-contain border rounded bg-white"
                          />

                        </div>

                      </div>

                    )}

                  </div>

                </div>

              )}


              {/* ======================================
                  APPROVAL SECTION
                  ONLY CHIEF SECRETARY
                  ====================================== */}

              {isChiefSecretary && (

                <div className="mt-6 border-t pt-6">

                  <h3 className="text-lg font-semibold text-[#002046] mb-4">
                    Approval
                  </h3>


                  <div className="flex gap-8 flex-wrap">


                    {/* APPROVED WITH SALARY */}

                    <label className="flex items-center gap-2 cursor-pointer">

                      <input
                        type="radio"
                        name="approval"
                        value="approved_with_salary"
                        checked={
                          approval ===
                          "approved_with_salary"
                        }
                        onChange={() =>
                          setApproval(
                            "approved_with_salary"
                          )
                        }
                        className="w-4 h-4"
                      />

                      <span>
                        Approved with salary
                      </span>

                    </label>


                    {/* APPROVED WITHOUT SALARY */}

                    <label className="flex items-center gap-2 cursor-pointer">

                      <input
                        type="radio"
                        name="approval"
                        value="approved_without_salary"
                        checked={
                          approval ===
                          "approved_without_salary"
                        }
                        onChange={() =>
                          setApproval(
                            "approved_without_salary"
                          )
                        }
                        className="w-4 h-4"
                      />

                      <span>
                        Approved without salary
                      </span>

                    </label>


                    {/* NOT APPROVED */}

                    <label className="flex items-center gap-2 cursor-pointer">

                      <input
                        type="radio"
                        name="approval"
                        value="not_approved"
                        checked={
                          approval ===
                          "not_approved"
                        }
                        onChange={() =>
                          setApproval(
                            "not_approved"
                          )
                        }
                        className="w-4 h-4"
                      />

                      <span>
                        Not Approved
                      </span>

                    </label>

                  </div>


                  {/* CHIEF SECRETARY SIGNATURE */}

                  <div className="mt-6">

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Your Signature
                    </label>


                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={handleSignatureChange}
                      className="block w-full border rounded-lg p-3"
                    />


                    {signature && (

                      <div className="mt-4">

                        <p className="text-sm text-green-600 mb-2">
                          Selected: {signature.name}
                        </p>


                        <div className="border rounded-lg p-4 bg-gray-50 w-fit">

                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Signature Preview
                          </p>


                          <img
                            src={URL.createObjectURL(signature)}
                            alt="Signature Preview"
                            className="max-w-100 max-h-50 object-contain border rounded bg-white"
                          />

                        </div>

                      </div>

                    )}

                  </div>

                </div>

              )}


              {/* ======================================
                  ROLE-BASED ACTION BUTTONS
                  ====================================== */}

              <div className="flex justify-end mt-5 gap-2 flex-wrap">


                {/* RETURN BUTTON */}

                {canReturn && (

                  <button
                    onClick={handleReturn}
                    disabled={isReturnDisable}
                    className={`px-6 py-2 rounded text-white ${
                      isReturnDisable
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#8b090d] hover:bg-[#6f070a]"
                    }`}
                  >
                    Return
                  </button>

                )}


                {/* FORWARD BUTTON */}

                {canForward && (

                  <button
                    onClick={handleForward}
                    disabled={isForwardDisable}
                    className={`text-white px-6 py-2 rounded ${
                      isForwardDisable
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#002046] hover:bg-[#00152f]"
                    }`}
                  >
                    Forward
                  </button>

                )}


                {/* COMPLETE BUTTON */}

                {canComplete && (

                  <button
                    onClick={handleApprove}
                    disabled={isCompleteDisable}
                    className={`text-white px-6 py-2 rounded ${
                      isCompleteDisable
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-800 hover:bg-green-900"
                    }`}
                  >
                    Complete
                  </button>

                )}

              </div>


            </div>


          </div>


        </main>


        {/* FOOTER */}

        <Footer />


      </div>


    </div>

  );

}