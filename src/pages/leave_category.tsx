import  { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar';
import Topbar from '../components/topbar';

export default function Leave_category() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

    const navigate = useNavigate();

    useEffect(()=>{
        const storedUser = localStorage.getItem("user");

        console.log("Stored User:", storedUser);

        if(!storedUser){
        navigate("/");
        return;
        }

        setUser(JSON.parse(storedUser));
    },[]);

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
        <main className="flex flex-col flex-1  bg-[#FAF9FD]">
          <div className="flex flex-col flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
            {/* header */}
            <div className='flex flex-col flex-1 justify-center py-6'>
                <div className="pb-12">
                    <div className="flex flex-col items-center gap-2">
                    <h2 className="text-[#002046] font-semibold text-2xl sm:text-3xl lg:text-[32px] leading-tight text-center">
                        Select Leave Category
                    </h2>

                    <p className="text-[#44474E] text-center text-base leading-6 max-w-2xl">
                        Please select the appropriate category for your foreign leave request
                        to proceed with the specific application requirements.
                    </p>
                    </div>
                </div>
            </div>
            
            {/* Selection Cards */}
            <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8 w-full max-w-4xl mx-auto">
              {/* Personal Foreign Leave Card */}
              <button className="group relative flex flex-col items-center p-6 sm:p-8 lg:p-10 rounded-2xl border border-[#E5E7EB] bg-white/90 backdrop-blur-sm overflow-hidden flex-1 max-w-112.5 w-full mx-auto hover:border-[#87A0CD] hover:shadow-lg transition-all text-left"
                onClick={()=>navigate("/personal-leave-category")}>
                {/* Decorative bg element */}
                <div
                  className="absolute w-48 h-48 rounded-xl opacity-10 bg-[#DCE2F3] pointer-events-none"
                  style={{ right: "-47px", top: "-47px" }}
                />

                {/* Icon */}
                <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-[#1B365D] shadow-sm mb-8 shrink-0">
                  <svg width="31" height="32" viewBox="0 0 31 32" fill="none">
                    <path
                      d="M5.85 17.1L0 11.25L5.85 5.4L11.7 11.25L5.85 17.1ZM11.1 31.5V24C9.575 23.875 8.0625 23.6937 6.5625 23.4562C5.0625 23.2188 3.575 22.9 2.1 22.5L2.85 19.5C4.95 20.075 7.05625 20.4688 9.16875 20.6812C11.2812 20.8937 13.425 21 15.6 21C17.775 21 19.9188 20.8937 22.0312 20.6812C24.1437 20.4688 26.25 20.075 28.35 19.5L29.1 22.5C27.625 22.9 26.1375 23.2188 24.6375 23.4562C23.1375 23.6937 21.625 23.875 20.1 24V31.5H11.1ZM15.6 9C14.35 9 13.2875 8.5625 12.4125 7.6875C11.5375 6.8125 11.1 5.75 11.1 4.5C11.1 3.25 11.5375 2.1875 12.4125 1.3125C13.2875 0.4375 14.35 0 15.6 0C16.85 0 17.9125 0.4375 18.7875 1.3125C19.6625 2.1875 20.1 3.25 20.1 4.5C20.1 5.75 19.6625 6.8125 18.7875 7.6875C17.9125 8.5625 16.85 9 15.6 9ZM15.6 19.5C14.775 19.5 14.0687 19.2062 13.4812 18.6187C12.8938 18.0312 12.6 17.325 12.6 16.5C12.6 15.675 12.8938 14.9688 13.4812 14.3813C14.0687 13.7938 14.775 13.5 15.6 13.5C16.425 13.5 17.1313 13.7938 17.7188 14.3813C18.3062 14.9688 18.6 15.675 18.6 16.5C18.6 17.325 18.3062 18.0312 17.7188 18.6187C17.1313 19.2062 16.425 19.5 15.6 19.5ZM23.175 16.5L20.625 12L23.175 7.5H28.275L30.825 12L28.275 16.5H23.175Z"
                      fill="#87A0CD"
                    />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-[#002046] text-center font-semibold text-xl sm:text-2xl leading-tight mb-4">
                  පුද්ගලික විදේශීය නිවාඩු
                </h3>

                {/* Description */}
                <p className="text-[#44474E] text-center text-base leading-6 mb-8">
                  Applications for private travel, holidays, religious
                  pilgrimages, or visiting family abroad. Requires personal
                  funding and…
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2">
                  <span className="text-[#002046] font-bold text-sm leading-5 tracking-[0.14px]">
                    Apply Personal Leave
                  </span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M7.10208 5.25H0V4.08333H7.10208L3.83542 0.816667L4.66667 0L9.33333 4.66667L4.66667 9.33333L3.83542 8.51667L7.10208 5.25Z"
                      fill="#002046"
                    />
                  </svg>
                </div>
              </button>

              {/* Official Foreign Leave Card */}
              <button className="group relative flex flex-col items-center p-6 sm:p-8 lg:p-10 rounded-2xl border border-[#E5E7EB] bg-white/90 backdrop-blur-sm overflow-hidden flex-1 max-w-112.5 w-full mx-auto hover:border-[#87A0CD] hover:shadow-lg transition-all text-left"
                onClick={()=>navigate("/form")}>
                {/* Decorative bg element */}
                <div
                  className="absolute w-48 h-48 rounded-xl opacity-10 bg-[#D6E3FF] pointer-events-none"
                  style={{ right: "-47px", top: "-47px" }}
                />

                {/* Icon */}
                <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-[#002046] shadow-sm mb-8 shrink-0">
                  <svg width="30" height="29" viewBox="0 0 30 29" fill="none">
                    <path
                      d="M3 28.5C2.175 28.5 1.46875 28.2062 0.88125 27.6187C0.29375 27.0312 0 26.325 0 25.5V9C0 8.175 0.29375 7.46875 0.88125 6.88125C1.46875 6.29375 2.175 6 3 6H9V3C9 2.175 9.29375 1.46875 9.88125 0.88125C10.4688 0.29375 11.175 0 12 0H18C18.825 0 19.5312 0.29375 20.1187 0.88125C20.7062 1.46875 21 2.175 21 3V6H27C27.825 6 28.5312 6.29375 29.1187 6.88125C29.7062 7.46875 30 8.175 30 9V25.5C30 26.325 29.7062 27.0312 29.1187 27.6187C28.5312 28.2062 27.825 28.5 27 28.5H3ZM12 6H18V3H12V6Z"
                      fill="white"
                    />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-[#002046] text-center font-semibold text-xl sm:text-2xl leading-tight mb-4">
                  රාජකාරී විදේශීය නිවාඩු
                </h3>

                {/* Description */}
                <p className="text-[#44474E] text-center text-base leading-6 mb-8">
                  For government delegations, international conferences, or
                  state-sponsored training programs. Requires official
                  invitation and…
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2">
                  <span className="text-[#002046] font-bold text-sm leading-5 tracking-[0.14px]">
                    Apply Official Leave
                  </span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M7.10208 5.25H0V4.08333H7.10208L3.83542 0.816667L4.66667 0L9.33333 4.66667L4.66667 9.33333L3.83542 8.51667L7.10208 5.25Z"
                      fill="#002046"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-[#C4C6CF] bg-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
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
