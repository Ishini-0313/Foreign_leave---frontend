import { useState, useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Topbar from "../components/topbar";
import axios from "axios";
import Footer from "../components/footer";

function FormCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#C4C6CF] rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] p-8">
      {children}
    </div>
  );
}

function ChevronRight() {
  return (
    <svg width="5" height="7" viewBox="0 0 5 7" fill="none">
      <path d="M2.68333 3.5L0 0.816667L0.816667 0L4.31667 3.5L0.816667 7L0 6.18333L2.68333 3.5Z" fill="#44474E" />
    </svg>
  );
}

export default function AmendmentFromReview() {
  const {id} = useParams();
  const [applicationData, setApplicationData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
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
            `http://127.0.0.1:8000/api/amendments/${id}`,
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
              <span className="text-[#002046] font-['Noto_Sans_Sinhala'] text-xs font-bold leading-4">රාජකාරී විදේශ නිවාඩු දින සංශෝධනය</span>
            </nav>

            {/* <h2 className="text-[#002046] text-2xl sm:text-3xl font-semibold leading-10 tracking-tight mt-1">
              Create Foreign Leave Application
            </h2> */}
            <p className="text-[#44474E] text-base leading-6 mt-1">
              මසකට අදාළව නිලධාරින්ගේ විදේශ ගමන් සම්බන්ධයෙන් විදේශ නිවාඩු දින සංශෝධනය.
            </p>
          </div>

          {/* Form sections */}
          <div className="flex flex-col gap-8">

            {/* Section 1 */}
            <FormCard>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    1. නිලධාරියාගේ නම
                  </label>
                  <input
                    type="text"
                    value={applicationData?.amendment.application.name ?? ""}
                    className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors " 
                    readOnly
                  />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    2. තනතුර
                  </label>
                  <input
                    type="text"
                    value={applicationData?.amendment.application.position ?? ""}
                    className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    readOnly
                  />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    3. සේවා ස්ථානය
                  </label>
                  <input
                    type="text"
                    value={applicationData?.amendment.application.institute.name ?? ""}
                    className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    readOnly
                  />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    4. විදේශගත වීමට අදාළ රාජකාරීමය අවශ්‍යතාව
                  </label>
                  <input
                    type="text"
                    value={applicationData?.amendment.application.reason_for_leave ?? ""}
                    className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    readOnly
                  />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    5. රට
                  </label>
                  <input
                    type="text"
                    value={applicationData?.amendment.application.country ?? ""}
                    className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    readOnly
                  />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    6. අනුමැතියට ඉදිරිපත් කර ඇති කාලසීමාව
                  </label>
                  <div className="flex gap-6">
                    <input
                      type="date"
                      value={applicationData?.amendment.application.leave_start_date ?? ""}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                      readOnly
                    />
                    <input
                      type="date"
                      value={applicationData?.amendment.application.leave_end_date ?? ""}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    7. කාලසීමාව සංශෝධනය විය යුතු ආකරය
                  </label>
                  <div className="flex gap-6">
                    <input
                      type="date"
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                      value={applicationData?.amendment.new_leave_start_date ?? ""}
                      readOnly
                    />
                    <input
                      type="date"
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                      value={applicationData?.amendment.new_leave_end_date ?? ""}
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    8. සංශෝධනය කිරීමට අදාළව හේතුව
                  </label>
                  <input
                    type="text"
                    className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    value={applicationData?.amendment.reason_for_change ?? ""}
                    readOnly
                  />
                </div>
                
              </div>
            </FormCard>
          </div>

          {/* Footer */}
          <Footer/>
        </main>
      </div>
    </div>
  );
}

