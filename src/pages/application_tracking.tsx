import axios from "axios";
import {  Check, Hourglass, Undo2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar";

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
                <p className="text-[#4e7ce5] text-[12px] leading-3.75">
                    {role}
                </p>
              </div>
            </div>
          </div>
        </header>

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
                            </td>
                            <td>
                                {item.remarks}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

          
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
