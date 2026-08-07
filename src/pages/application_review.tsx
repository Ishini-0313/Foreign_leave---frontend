import axios from "axios";
import { ChevronsRight, ClipboardPenLine, FileStack, FileUser, FolderUp, MessageSquareMore, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Topbar from "../components/topbar";

function ChevronRight() {
  return (
    <svg width="5" height="7" viewBox="0 0 5 7" fill="none">
      <path d="M2.68333 3.5L0 0.816667L0.816667 0L4.31667 3.5L0.816667 7L0 6.18333L2.68333 3.5Z" fill="#44474E" />
    </svg>
  );
}

export default function ApplicationReview() {
  const [user, setUser] = useState<any>(null);
  const {id} = useParams();
  const navigate = useNavigate();
  const [applicationData, setApplicationData]= useState<any>(null);
  const [role, setRole] = useState("");

  useEffect(()=>{
    const storedUser = localStorage.getItem("user");

    console.log("Stored User:", storedUser);

    if(!storedUser){
      navigate("/");
      return;
    }

    setUser(JSON.parse(storedUser));
  },[]);

  useEffect(() => {
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
            setApplicationData(res.data);
        })
        .catch((err) => {
            console.log(err);
        });

    }, []);

  useEffect(()=>{
    if (!user?.role_id) return;
    axios.get(
          `http://127.0.0.1:8000/api/role-by-id`,
          {
              params: {
                  id: user?.role_id
              }
          }
      )
      .then((res) => {
        console.log("Role Response:", res.data);
        setRole(res.data.role_name);
      })
      .catch((err) => {
          console.log(err);
      });

  },[user]);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Particulars of Available Leave form will be filled only by subject officer(current assinged)
  const canFillOfficeForm = user && applicationData && user.id === applicationData.application.current_assigned_user_id && user.office.id === applicationData.application.institute_id && role === "Subject Officer";


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
              <span className="text-[#44474E] text-xs font-semibold leading-4">Leave Request</span>
              <ChevronRight />
              <span className="text-[#002046] font-['Noto_Sans_Sinhala'] text-xs font-bold leading-4">{applicationData?.application_no}</span>
            </nav>

            <h2 className="text-[#002046] text-2xl sm:text-3xl font-semibold leading-10 tracking-tight mt-1">
                Foreign Leave Application Details
            </h2>
            <div className="flex items-center gap-3 mt-1">
                <div className="text-gray text-sm bg-blue-200 px-3 rounded-xl">
                  {applicationData?.application.status}
                </div>
                <div className="text-gray-500">
                  Submitted on: {new Date(applicationData?.application.created_at).toLocaleDateString()} : {new Date(applicationData?.application.created_at).toLocaleTimeString()}
                </div>
            </div>
            
          </div>

          {/* Form sections */}
          <div className="flex flex-col gap-8  p-8">

            <div className="flex justify-between bg-white p-8 rounded-lg shadow-sm hover:scale-102 text-[#002046]"
              onClick={()=>navigate(`/application/${id}/form-16`)}>
                <div className="flex gap-2 items-center" 
                    >
                    <FileUser/>
                    <p>Form 16</p>
                </div>
                <ChevronsRight/>
            </div>
            
            <div className="flex justify-between bg-white p-8 rounded-lg shadow-sm hover:scale-102 text-[#002046]"
                onClick={()=>navigate(`/application/${id}/form-126`)}>
                <div className="flex gap-2 items-center">
                    <FileUser/>
                    <p>Form 126</p>
                </div>
                <ChevronsRight/>
            </div>
            
            <div className="flex justify-between bg-white p-8 rounded-lg shadow-sm hover:scale-102 text-[#002046]" onClick={()=>navigate(`/application/${id}/documents`)}>
                <div className="flex gap-2 items-center">
                    <FileStack/>
                    <p>Uploaded Documents</p>
                </div>
                <ChevronsRight/>
            </div>

            {
              canFillOfficeForm && (
                <div className="flex flex-col gap-8">
                  <div className="flex justify-between bg-white p-8 rounded-lg shadow-sm hover:scale-102 text-[#002046]" onClick={()=>navigate(`/application/${id}/office-form`)}>
                    <div className="flex gap-2 items-center">
                        <ClipboardPenLine/>
                        <p>Particulars of Available Leave</p>
                    </div>
                    <ChevronsRight/>
                  </div>
                  <div className="flex justify-between bg-white p-8 rounded-lg shadow-sm hover:scale-102 text-[#002046]" onClick={()=>navigate(`/application/${id}/office-documents`)}>
                    <div className="flex gap-2 items-center">
                        <FolderUp/>
                        <p>Upload Supporting Documents</p>
                    </div>
                    <ChevronsRight/>
                  </div>
                </div>
              )
            }
            

            <div className="flex justify-between bg-white p-8 rounded-lg shadow-sm hover:scale-102 text-[#002046]" onClick={()=>navigate(`/application/${id}/tracking`)}>
                <div className="flex gap-2 items-center">
                    <TrendingUp/>
                    <p>Application Tracking</p>
                </div>
                <ChevronsRight/>
            </div>

            <div className="flex justify-between bg-white p-8 rounded-lg shadow-sm hover:scale-102 text-[#002046]" onClick={()=>navigate(`/application/${id}/add-comment`)}>
                <div className="flex gap-2 items-center">
                    <MessageSquareMore/>
                    <p>Add Comment</p>
                </div>
                <ChevronsRight/>
            </div>
            
          </div>

          {/* Footer */}
        <Footer/>
        </main>
      </div>
    </div>
  );
}
