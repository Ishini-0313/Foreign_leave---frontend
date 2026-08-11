import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Topbar from "../components/topbar";
import { Eye, Settings2, SquarePen} from "lucide-react";
import Footer from "../components/footer";
import { useLeaveCategory } from '../context/LeaveCategoryContext';

export default function MyApplications() {
  const {setLeaveCategory,setNatureOfTrip} = useLeaveCategory();
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(()=>{
    setNatureOfTrip(null);
    setLeaveCategory(null);
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

      const response = await axios.get('http://127.0.0.1:8000/api/my-application',{
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
      loadMyQueue();
  }, []);


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
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-5 pt-6 md:pt-10 pb-6">
            {/* Welcome Section */}
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                {/* <h2 className="text-[#002046] font-semibold text-2xl md:text-[32px] leading-10 tracking-[-0.32px]">
                  My Applications
                </h2> */}
                {/* <p className="text-[#44474E] text-base leading-6 mt-1">
                  Reviewing leave applications for the Southern Provincial Council.
                </p> */}
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-white border border-[#C4C6CF] rounded-lg shadow-sm overflow-hidden">
              {/* Table Header */}
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between px-4 py-4 border-b border-[#C4C6CF]">
                <div className="flex items-center gap-4">
                  <h3 className="text-[#1A1B1E] font-semibold text-2xl leading-8">
                    My Applications
                  </h3>
                  <span className="px-2 py-0.5 rounded-xs bg-[rgba(27,54,93,0.10)] text-[#002046] font-bold text-xs leading-4">
                    {applications.length} Total
                  </span>
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
                        View
                      </th>
                      <th className="px-4 py-[23.5px] text-right text-[#44474E] font-bold text-xs uppercase tracking-wide">
                        Edit Application
                      </th>
                      <th className="px-4 py-[23.5px] text-right text-[#44474E] font-bold text-xs uppercase tracking-wide">
                        Apply Amendment
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications
                      .map((app, i) => (
                        <tr key={app.id} className={i > 0 ? "border-t border-[#C4C6CF]" : ""}>
                          <td className="px-4 py-7">
                            <span className="text-[#002046] font-bold text-base whitespace-nowrap">
                              {app.application_no}
                            </span>
                          </td>
                          <td className="px-4 py-7">
                            <span className="text-[#1A1B1E] font-medium text-base leading-6">
                              {app.name}
                            </span>
                          </td>
                          <td className="px-4 py-7">
                            <span className="text-[#44474E] font-normal text-base leading-6">
                              {app.institute?.name}
                            </span>
                          </td>
                          <td className="px-4 py-7">
                            <span className="text-[#44474E] font-normal text-base leading-6 whitespace-nowrap">
                              {new Date(app.created_at).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="px-4 py-5.5">
                            {app.status === "Pending" && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-yellow-100">
                                <span className="w-[5.33px] h-1.5 rounded-full bg-yellow-500 shrink-0" />
                                  <span className="text-yellow-700 font-bold text-xs leading-4">
                                    {app.status}
                                  </span>
                              </span>
                            )}
                            {app.status === "Approved" && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-100">
                                <span className="w-[5.33px] h-1.5 rounded-full bg-green-500 shrink-0" />
                                  <span className="text-green-700 font-bold text-xs leading-4">
                                    {app.status}
                                  </span>
                              </span>
                            )}
                            {app.status === "Returned" && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100">
                                <span className="w-[5.33px] h-1.5 rounded-full bg-red-500 shrink-0" />
                                  <span className="text-red-700 font-bold text-xs leading-4">
                                    {app.status}
                                  </span>
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-6 text-right">
                            <button className="px-4 py-2 rounded-sm   font-bold text-xs leading-4 hover:bg-green-100 transition-colors"
                              onClick={()=> navigate(`/my-application/${app.id}`)}>
                              <Eye className="text-gray-600 hover:text-green-600"/>
                            </button>
                          </td>
                          <td className="px-4 py-6 text-right">
                            {
                              app.is_editable ? (
                                <button className="px-4 py-2 rounded-sm   font-bold text-xs leading-4 hover:bg-red-100 transition-colors"
                                  onClick={()=> navigate(`/options/${app.id}`)}>
                                  <SquarePen className="text-gray-600 hover:text-red-500"/>
                                </button>
                              ) : (
                                <button
                                    disabled
                                    className="px-4 py-2 rounded-sm opacity-40 cursor-not-allowed"
                                >
                                    <SquarePen className="text-gray-500" />
                                </button>
                              )
                            }
                            
                          </td>
                          <td className="px-4 py-6 text-right">
                            <button className="px-4 py-2 rounded-sm   font-bold text-xs leading-4 hover:bg-blue-100 transition-colors"
                              onClick={()=> navigate(`/application/${app.id}/amendment-form`)}>
                              <Settings2 className="text-gray-600 hover:text-blue-600"/>
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
          <Footer/>
        </main>
      </div>
    </div>
  );
}
