import axios from "axios";
import {  Download, Eye, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Topbar from "../components/topbar";
import Footer from "../components/footer";

function ChevronRight() {
  return (
    <svg width="5" height="7" viewBox="0 0 5 7" fill="none">
      <path d="M2.68333 3.5L0 0.816667L0.816667 0L4.31667 3.5L0.816667 7L0 6.18333L2.68333 3.5Z" fill="#44474E" />
    </svg>
  );
}

export default function Documents() {
  const [user, setUser] = useState<any>(null);
  const {id} = useParams();
  const navigate = useNavigate();
  const [applicationData, setApplicationData]= useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  useEffect(()=>{

        axios.get(
        `http://127.0.0.1:8000/api/applications/${id}/documents`,
        {
            headers:{
                Authorization:
                `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res=>{
            setDocuments(res.data);
        });

    },[]);
  
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
              <span className="text-[#44474E] text-xs font-semibold leading-4">{applicationData?.application.application_no}</span>
              <ChevronRight />
              <span className="text-[#002046] text-xs font-semibold leading-4">Uploaded Documents</span>
            </nav>
          </div>

          {/* Form sections */}
          {/* <div className="flex flex-col gap-8  p-8">
          </div> */}

        <div className="space-y-5">
            {
                documents.map(doc=>(
                    <div
                        key={doc.id}
                        className="bg-white rounded-lg  shadow-sm p-5 flex justify-between items-center"
                    >
                        <div className="flex gap-4 items-center">
                            <FileText className="text-[#002046]" size={28}/>
                            <div>
                                <div className="font-semibold">
                                    {doc.document_type}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {doc.file_name}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                        {/* <a href={`http://127.0.0.1:8000/storage/${doc.file_path}`} target="_blank" className="p-2 rounded hover:bg-gray-100">
                            <Eye size={18}/>
                        </a> */}
                        <a href={`http://127.0.0.1:8000/storage/${doc.file_path}`} download className="p-2 rounded hover:bg-gray-100">
                            <Download size={18}/>
                        </a>
                    </div>
                </div>
                ))
            }
        </div>

        {/* Footer */}
        <Footer/>
        </main>
      </div>
    </div>
  );
}

