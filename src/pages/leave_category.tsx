import  { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar';

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
        <header className="flex items-center justify-between h-14 px-3 md:px-6 border-b border-[#C4C6CF] bg-[#FAF9FD] shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-[#E8E7EC]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-[#002046] font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-tight">
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
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden md:block text-right">
                <p className="text-[#1A1B1E] font-bold text-sm leading-5 tracking-[0.14px]">
                  {user?.full_name}
                </p>
                <p className="text-[#44474E] text-[10px] leading-3.75">{user?.role_id}</p>
              </div>
              {/* <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/1a35442aef3b23cf026a35860f88273fb0bb0a0e?width=80"
                alt="User Profile Avatar"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#002046] object-cover"
              /> */}
              {/* <CircleUserRound/> */}
            </div>
          </div>
        </header>

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
