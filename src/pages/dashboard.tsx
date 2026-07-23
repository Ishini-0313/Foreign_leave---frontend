import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Topbar from "../components/topbar";

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState("queue");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const storedUser = localStorage.getItem("user");
    if(!storedUser){
      navigate("/");
      return;
    }
    setUser(JSON.parse(storedUser));
    loadMyQueue();
  }, []);

  useEffect(() => {
    console.log("User details", user);
  }, [user]);

  const loadMyQueue = async ()=>{
    try{
      const token = localStorage.getItem("token");

      const response = await axios.get('http://127.0.0.1:8000/api/officer/pending-applications',{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });

      const data = await response.data;

      console.log(data);

      setApplications(data);

    }catch(error){
      console.error(error);
    }
  };

  const loadAll = async ()=>{
    try{
      const token = localStorage.getItem("token");

      const response = await axios.get('http://127.0.0.1:8000/api/officer/all-applications',{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });

      const data = await response.data;

      console.log(data);

      setApplications(data);

    }catch(error){
      console.error(error);
    }
  };

  useEffect(() => {
    if (activeFilter == "queue") {
        loadMyQueue();
    } else {
        loadAll();
    }
  }, [activeFilter]);


  return (
    <div className="flex h-screen bg-[#FAF9FD] font-[Inter,sans-serif] overflow-hidden relative">
      {/* Sidebar */}
      {/* Mobile Overlay */}
      <Navbar
        user={user}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Area */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <Topbar
          user={user}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-[#FAF9FD]">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 pt-6 md:pt-10 pb-6">
            {/* Welcome Section */}
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-[#002046] font-semibold text-2xl md:text-[32px] leading-10 tracking-[-0.32px]">
                  Officer Overview
                </h2>
                <p className="text-[#44474E] text-base leading-6 mt-1">
                  Reviewing leave applications for the Southern Provincial Council.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {setActiveFilter("all")}}
                  className={`px-4 py-2 rounded-sm border border-[#C4C6CF] font-bold text-base leading-6 transition-colors ${
                    activeFilter === "all"
                      ? "bg-[#002046] text-white border-[#002046]"
                      : "bg-white text-[#002046]"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => {setActiveFilter("queue")} }
                  className={`px-4 py-2 rounded-sm border border-[#C4C6CF] font-bold text-base leading-6 transition-colors ${
                    activeFilter === "queue"
                      ? "bg-[#002046] text-white border-[#002046]"
                      : "bg-white text-[#002046]"
                  }`}
                >
                  My Queue
                </button>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Pending Reviews */}
              <div className="bg-white rounded-lg border border-[#C4C6CF] p-4 overflow-hidden relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center p-2 rounded-sm bg-[#1B365D]">
                    <svg width="19" height="21" viewBox="0 0 19 21" fill="none">
                      <path d="M14 21C12.6167 21 11.4375 20.5125 10.4625 19.5375C9.4875 18.5625 9 17.3833 9 16C9 14.6167 9.4875 13.4375 10.4625 12.4625C11.4375 11.4875 12.6167 11 14 11C15.3833 11 16.5625 11.4875 17.5375 12.4625C18.5125 13.4375 19 14.6167 19 16C19 17.3833 18.5125 18.5625 17.5375 19.5375C16.5625 20.5125 15.3833 21 14 21ZM15.675 18.375L16.375 17.675L14.5 15.8V13H13.5V16.2L15.675 18.375ZM2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H6.175C6.35833 1.41667 6.71667 0.9375 7.25 0.5625C7.78333 0.1875 8.36667 0 9 0C9.66667 0 10.2625 0.1875 10.7875 0.5625C11.3125 0.9375 11.6667 1.41667 11.85 2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V10.25C17.7 10.0333 17.3833 9.85 17.05 9.7C16.7167 9.55 16.3667 9.41667 16 9.3V4H14V7H4V4H2V18H7.3C7.41667 18.3667 7.55 18.7167 7.7 19.05C7.85 19.3833 8.03333 19.7 8.25 20H2ZM9 4C9.28333 4 9.52083 3.90417 9.7125 3.7125C9.90417 3.52083 10 3.28333 10 3C10 2.71667 9.90417 2.47917 9.7125 2.2875C9.52083 2.09583 9.28333 2 9 2C8.71667 2 8.47917 2.09583 8.2875 2.2875C8.09583 2.47917 8 2.71667 8 3C8 3.28333 8.09583 3.52083 8.2875 3.7125C8.47917 3.90417 8.71667 4 9 4Z" fill="#87A0CD" />
                    </svg>
                  </div>
                  <span className="text-[#44474E] font-bold text-xs tracking-[-0.6px] uppercase">IN QUEUE</span>
                </div>
                <p className="text-[#44474E] font-medium text-sm leading-5 tracking-[0.14px] mt-4">Pending Reviews</p>
                <p className="text-[#002046] font-bold text-5xl leading-14 tracking-[-0.96px] mt-1">42</p>
                <div className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-xl bg-[rgba(0,32,70,0.05)] pointer-events-none" />
              </div>

              {/* Approved */}
              <div className="bg-white rounded-lg border border-[#C4C6CF] p-4 overflow-hidden relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center p-2 rounded-sm bg-[#DCFCE7]">
                    <svg width="22" height="21" viewBox="0 0 22 21" fill="none">
                      <path d="M7.6 21L5.7 17.8L2.1 17L2.45 13.3L0 10.5L2.45 7.7L2.1 4L5.7 3.2L7.6 0L11 1.45L14.4 0L16.3 3.2L19.9 4L19.55 7.7L22 10.5L19.55 13.3L19.9 17L16.3 17.8L14.4 21L11 19.55L7.6 21ZM8.45 18.45L11 17.35L13.6 18.45L15 16.05L17.75 15.4L17.5 12.6L19.35 10.5L17.5 8.35L17.75 5.55L15 4.95L13.55 2.55L11 3.65L8.4 2.55L7 4.95L4.25 5.55L4.5 8.35L2.65 10.5L4.5 12.6L4.25 15.45L7 16.05L8.45 18.45ZM9.95 14.05L15.6 8.4L14.2 6.95L9.95 11.2L7.8 9.1L6.4 10.5L9.95 14.05Z" fill="#166534" />
                    </svg>
                  </div>
                  <span className="text-[#15803D] font-bold text-xs tracking-[-0.6px] uppercase">ACTIONED</span>
                </div>
                <p className="text-[#44474E] font-medium text-sm leading-5 tracking-[0.14px] mt-4">Approved</p>
                <p className="text-[#1A1B1E] font-bold text-5xl leading-14 tracking-[-0.96px] mt-1">15</p>
                <div className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-xl bg-[#F0FDF4] pointer-events-none" />
              </div>

              {/* Returned */}
              <div className="bg-white rounded-lg border border-[#C4C6CF] p-4 overflow-hidden relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center p-2 rounded-sm bg-[#FEF3C7]">
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                      <path d="M9 15L10.4 13.6L8.825 12H13V10H8.825L10.4 8.4L9 7L5 11L9 15ZM2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H6.2C6.41667 1.4 6.77917 0.916667 7.2875 0.55C7.79583 0.183333 8.36667 0 9 0C9.63333 0 10.2042 0.183333 10.7125 0.55C11.2208 0.916667 11.5833 1.4 11.8 2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2ZM2 18H16V4H2V18ZM9 3.25C9.21667 3.25 9.39583 3.17917 9.5375 3.0375C9.67917 2.89583 9.75 2.71667 9.75 2.5C9.75 2.28333 9.67917 2.10417 9.5375 1.9625C9.39583 1.82083 9.21667 1.75 9 1.75C8.78333 1.75 8.60417 1.82083 8.4625 1.9625C8.32083 2.10417 8.25 2.28333 8.25 2.5C8.25 2.71667 8.32083 2.89583 8.4625 3.0375C8.60417 3.17917 8.78333 3.25 9 3.25Z" fill="#92400E" />
                    </svg>
                  </div>
                  <span className="text-[#B45309] font-bold text-xs tracking-[-0.6px] uppercase">REQUIRES EDITS</span>
                </div>
                <p className="text-[#44474E] font-medium text-sm leading-5 tracking-[0.14px] mt-4">Returned</p>
                <p className="text-[#1A1B1E] font-bold text-5xl leading-14 tracking-[-0.96px] mt-1">08</p>
                <div className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-xl bg-[#FFFBEB] pointer-events-none" />
              </div>

              {/* Rejected */}
              <div className="bg-white rounded-lg border border-[#C4C6CF] p-4 overflow-hidden relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center p-2 rounded-sm bg-[#FEE2E2]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M6.4 15L10 11.4L13.6 15L15 13.6L11.4 10L15 6.4L13.6 5L10 8.6L6.4 5L5 6.4L8.6 10L5 13.6L6.4 15ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="#991B1B" />
                    </svg>
                  </div>
                  <span className="text-[#B91C1C] font-bold text-xs tracking-[-0.6px] uppercase">DECLINED</span>
                </div>
                <p className="text-[#44474E] font-medium text-sm leading-5 tracking-[0.14px] mt-4">Rejected</p>
                <p className="text-[#1A1B1E] font-bold text-5xl leading-14 tracking-[-0.96px] mt-1">03</p>
                <div className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-xl bg-[#FEF2F2] pointer-events-none" />
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-white border border-[#C4C6CF] rounded-lg shadow-sm overflow-hidden">
              {/* Table Header */}
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between px-4 py-4 border-b border-[#C4C6CF]">
                <div className="flex items-center gap-4">
                  <h3 className="text-[#1A1B1E] font-semibold text-2xl leading-8">
                    Pending Applications
                  </h3>
                  <span className="px-2 py-0.5 rounded-xs bg-[rgba(27,54,93,0.10)] text-[#002046] font-bold text-xs leading-4">
                    {applications.length} Total
                  </span>
                </div>
                <div className="relative w-full md:w-auto">
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      width="16"
                      height="16"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" fill="#44474E" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search applicant or ID..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full md:w-64 pl-9 pr-4 py-2.5 rounded-sm border border-[#C4C6CF] bg-[#F4F3F7] text-[#6B7280] text-base placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#002046]/30"
                    />
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F4F3F7]">
                    <tr>
                      <th className="px-4 py-[23.5px] text-left text-[#44474E] font-bold text-xs uppercase tracking-wide whitespace-nowrap">
                        Application Number
                      </th>
                      <th className="px-4 py-[23.5px] text-left text-[#44474E] font-bold text-xs uppercase tracking-wide whitespace-nowrap">
                        Applicant Name
                      </th>
                      <th className="px-4 py-[23.5px] text-left text-[#44474E] font-bold text-xs uppercase tracking-wide">
                        Office
                      </th>
                      <th className="px-4 py-4 text-left text-[#44474E] font-bold text-xs uppercase tracking-wide whitespace-nowrap">
                        Submission Date
                      </th>
                      <th className="px-4 py-[23.5px] text-left text-[#44474E] font-bold text-xs uppercase tracking-wide whitespace-nowrap">
                        Current Status
                      </th>
                      <th className="px-4 py-[23.5px] text-right text-[#44474E] font-bold text-xs uppercase tracking-wide">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications
                      .filter(
                        (app) =>
                          app.name.toLowerCase().includes(search.toLowerCase()) ||
                          app.id.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((app, i) => (
                        <tr key={app.id} className={i > 0 ? "border-t border-[#C4C6CF]" : ""}>
                          <td className="px-4 py-7">
                            <span className="text-[#002046] font-bold text-base whitespace-nowrap">
                              {app.application_no}
                            </span>
                          </td>
                          <td className="px-4 py-7">
                            <span className="text-[#1A1B1E] font-medium text-base leading-6">
                              {app.applicant?.full_name}
                            </span>
                          </td>
                          <td className="px-4 py-7">
                            <span className="text-[#44474E] font-normal text-base leading-6">
                              {app.applicant?.office?.name}
                            </span>
                          </td>
                          <td className="px-4 py-7">
                            <span className="text-[#44474E] font-normal text-base leading-6 whitespace-nowrap">
                              {new Date(app.created_at).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="px-4 py-5.5">
                            {
                              app.status=="Pending" ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100">
                                  <span className="w-[5.33px] h-1.5 rounded-full bg-blue-700 shrink-0" />
                                  <span className="text-blue-700 font-bold text-xs leading-4">
                                    {app.status}
                                  </span>
                                </span>
                              ):app.status=="Returned" ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-yellow-100">
                                  <span className="w-[5.33px] h-1.5 rounded-full bg-yellow-700 shrink-0" />
                                  <span className="text-yellow-700 font-bold text-xs leading-4">
                                    {app.status}
                                  </span>
                                </span>
                              ):(
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-100">
                                  <span className="w-[5.33px] h-1.5 rounded-full bg-green-700 shrink-0" />
                                  <span className="text-green-700 font-bold text-xs leading-4">
                                    {app.status}
                                  </span>
                                </span>
                              )
                            }
                          </td>
                          <td className="px-4 py-6 text-right">
                            <button className="px-4 py-2 rounded-sm bg-[#002046] text-white font-bold text-xs leading-4 hover:bg-[#001530] transition-colors"
                              onClick={()=> navigate(`/application/${app.id}`)}>
                              Review
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-[#C4C6CF]">
                <p className="text-[#44474E] text-sm">Showing 1 to 4 of {applications.length} entries</p>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded-xs border border-[#C4C6CF] hover:bg-[#F4F3F7] transition-colors">
                    <svg width="5" height="7" viewBox="0 0 5 7" fill="none">
                      <path d="M3.5 7L0 3.5L3.5 0L4.31667 0.816667L1.63333 3.5L4.31667 6.18333L3.5 7Z" fill="#44474E" />
                    </svg>
                  </button>
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 flex items-center justify-center rounded-xs font-${
                        currentPage === page ? "bold" : "medium"
                      } text-sm transition-colors ${
                        currentPage === page
                          ? "bg-[#002046] text-white"
                          : "text-black hover:bg-[#F4F3F7]"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="w-8 h-8 flex items-center justify-center rounded-xs border border-[#C4C6CF] hover:bg-[#F4F3F7] transition-colors">
                    <svg width="5" height="7" viewBox="0 0 5 7" fill="none">
                      <path d="M2.68333 3.5L0 0.816667L0.816667 0L4.31667 3.5L0.816667 7L0 6.18333L2.68333 3.5Z" fill="#44474E" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-[#C4C6CF] bg-white mt-2">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
              <p className="text-[#44474E] font-semibold text-xs leading-4">
                © 2024 Southern Provincial Government of Sri Lanka. All Rights Reserved.
              </p>
              <nav className="flex items-center gap-6">
                <a href="#" className="text-[#44474E] font-semibold text-xs leading-4 hover:text-[#002046] transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-[#44474E] font-semibold text-xs leading-4 hover:text-[#002046] transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-[#44474E] font-semibold text-xs leading-4 hover:text-[#002046] transition-colors">
                  Contact Support
                </a>
              </nav>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
