import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import toast from "react-hot-toast";
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
  const [isFinalStep, setIsFinalStep] = useState(false);
  const [remarks, setRemarks] = useState("");
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
            setIsFinalStep(res.data.is_final_step);
        })
        .catch((err) => {
            console.log(err);
        });

    }, []);
  
  const handleApprove = async () => {
    try{
        const token = localStorage.getItem("token");

        const response = await axios.post(
            `http://127.0.0.1:8000/api/applications/${id}/approve`,
            {
                remarks
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        toast.success(response.data.message);

        navigate("/dashboard");

    } catch (error: any) {
        console.error(error);

        if (error.response?.status === 422) {

            const errors = error.response.data.errors;

            Object.values(errors).forEach((messages: any) => {
                toast.error(messages[0]);
            });

            return;
        }

        toast.error(
            error.response?.data?.error ||
            error.response?.data?.message ||
            "Something went wrong."
        );
    }
  };

  const handleForward = async () => {
    try{
        const token=localStorage.getItem("token");
        const response = await axios.post(
            `http://127.0.0.1:8000/api/applications/${id}/forward`,{remarks},
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );
        toast.success(response.data.message);
        navigate("/dashboard");
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

  const handleReturn = async()=>{
    try{
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://127.0.0.1:8000/api/applications/${id}/return`,{remarks},
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
      );
      toast.success(response.data.message);
      navigate("/dashboard");
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
              <span className="text-[#44474E] text-xs font-semibold leading-4">Leave Request</span>
              <ChevronRight />
              <span className="text-[#002046] font-['Noto_Sans_Sinhala'] text-xs font-bold leading-4">{applicationData?.application.application_no}</span>
            </nav>
          </div>

          {/* textarea sections */}
          <div className="flex flex-col gap-8  p-8">
            <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Add Your Comment</h2>
            {/* <label className="block text-sm font-medium mb-2">Comments</label> */}
            <textarea rows={5} value={remarks} onChange={(e)=>setRemarks(e.target.value)} className="w-full border rounded-lg p-3" placeholder="Write your review remarks..."/>
            <div className="flex justify-end mt-5 gap-2">
                <button onClick={handleReturn}  className="bg-[#8b090d] text-white px-6 py-2 rounded">
                  Return
                </button>
                {
                  isFinalStep ? (
                    <button onClick={handleApprove}  className="bg-green-800 text-white px-6 py-2 rounded">
                      Approve
                    </button>
                  ) : (
                    <button onClick={handleForward}  className="bg-[#002046] text-white px-6 py-2 rounded">
                      Forward
                    </button>
                  )
                }
                
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer/>
        </main>
      </div>
    </div>
  );
}

