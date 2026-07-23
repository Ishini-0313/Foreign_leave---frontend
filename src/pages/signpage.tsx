import { RotateCcw, ChevronsRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SignaturePad from "signature_pad";
import { useApplication } from "../context/ApplicationContext";
import axios from "axios";
import Navbar from "../components/navbar";
import Topbar from "../components/topbar";
import toast from "react-hot-toast";
import Footer from "../components/footer";

function ChevronRight() {
  return (
    <svg width="5" height="7" viewBox="0 0 5 7" fill="none">
      <path d="M2.68333 3.5L0 0.816667L0.816667 0L4.31667 3.5L0.816667 7L0 6.18333L2.68333 3.5Z" fill="#44474E" />
    </svg>
  );
}

export default function SignPage() {
  const {id} = useParams();
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { applicationData,setApplicationData, isEditMode, setIsEditMode, applicationId, setApplicationId,existingSignature  } = useApplication();

  // load logged user
  useEffect(()=>{
    console.log("signpage :"+ isEditMode );
    const storedUser = localStorage.getItem("user");
    console.log("Stored User:", storedUser);
    if(!storedUser){
      navigate("/");
      return;
    }
    setUser(JSON.parse(storedUser));
  },[]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);
  

  useEffect(()=>{
    console.log("Existing Signature URL:", existingSignature);
    console.log("applicationData.signature:", applicationData.signature);
  },[existingSignature, applicationData.signature]);

  const saveSignature = () => {
    if (!signaturePadRef.current) return;

    if (signaturePadRef.current.isEmpty()) {
        toast.error("Please draw your signature first.");
        return;
    }
    
    const signatureData = signaturePadRef.current.toDataURL("image/png");

    setApplicationData((prev: any) => ({
      ...prev,
      signature: signatureData,
    }));

    toast.success("Signature saved!");
  };

  const clearSignature = () => {
    if (!signaturePadRef.current || !canvasRef.current) return;

    signaturePadRef.current.clear();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    setApplicationData((prev: any) => ({
      ...prev,
      signature: "",
    }));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ratio = Math.max(window.devicePixelRatio || 1, 1);

    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(ratio, ratio);

    const signaturePad = new SignaturePad(canvas, {
      penColor: "#1A1B1E",
      minWidth: 1,
      maxWidth: 3,
    });

    signaturePadRef.current = signaturePad;

    if (existingSignature) {
      const img = new Image();

      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(
          img,
          0,
          0,
          canvas.offsetWidth,
          canvas.offsetHeight
        );
      };

      img.src = existingSignature;
    }
  }, [existingSignature]);

  const submitApplication = async()=>{
    try{
      const formData = new FormData();

      formData.append("name", applicationData.name);
      formData.append("position", applicationData.position);
      formData.append("service_id", applicationData.service_id);

      formData.append("dob", applicationData.dob);
      formData.append("nic", applicationData.nic);

      formData.append("ministry_id", applicationData.ministry_id);
      formData.append("institute_id", applicationData.institute_id);

      formData.append("arrangement_made_to_cover_duty", applicationData.arrangement_made_to_cover_duty);

      formData.append("purpose", applicationData.purpose);
      formData.append("nature_of_trip", applicationData.nature_of_trip);
      formData.append("awarding_agency", applicationData.awarding_agency);
      formData.append("expenses_mainly_to_be_met", applicationData.expenses_mainly_to_be_met);
      formData.append("goslFunds", JSON.stringify(applicationData.goslFunds));
      formData.append("foreign_loan_project_particulars_thereof", applicationData.foreign_loan_project_particulars_thereof);
      formData.append("commencement_date_of_trainig", applicationData.commencement_date_of_trainig);
      formData.append("completion_date_of_trainig", applicationData.completion_date_of_trainig);
      formData.append("departure_date", applicationData.departure_date);
      formData.append("return_date", applicationData.return_date);
      formData.append("country", applicationData.country);
      formData.append("foreign_address", applicationData.foreign_address);
      formData.append("foreign_phone", applicationData.foreign_phone);
      formData.append("foreign_fax", applicationData.foreign_fax);
      formData.append("foreign_email", applicationData.foreign_email);
      formData.append("has_previous_trip_report_submitted", applicationData.has_previous_trip_report_submitted);

      formData.append("previousTravels", JSON.stringify(applicationData.previousTravels));

      formData.append("name_and_designation", applicationData.name_and_designation);
      formData.append("class_or_grade", applicationData.class_or_grade);
      formData.append("first_appoinment_date", applicationData.first_appoinment_date);
      formData.append("last_return_date", applicationData.last_return_date);
      formData.append("leave_start_date", applicationData.leave_start_date);
      formData.append("leave_end_date", applicationData.leave_end_date);
      formData.append("reason_for_leave", applicationData.reason_for_leave);
      formData.append("is_travel_on_a_pre_paid_ticket", applicationData.is_travel_on_a_pre_paid_ticket);
      formData.append("relationship_of_the_person_sending_it", applicationData.relationship_of_the_person_sending_it);
      formData.append("cost_maintanence_abroad", applicationData.cost_maintanence_abroad);
      formData.append("relationship_of_person_meeting_expenditure", applicationData.relationship_of_person_meeting_expenditure);
      formData.append("address_during_leave", applicationData.address_during_leave);

      Object.entries(applicationData.documents).forEach(
        ([key, file]) => {
          if(file){
            formData.append(key, file as File)
          }
        }
      );

      //formData.append("signature", applicationData.signature);
      if (applicationData.signature &&applicationData.signature.startsWith("data:image")) {
        formData.append("signature", applicationData.signature);
      }

      const token = localStorage.getItem("token");

      let response;

      if(isEditMode){
        response = await axios.put(
          `http://127.0.0.1:8000/api/application/${applicationId}/resubmit`,
          formData,
          {
              headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
              },
          }
        );
        setIsEditMode(false);
        setApplicationId(null);
      }else{
        response = await axios.post(
          "http://127.0.0.1:8000/api/application",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      toast.success(response.data.message);
      navigate("/my-applications");
    }catch(error:any){
      console.error(error);

      // validate errors
      if(error.response?.status === 422){
        const errors = error.response.data.errors;
        Object.values(errors).forEach((messages:any)=>{
          toast.error(messages[0]);
        });
        return;
      }

      // backend returned an error message
      toast.error(
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Something went wrong."
      );
    }
  };

  return (
    <div className="flex h-screen bg-[#FAF9FD] font-[Inter,sans-serif] overflow-hidden relative">
      {/* Mobile sidebar overlay */}
      <Navbar
        user={user}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <Topbar
          user={user}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page content */}
        <main className="flex-1 px-4 sm:px-6 py-6 space-y-8 overflow-y-auto">
          {/* Page header */}
          <div>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-3">
              <span className="text-[#44474E] text-xs font-semibold leading-4">Home</span>
              <ChevronRight />
              <span className="text-[#44474E] text-xs font-semibold leading-4">New Leave Request</span>
              <ChevronRight />
              <span className="text-[#002046] font-['Noto_Sans_Sinhala'] text-xs font-bold leading-4">126</span>
            </nav>

            <h2 className="text-[#002046] text-2xl sm:text-3xl font-semibold leading-10 tracking-tight mt-1">
              Create Foreign Leave Application
            </h2>
            <p className="text-[#44474E] text-base leading-6 mt-1">
              Please fill in the required fields to initiate your leave authorization process.
            </p>
          </div>

          {/* Form sections */}
          <div className="flex flex-col gap-4">
              <p className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-sm font-medium leading-5 tracking-[0.14px]">
                මෙම අයදුම්පත්‍රයේ සපයා ඇති තොරතුරු නිවැරදි බව සහතික කරමි.
              </p>
              <div className="relative rounded bg-white overflow-hidden h-62.5">
                {existingSignature && applicationData.signature === "" && (
                    <img
                        src={existingSignature}
                        alt="Existing Signature"
                        className="absolute inset-0 w-full h-full object-contain z-10"
                    />
                )}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full border-2 border-dashed border-[#C4C6CF] rounded-lg z-20"
                />
                {!existingSignature && applicationData.signature === "" && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                        <p className="text-[#C4C6CF] text-base">
                            Sign inside this box
                        </p>
                    </div>
                )}
              </div>
              {
                !isEditMode && (
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <button
                      onClick={clearSignature}
                      className="flex items-center gap-1 text-[#BA1A1A] text-xs font-bold leading-4 hover:opacity-70 transition-opacity"
                    >
                      <RotateCcw/>
                      Clear Signature
                    </button>
                    <button className="flex items-center gap-4 px-8 py-1 bg-[#002046] text-white text-base font-semibold leading-10 tracking-tight rounded-lg hover:bg-[#001533] transition-colors"
                    onClick={saveSignature}>
                      <span>Save Signature</span>
                      <ChevronsRight/>
                    </button>
                  </div>
                )
              }
              {
                isEditMode ? (
                  <button
                    className="w-full bg-[#1B365D] hover:bg-[#001533] text-white py-3 rounded-lg"
                    onClick={submitApplication}
                  >
                    Re-submit Application
                  </button>
                ):(
                  <button
                    className="w-full bg-[#002046] hover:bg-[#001533] text-white py-3 rounded-lg"
                    onClick={submitApplication}
                  >
                    Submit Application
                  </button>
                )
              }
              <button
                    className="w-full bg-gray-300 hover:bg-gray-400 text-[#1B365D] py-3 rounded-lg"
                    onClick={()=>navigate(`/documents/edit/${id}`)}
                  >
                    Back
              </button>
          </div>

          {/* Footer */}
          <Footer/>
        </main>
      </div>
    </div>
  );
}
