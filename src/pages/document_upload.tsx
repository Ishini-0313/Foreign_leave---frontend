import { Upload, CheckCircle, Trash2, ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApplication } from "../context/ApplicationContext";
import Navbar from "../components/navbar";

function ChevronRight() {
  return (
    <svg width="5" height="7" viewBox="0 0 5 7" fill="none">
      <path d="M2.68333 3.5L0 0.816667L0.816667 0L4.31667 3.5L0.816667 7L0 6.18333L2.68333 3.5Z" fill="#44474E" />
    </svg>
  );
}


export default function DocumentUpload() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(()=>{
      const storedUser = localStorage.getItem("user");
  
      console.log("Stored User:", storedUser);
  
      if(!storedUser){
        navigate("/");
        return;
      }
  
      setUser(JSON.parse(storedUser));
    },[]);

  const { applicationData, setApplicationData } = useApplication();
  
  interface DocumentItem {
    key: string;
    label: string;
    isRequired: boolean;
    file: File | null;
  }

  const [documents, setDocuments]  = useState<DocumentItem[]>([
    {
      key: "invitation_letter",
      label: "අදාළ නිලධාරියා නමට එවන ලද කැඳවීම් ලිපිය",
      isRequired: true,
      file: null
    },
    {
      key: "service_confirmation",
      label: "සේවය ස්ථීර කිරීමේ ලිපිය",
      isRequired: true,
      file: null
    },
    {
      key: "southern_absorption",
      label: "දකුණු පළාතට අන්තර්ග්‍රහණය වී තිබීම",
      isRequired: true,
      file: null
    },
    {
      key: "duty_cover_letter",
      label: "රාජකාරි ආවරණ ලිපිය",
      isRequired: true,
      file: null
    },
    {
      key: "passport_copy",
      label: "විදේශ ගමන් බලපත්‍රය",
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
      key: "request_letter",
      label: "අයදුම්කරුගේ ඉල්ලීම් ලිපිය",
      isRequired: true,
      file: null
    },
    {
      key: "disciplinary_clearance",
      label: "විනය පරීක්ෂණ හා විගණන විමසුම් නොමැති බවට සහතිකය",
      isRequired: true,
      file: null
    },
    {
      key: "agreement",
      label: "ගිවිසුම",
      isRequired: false,
      file: null
    },
  ]);

  const navigate = useNavigate();
 

  const handleFileChange = (
  documentKey: string,
  file: File | null
) => {
  if (!file) return;

  setApplicationData((prev: any) => ({
    ...prev,
    documents: {
      ...prev.documents,
      [documentKey]: file,
    },
  }));
};

  const removeFile = (documentKey: string) => {
  setApplicationData((prev: any) => ({
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
    (doc) => applicationData.documents?.[doc.key]
  );

  const uploadedCount = requiredDocs.filter(
    (doc) => applicationData.documents?.[doc.key]
  ).length;

  const allUploaded =
    uploadedCount === requiredDocs.length;
  
  const progress = (uploadedRequiredDocs.length/requiredDocs.length)*100;

  const handleNext = () => {
    const missingRequiredDocs = documents.filter(
      (doc) => doc.isRequired && !applicationData.documents?.[doc.key]
    );

    if(missingRequiredDocs.length > 0){
      alert(`Please upload ${missingRequiredDocs.length} required document(s).`);
      return;
    }

    alert("document uploaded successfully");
    navigate("/sign");
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
        <header className="h-16 border-b border-[#C4C6CF] bg-[#FAF9FD] flex items-center px-6 justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-[#44474E] hover:bg-[#E8E6EC] rounded"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 5H18M2 10H18M2 15H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <h1 className="text-[#002046] text-xl lg:text-2xl font-bold leading-8">
              Foreign Leave Management System
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Bell */}
            <button className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-[#E8E7EC] transition-colors">
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                <path d="M0 17V15H2V8C2 6.61667 2.41667 5.3875 3.25 4.3125C4.08333 3.2375 5.16667 2.53333 6.5 2.2V1.5C6.5 1.08333 6.64583 0.729167 6.9375 0.4375C7.22917 0.145833 7.58333 0 8 0C8.41667 0 8.77083 0.145833 9.0625 0.4375C9.35417 0.729167 9.5 1.08333 9.5 1.5V2.2C10.8333 2.53333 11.9167 3.2375 12.75 4.3125C13.5833 5.3875 14 6.61667 14 8V15H16V17H0ZM8 20C7.45 20 6.97917 19.8042 6.5875 19.4125C6.19583 19.0208 6 18.55 6 18H10C10 18.55 9.80417 19.0208 9.4125 19.4125C9.02083 19.8042 8.55 20 8 20ZM4 15H12V8C12 6.9 11.6083 5.95833 10.825 5.175C10.0417 4.39167 9.1 4 8 4C6.9 4 5.95833 4.39167 5.175 5.175C4.39167 5.95833 4 6.9 4 8V15Z" fill="#44474E" />
              </svg>
            </button>
            {/* Help */}
            <button className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-[#E8E7EC] transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M9.95 16C10.3 16 10.5958 15.8792 10.8375 15.6375C11.0792 15.3958 11.2 15.1 11.2 14.75C11.2 14.4 11.0792 14.1042 10.8375 13.8625C10.5958 13.6208 10.3 13.5 9.95 13.5C9.6 13.5 9.30417 13.6208 9.0625 13.8625C8.82083 14.1042 8.7 14.4 8.7 14.75C8.7 15.1 8.82083 15.3958 9.0625 15.6375C9.30417 15.8792 9.6 16 9.95 16ZM9.05 12.15H10.9C10.9 11.6 10.9625 11.1667 11.0875 10.85C11.2125 10.5333 11.5667 10.1 12.15 9.55C12.5833 9.11667 12.925 8.70417 13.175 8.3125C13.425 7.92083 13.55 7.45 13.55 6.9C13.55 5.96667 13.2083 5.25 12.525 4.75C11.8417 4.25 11.0333 4 10.1 4C9.15 4 8.37917 4.25 7.7875 4.75C7.19583 5.25 6.78333 5.85 6.55 6.55L8.2 7.2C8.28333 6.9 8.47083 6.575 8.7625 6.225C9.05417 5.875 9.5 5.7 10.1 5.7C10.6333 5.7 11.0333 5.84583 11.3 6.1375C11.5667 6.42917 11.7 6.75 11.7 7.1C11.7 7.43333 11.6 7.74583 11.4 8.0375C11.2 8.32917 10.95 8.6 10.65 8.85C9.91667 9.5 9.46667 9.99167 9.3 10.325C9.13333 10.6583 9.05 11.2667 9.05 12.15ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="#44474E" />
              </svg>
            </button>
            {/* Divider */}
            <div className="w-px h-8 bg-[#C4C6CF] mx-1" />
            {/* User */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <p className="text-[#1A1B1E] font-bold text-sm leading-5 tracking-[0.14px]">
                  {user?.full_name}
                </p>
                <p className="text-[#44474E] text-[10px] leading-3.75">{user?.role_id}</p>
              </div>
              {/* <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/1a35442aef3b23cf026a35860f88273fb0bb0a0e?width=80"
                alt="User Profile Avatar"
                className="w-10 h-10 rounded-xl border border-[#002046] object-cover"
              /> */}
            </div>
          </div>
        </header>

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
              Supporting Documents
            </h2>
            <p className="text-[#44474E] text-base leading-6 mt-1">
              Upload all required supporting documents before submitting the application.
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
                                applicationData.documents[doc.key]?(
                                  <div className="flex items-center gap-2 text-green-600 mt-2">
                                    <CheckCircle size={16} />
                                    <span className="text-sm">
                                      {applicationData.documents[doc.key].name}
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

                              {applicationData.documents?.[doc.key] && (
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
                    <button className="px-6 py-3 border rounded-lg">
                        Back
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!allUploaded}
                        className={`flex items-center gap-2 px-8 py-3 rounded-lg text-white font-semibold transition
                        ${
                        allUploaded
                            ? "bg-[#002046] hover:bg-[#001533]"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Next
                        <ChevronsRight size={18} />
                    </button>
                </div>


          </div>

          {/* Footer */}
        <footer className="border-t border-[#C4C6CF] px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-[#44474E] text-xs font-semibold leading-4">
            © 2024 Southern Provincial Government of Sri Lanka. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
            <a href="#" className="text-[#44474E] text-base leading-6 hover:text-[#002046] transition-colors">
                Privacy Policy
            </a>
            <a href="#" className="text-[#44474E] text-base leading-6 hover:text-[#002046] transition-colors">
                Terms of Service
            </a>
            <a href="#" className="text-[#44474E] text-base leading-6 hover:text-[#002046] transition-colors">
                Contact Support
            </a>
            </div>
        </div>
        </footer>
        </main>
      </div>
    </div>
  );
}
