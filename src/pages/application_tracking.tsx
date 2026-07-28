import axios from "axios";
import {  Check, Hourglass, Undo2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Topbar from "../components/topbar";

export default function ApplicationTracking() {
  const [user, setUser] = useState<any>(null);
  const {id} = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tracking, setTracking] = useState<any>();

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
            `http://127.0.0.1:8000/api/applications/${id}/tracking`,
            {
                headers: {
                    Authorization:
                        `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        .then((res) => {
            setTracking(res.data);
            console.log(res.data);
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
            {/* progress panel */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="font-bold mb-6">Workflow Progress</h2>
                {tracking?.steps.map((step:any, index:any)=>{
                    const completed = step.status === 'completed';
                    const current = step.status === 'current';
                    const returned = step.status === 'returned';
                    return(
                        <div key={step.id} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-md flex items-center justify-center border-2
                                    ${
                                        step.status === 'completed' ? "border-green-500 bg-green-100" : 
                                        step.status === 'current' ? "border-blue-500 bg-blue-100" : 
                                        step.status === 'returned' ? "border-yellow-500 bg-yellow-100" : 
                                        "border-gray-300 bg-gray-100"
                                    }`
                                }
                                >
                                    {
                                        step.status === 'completed' ? <Check className="w-5 text-green-500"/> : 
                                        step.status === 'current' ? <Hourglass className="w-5 text-blue-500"/>:
                                        step.status === 'returned' ? <Undo2 className="w-5 text-yellow-500"/> :
                                        step.sequence_no
                                    }
                                </div>
                                {/* Vertical Line (don't show after last step) */}
                                {index !== tracking.steps.length - 1 && (
                                    <div
                                        className={`w-0.5 flex-1 min-h-10
                                        ${completed ? "bg-green-500" : "bg-gray-300"}`}
                                    />
                                )}
                            </div>

                            <div>
                                {
                                    step.status === 'completed'?<div className="text-green-600 ">{step.role.role_name}</div>:
                                    step.status === 'current' ? <div className="text-blue-500 ">{step.role.role_name}</div>:
                                    step.status === 'returned' ? <div className="text-yellow-500 ">{step.role.role_name}</div>:
                                    <div className="text-gray-500 ">{step.role.role_name}</div>
                                }
                                <div className="text-xs text-gray-500">
                                    {step.office_name}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* history table */}
            <table className="w-full table-auto bg-white">
                <thead className="border-b border-gray-400">
                    <tr>
                        <th>Date</th>
                        <th>Office</th>
                        <th>Officer</th>
                        <th>Action</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {tracking?.history.map((item:any)=>(
                        <tr key={item.id} className=" border-b border-gray-400">
                            <td className="">
                                {new Date(item.created_at).toLocaleDateString()}
                                <br/>
                                {new Date(item.created_at).toLocaleTimeString()}
                            </td>
                            <td>
                                {item.user.office.name}
                            </td>
                            <td>
                                {item.user.full_name}
                            </td>
                            <td>
                                {item.action === "Forwarded" && (
                                    <span className="px-2 py-1 rounded bg-blue-100">{item.action}</span>
                                )}
                                {item.action === "Returned" && (
                                    <span className="px-2 py-1 rounded bg-red-100">{item.action}</span>
                                )}
                                {item.action === "Approved" && (
                                    <span className="px-2 py-1 rounded bg-green-100">{item.action}</span>
                                )}
                                {item.action === "Resubmited" && (
                                    <span className="px-2 py-1 rounded bg-blue-100">{item.action}</span>
                                )}
                                {item.action === "Submited" && (
                                    <span className="px-2 py-1 rounded bg-blue-100">{item.action}</span>
                                )}
                            </td>
                            <td>
                                {item.remarks}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

          
        <Footer/>
    </main>
    </div>
    </div>
  );
}
