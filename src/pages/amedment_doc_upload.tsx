import { Upload, CheckCircle, Trash2, ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Topbar from "../components/topbar";
import { useAmendment } from "../context/AmendmentContext";
import axios from "axios";
import Footer from "../components/footer";
import toast from "react-hot-toast";

function ChevronRight() {
  return (
    <svg width="5" height="7" viewBox="0 0 5 7" fill="none">
      <path d="M2.68333 3.5L0 0.816667L0.816667 0L4.31667 3.5L0.816667 7L0 6.18333L2.68333 3.5Z" fill="#44474E" />
    </svg>
  );
}

export default function AmedmentDocumentUpload() {
  const { amendmentData, setAmendmentData } = useAmendment();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const {id} = useParams();

  useEffect(()=>{
    if(!id) return;
    setAmendmentData((prev: any) => ({
        ...prev,
        application_id: Number(id)
    }));
  }, [id]);

  useEffect(()=>{
      const storedUser = localStorage.getItem("user");
      console.log("Stored User:", storedUser);
      if(!storedUser){
        navigate("/");
        return;
      }
      setUser(JSON.parse(storedUser));
    },[]);

  interface DocumentItem {
    key: string;
    label: string;
    isRequired: boolean;
    file: File | null;
  }

  const [documents, setDocuments]  = useState<DocumentItem[]>([
    {
      key: "request_letter",
      label: "අයදුම්කරුගේ ඉල්ලීම් ලිපිය",
      isRequired: true,
      file: null
    },
    {
      key: "foreign_leave_approval_letter",
      label: "විදේශ නිවාඩු අනුමත ලිපිය",
      isRequired: true,
      file: null
    },
    {
      key: "flight_details",
      label: "ගුවන් ගමන් විස්තරය",
      isRequired: true,
      file: null
    },
    {
      key: "confirmation_of_reason",
      label: "ඉල්ලීම සනාථ කිරීමේ ලේඛන",
      isRequired: false,
      file: null
    },
  ]);

  const navigate = useNavigate();
 
  const handleFileChange = (documentKey: string,file: File | null) => {
    if (!file) return;

    setAmendmentData((prev: any) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentKey]: file,
      },
    }));
  };

  const removeFile = (documentKey: string) => {
    setAmendmentData((prev: any) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentKey]: null,
      },
    }));
  };
  
  const requiredDocs = documents.filter(
    (doc) => doc.isRequired
  );

  const uploadedRequiredDocs = requiredDocs.filter(
    (doc) => amendmentData.documents?.[doc.key]
  );

  const uploadedCount = requiredDocs.filter(
    (doc) => amendmentData.documents?.[doc.key]
  ).length;

  const allUploaded =
    uploadedCount === requiredDocs.length;
  
  const progress = (uploadedRequiredDocs.length/requiredDocs.length)*100;

  const submitAmendment = async()=>{
    try{
      const formData = new FormData();
      formData.append("application_id", amendmentData.application_id );
      formData.append("new_leave_start_date", amendmentData.new_leave_start_date );
      formData.append("new_leave_end_date", amendmentData.new_leave_end_date );
      formData.append("reason", amendmentData.reason_for_change);

      Object.entries(amendmentData.documents).forEach(
        ([key, file]) => {
          if(file){
            formData.append(key, file as File)
          }
        }
      );

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/amendment",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
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
    
    // Reset amendment data
    setAmendmentData({
      application_id: "",
      new_leave_start_date: "",
      new_leave_end_date: "",
      reason_for_change: "",
      documents: {
        request_letter: null,
        foreign_leave_approval_letter: null,
        flight_details: null,
        request_confirmation_document: null,
      },
    });

    navigate("/my-applications");
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
              <span className="text-[#002046] font-['Noto_Sans_Sinhala'] text-xs font-bold leading-4">Supporting Documents</span>
            </nav>

            <h2 className="text-[#002046] text-2xl sm:text-3xl font-semibold leading-10 tracking-tight mt-1">
              Supporting Documents for Amendment
            </h2>
            <p className="text-[#44474E] text-base leading-6 mt-1">
              Upload all required supporting documents before submitting the amendment.
            </p>
          </div>

          {/* content sections */}
          <div className="flex flex-col gap-8">

                
                {/* Progress Card */}
                <div className="bg-white rounded-xl border p-6 mb-8">
                    <div className="flex justify-between items-center mb-3">
                        <span className="font-medium text-gray-700">
                            Upload Progress
                        </span>

                        <span className="font-bold text-[#002046]">
                            {uploadedRequiredDocs.length}/{requiredDocs.length}
                        </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3">            
                      <div
                        className="bg-[#002046] h-3 rounded-full transition-all"
                        style={{
                            width:`${progress}%`
                        }}
                      />
                    </div>
                </div>

                {/* documents */}
                <div className="grid  gap-5">
                    {
                      documents.map((doc)=>(
                        <div key={doc.key} className="bg-white rounded-xl shadow-sm  p-5">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            {/* left side */}
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-gray-900">
                                  {doc.label}
                                </h3>
                                {doc.isRequired ? (
                                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                    Required
                                  </span>
                                ) : (
                                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                    Optional
                                  </span>
                                )}
                              </div>
                              {
                                amendmentData.documents[doc.key]?(
                                  <div className="flex items-center gap-2 text-green-600 mt-2">
                                    <CheckCircle size={16} />
                                    <span className="text-sm">
                                      {amendmentData.documents[doc.key].name}
                                    </span>
                                  </div>
                                ):(
                                  <p className="text-sm text-gray-500 mt-2">
                                    No file uploaded
                                  </p>
                                )
                              }
                            </div>

                            {/* right side */}
                            <div className="flex items-center gap-3">
                              <label className="cursor-pointer">
                                <input
                                  type="file"
                                  className="hidden"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  onChange={(e) =>
                                    handleFileChange(
                                      doc.key,
                                      e.target.files?.[0] || null
                                    )
                                  }
                                />

                                <div className="flex items-center gap-2 px-4 py-2 bg-[#002046] text-white rounded-lg hover:bg-[#001533]">
                                  <Upload size={18} />
                                  Upload
                                </div>
                              </label>

                              {amendmentData.documents?.[doc.key] && (
                                <button
                                  onClick={() =>
                                    removeFile(doc.key)
                                  }
                                  className="p-2 border rounded-lg text-red-500 hover:bg-red-50"
                                >
                                  <Trash2 size={18} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    }

                </div>


                {/*  Buttons */}
                <div className="flex justify-end mt-8 gap-4">
                    <button className="px-6 py-3 border rounded-lg" onClick={()=>navigate(`/application/${id}/amendment-form`)}>
                        Back
                    </button>

                    <button
                        onClick={submitAmendment}
                        disabled={!allUploaded}
                        className={`flex items-center gap-2 px-8 py-3 rounded-lg text-white font-semibold transition
                        ${
                        allUploaded
                            ? "bg-[#002046] hover:bg-[#001533]"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Submit
                        <ChevronsRight size={18} />
                    </button>
                </div>


          </div>

          {/* Footer */}
        <Footer/>
        </main>
      </div>
    </div>
  );
}
