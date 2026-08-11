import { Upload, CheckCircle, Trash2, ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApplication } from "../context/ApplicationContext";
import Navbar from "../components/navbar";
import Topbar from "../components/topbar";
import toast from "react-hot-toast";
import Footer from "../components/footer";
import { useLeaveCategory } from "../context/LeaveCategoryContext";

function ChevronRight() {
  return (
    <svg width="5" height="7" viewBox="0 0 5 7" fill="none">
      <path d="M2.68333 3.5L0 0.816667L0.816667 0L4.31667 3.5L0.816667 7L0 6.18333L2.68333 3.5Z" fill="#44474E" />
    </svg>
  );
}


export default function DocumentUpload() {
  const {id} = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const {applicationData, setApplicationData, isEditMode, existingDocs} = useApplication();
  const {leaveCategory} = useLeaveCategory();
  

  // load logged user
  useEffect(()=>{
      console.log("officialLeaveCategory : "+ leaveCategory);
      console.log("documents :"+ isEditMode );
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

  const documentsByCategory = {
    short_trip: [
      {
        key: "request_letter",
        label: "අයදුම්කරුගේ ඉල්ලීම් ලිපිය",
        isRequired: true,
        file:null
      },
      {
        key: "passport_copy",
        label: "විදේශ ගමන් බලපත්‍රය",
        isRequired: true,
        file:null
      },
    ],

    study: [
      {
        key: "request_letter",
        label: "අයදුම්කරුගේ ඉල්ලීම් ලිපිය",
        isRequired: true,
        file:null
      },
      {
        key: "agreement",
        label: "ගිවිසුම",
        isRequired: true,
        file: null
      },
      {
        key: "admission_letter",
        label: "අධ්‍යයන ආයතනයේ ලිපිය",
        isRequired: true,
        file:null
      }, 
      {
        key: "passport_copy",
        label: "විදේශ ගමන් බලපත්‍රය",
        isRequired: true,
        file:null
      },
    ],

    employment: [
      {
        key: "request_letter",
        label: "අයදුම්කරුගේ ඉල්ලීම් ලිපිය",
        isRequired: true,
        file:null
      },
      {
        key: "agreement",
        label: "ගිවිසුම",
        isRequired: true,
        file: null
      },
      {
        key: "employment_letter",
        label: "රැකියා ආයතනයේ ලිපිය",
        isRequired: true,
        file:null
      }, 
      {
        key: "passport_copy",
        label: "විදේශ ගමන් බලපත්‍රය",
        isRequired: true,
        file:null
      },
    ],

    study_and_employment: [
      {
        key: "request_letter",
        label: "අයදුම්කරුගේ ඉල්ලීම් ලිපිය",
        isRequired: true,
        file:null
      },
      {
        key: "agreement",
        label: "ගිවිසුම",
        isRequired: true,
        file: null
      },
      {
        key: "admission_letter",
        label: "අධ්‍යයන ආයතනයේ ලිපිය",
        isRequired: true,
        file:null
      }, 
      {
        key: "passport_copy",
        label: "විදේශ ගමන් බලපත්‍රය",
        isRequired: true,
        file:null
      },
    ],

    spouse: [
      {
        key: "request_letter",
        label: "අයදුම්කරුගේ ඉල්ලීම් ලිපිය",
        isRequired: true,
        file:null
      },
      {
        key: "agreement",
        label: "ගිවිසුම",
        isRequired: true,
        file: null
      },
      {
        key: "spouse_invitation",
        label: "කාලත්‍රයාගේ ආරාධනා ලිපිය",
        isRequired: true,
        file:null
      },
      {
        key: "passport_copy",
        label: "විදේශ ගමන් බලපත්‍රය",
        isRequired: true,
        file:null
      },
    ],

    leave_without_offers: [
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
      // {
      //   key: "disciplinary_clearance",
      //   label: "විනය පරීක්ෂණ හා විගණන විමසුම් නොමැති බවට සහතිකය",
      //   isRequired: true,
      //   file: null
      // },
      // {
      //   key: "agreement",
      //   label: "ගිවිසුම",
      //   isRequired: false,
      //   file: null
      // },
    ],

    leave_with_warm_cloths_offer: [
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
      // {
      //   key: "southern_absorption",
      //   label: "දකුණු පළාතට අන්තර්ග්‍රහණය වී තිබීම",
      //   isRequired: true,
      //   file: null
      // },
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
      // {
      //   key: "disciplinary_clearance",
      //   label: "විනය පරීක්ෂණ හා විගණන විමසුම් නොමැති බවට සහතිකය",
      //   isRequired: true,
      //   file: null
      // },
      // {
      //   key: "agreement",
      //   label: "ගිවිසුම",
      //   isRequired: false,
      //   file: null
      // },
      {
        key: "letter_stating_that_allowances_will_not_be_paid",
        label: "දීමනා නොගෙවන බවට ලිපිය",
        isRequired: true,
        file: null
      },
      // {
      //   key: "recommendation_of_secratary_ministry",
      //   label: "අමාත්‍යාංශය ලේකම්වරයගේ නිර්දේශය",
      //   isRequired: true,
      //   file: null
      // },
    ],

    leave_with_additional_offer: [
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
      // {
      //   key: "southern_absorption",
      //   label: "දකුණු පළාතට අන්තර්ග්‍රහණය වී තිබීම",
      //   isRequired: true,
      //   file: null
      // },
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
      // {
      //   key: "disciplinary_clearance",
      //   label: "විනය පරීක්ෂණ හා විගණන විමසුම් නොමැති බවට සහතිකය",
      //   isRequired: true,
      //   file: null
      // },
      // {
      //   key: "agreement",
      //   label: "ගිවිසුම",
      //   isRequired: false,
      //   file: null
      // },
      {
        key: "letter_stating_that_allowances_will_not_be_paid",
        label: "දීමනා නොගෙවන බවට ලිපිය",
        isRequired: true,
        file: null
      },
      // {
      //   key: "recommendation_of_secratary_ministry",
      //   label: "අමාත්‍යාංශය ලේකම්වරයගේ නිර්දේශය",
      //   isRequired: true,
      //   file: null
      // },
    ],
    
    leave_with_warm_cloths_and_additional_offer: [
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
      // {
      //   key: "southern_absorption",
      //   label: "දකුණු පළාතට අන්තර්ග්‍රහණය වී තිබීම",
      //   isRequired: true,
      //   file: null
      // },
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
      // {
      //   key: "disciplinary_clearance",
      //   label: "විනය පරීක්ෂණ හා විගණන විමසුම් නොමැති බවට සහතිකය",
      //   isRequired: true,
      //   file: null
      // },
      // {
      //   key: "agreement",
      //   label: "ගිවිසුම",
      //   isRequired: false,
      //   file: null
      // },
      {
        key: "letter_stating_that_allowances_will_not_be_paid",
        label: "දීමනා නොගෙවන බවට ලිපිය",
        isRequired: true,
        file: null
      },
      // {
      //   key: "recommendation_of_secratary_ministry",
      //   label: "අමාත්‍යාංශය ලේකම්වරයගේ නිර්දේශය",
      //   isRequired: true,
      //   file: null
      // },
    ],
  };

  const documents: DocumentItem[] =
    leaveCategory && documentsByCategory[leaveCategory]
        ? documentsByCategory[leaveCategory].map((doc) => ({
            ...doc,
            file: null,
        }))
        : [];
  
  // const [documents, setDocuments]  = useState<DocumentItem[]>([
  //   {
  //     key: "invitation_letter",
  //     label: "අදාළ නිලධාරියා නමට එවන ලද කැඳවීම් ලිපිය",
  //     isRequired: true,
  //     file: null
  //   },
  //   {
  //     key: "service_confirmation",
  //     label: "සේවය ස්ථීර කිරීමේ ලිපිය",
  //     isRequired: true,
  //     file: null
  //   },
  //   {
  //     key: "southern_absorption",
  //     label: "දකුණු පළාතට අන්තර්ග්‍රහණය වී තිබීම",
  //     isRequired: true,
  //     file: null
  //   },
  //   {
  //     key: "duty_cover_letter",
  //     label: "රාජකාරි ආවරණ ලිපිය",
  //     isRequired: true,
  //     file: null
  //   },
  //   {
  //     key: "passport_copy",
  //     label: "විදේශ ගමන් බලපත්‍රය",
  //     isRequired: true,
  //     file: null
  //   },
  //   {
  //     key: "flight_details",
  //     label: "ගුවන් ගමන් විස්තරය",
  //     isRequired: true,
  //     file: null
  //   },
  //   {
  //     key: "request_letter",
  //     label: "අයදුම්කරුගේ ඉල්ලීම් ලිපිය",
  //     isRequired: true,
  //     file: null
  //   },
  //   {
  //     key: "disciplinary_clearance",
  //     label: "විනය පරීක්ෂණ හා විගණන විමසුම් නොමැති බවට සහතිකය",
  //     isRequired: true,
  //     file: null
  //   },
  //   {
  //     key: "agreement",
  //     label: "ගිවිසුම",
  //     isRequired: false,
  //     file: null
  //   },
  // ]);

  
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
  
  // const requiredDocs = documents.filter(
  //   (doc) => doc.isRequired
  // );

  // const uploadedRequiredDocs = requiredDocs.filter(
  //   (doc) => applicationData.documents?.[doc.key] || existingDocs?.[doc.key]
  // );

  const requiredDocs = documents.filter(
    (doc) => doc.isRequired
);

const uploadedRequiredDocs = requiredDocs.filter(
    (doc) =>
        applicationData?.documents?.[doc.key] ||
        existingDocs?.[doc.key]
);

  // const uploadedCount = requiredDocs.filter(
  //   (doc) => applicationData.documents?.[doc.key] || existingDocs?.[doc.key]
  // ).length;

  // const allUploaded =
  //   uploadedCount === requiredDocs.length;
  
  // const progress = (uploadedRequiredDocs.length/requiredDocs.length)*100;

  const uploadedCount = uploadedRequiredDocs.length;

const allUploaded =
    uploadedCount === requiredDocs.length;

const progress =
    requiredDocs.length > 0
        ? (uploadedCount / requiredDocs.length) * 100
        : 0;

  const handleNext = () => {

    const missingRequiredDocs = documents.filter(
      (doc) => doc.isRequired && !applicationData.documents?.[doc.key] && !existingDocs?.[doc.key]
    );

    if(missingRequiredDocs.length > 0){
      toast.error(`Please upload ${missingRequiredDocs.length} required document(s).`);
      return;
    }

    toast.success("document uploaded successfully");
    navigate(`/sign2/edit/${id}`);
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
                                applicationData?.documents?.[doc.key] ? 
                                  (
                                    <div className="flex items-center gap-2 text-green-600 mt-2">
                                      <CheckCircle size={16} />
                                      <span className="text-sm">
                                        {applicationData.documents[doc.key].name}
                                      </span>
                                    </div>
                                  ):
                                  existingDocs?
                                  (
                                    <div className="flex items-center gap-2 text-green-600">
                                      <CheckCircle size={16} />
                                      <a
                                        href={`http://127.0.0.1:8000/storage/${existingDocs[doc.key].file_path}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm underline hover:text-blue-700"
                                      >
                                        {existingDocs[doc.key].file_name}
                                      </a>
                                    </div>
                                  ):
                                  (
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

                                  <div className="flex items-center gap-2 px-4 py-2 text-[#1B365D] rounded-lg hover:bg-[#1B365D] hover:text-white">
                                    <Upload size={18} />
                                    {existingDocs?.[doc.key] || applicationData.documents?.[doc.key]
                                      ? "Replace"
                                      : "Upload"}
                                  </div>
                                </label>

                                {(applicationData.documents?.[doc.key]) && (
                                  <button
                                    onClick={() => removeFile(doc.key)}
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
                    <button className="px-6 py-3 border rounded-lg" onClick={()=>navigate(`/form2/edit/${id}`)}>
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
          <Footer/>
        </main>
      </div>
    </div>
  );
}
