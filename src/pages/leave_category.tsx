import  { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar';
import Topbar from '../components/topbar';
import { useLeaveCategory } from '../context/LeaveCategoryContext';
import Footer from '../components/footer';

export default function Leave_category() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const {natureOfTrip, leaveCategory, setNatureOfTrip, setLeaveCategory} = useLeaveCategory();
  const navigate = useNavigate();

  useEffect(()=>{
      setNatureOfTrip(null);
      setLeaveCategory(null);
      console.log("nature of trip: " + natureOfTrip);
      console.log("leave category: " + leaveCategory);
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
        <main className="flex flex-col flex-1 bg-linear-to-br  overflow-y-auto">
          <div className="flex flex-col flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
            {/* ================= HEADER ================= */}
            <div className="text-center mb-10 lg:mb-14">
              {/* Step indicator */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm mb-5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#1B365D] text-white text-xs font-bold">1</span>
                <span className="text-sm font-semibold text-[#526070]">Leave Application</span>
                <span className="text-[#A0A6B0]">/</span>
                <span className="text-sm text-[#7A8190]">Category</span>
              </div>

              {/* Heading */}
              <h2 className=" text-[#002046] font-bold text-3xl sm:text-4xl lg:text-[42px] leading-tight">
                Select Leave Category
              </h2>

              {/* Decorative line */}
              <div className="flex items-center justify-center gap-2 mt-4 mb-4">
                <span className="w-8 h-1 rounded-full bg-[#6C8FD5]"></span>
                <span className="w-2 h-2 rounded-full bg-[#A78BDB]"></span>
                <span className="w-8 h-1 rounded-full bg-[#6C8FD5]"></span>
              </div>

              {/* Description */}
              <p className=" text-[#5F6673] text-base sm:text-lg leading-7 max-w-2xl mx-auto">
                Please select the appropriate category for your foreign leave request
                to proceed with the specific application requirements.
              </p>

            </div>

            {/* ================= CARDS ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full max-w-5xl mx-auto ">

              {/* ================================================= */}
              {/* PERSONAL FOREIGN LEAVE */}
              {/* ================================================= */}

              <button
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[28px]
                  bg-linear-to-br
                  from-[#EEF4FF]
                  via-white
                  to-[#F8F3FF]
                  border
                  border-[#DCE5F5]
                  p-7
                  sm:p-9
                  lg:p-10
                  text-left
                  shadow-[0_8px_30px_rgba(30,60,100,0.07)]
                  hover:shadow-[0_18px_45px_rgba(55,85,140,0.15)]
                  hover:-translate-y-2
                  hover:border-[#9DB6E5]
                  transition-all
                  duration-300
                "
                onClick={() => {
                  navigate("/personal-leave-category");
                  setNatureOfTrip("personal");
                }}
              >

                {/* Decorative circles */}
                <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-[#C9D8F5] opacity-30 group-hover:scale-125 transition-transform duration-500" />
                <div className="absolute -right-6 -bottom-20 w-40 h-40 rounded-full bg-[#E5D7FA] opacity-30" />
                {/* Card content */}
                <div className="relative z-10">

                  {/* Icon + badge */}
                  <div className="flex items-center justify-between mb-8">

                    <div className="
                      w-20
                      h-20
                      rounded-2xl
                      bg-linear-to-br
                      from-[#1B365D]
                      to-[#315A91]
                      flex
                      items-center
                      justify-center
                      shadow-lg
                      group-hover:scale-105
                      group-hover:rotate-2
                      transition-all
                      duration-300
                    ">

                      <svg
                        width="34"
                        height="35"
                        viewBox="0 0 31 32"
                        fill="none"
                      >
                        <path
                          d="M5.85 17.1L0 11.25L5.85 5.4L11.7 11.25L5.85 17.1ZM11.1 31.5V24C9.575 23.875 8.0625 23.6937 6.5625 23.4562C5.0625 23.2188 3.575 22.9 2.1 22.5L2.85 19.5C4.95 20.075 7.05625 20.4688 9.16875 20.6812C11.2812 20.8937 13.425 21 15.6 21C17.775 21 19.9188 20.8937 22.0312 20.6812C24.1437 20.4688 26.25 20.075 28.35 19.5L29.1 22.5C27.625 22.9 26.1375 23.2188 24.6375 23.4562C23.1375 23.6937 21.625 23.875 20.1 24V31.5H11.1ZM15.6 9C14.35 9 13.2875 8.5625 12.4125 7.6875C11.5375 6.8125 11.1 5.75 11.1 4.5C11.1 3.25 11.5375 2.1875 12.4125 1.3125C13.2875 0.4375 14.35 0 15.6 0C16.85 0 17.9125 0.4375 18.7875 1.3125C19.6625 2.1875 20.1 3.25 20.1 4.5C20.1 5.75 19.6625 6.8125 18.7875 7.6875C17.9125 9 16.85 9 15.6 9ZM15.6 19.5C14.775 19.5 14.0687 19.2062 13.4812 18.6187C12.8938 18.0312 12.6 17.325 12.6 16.5C12.6 15.675 12.8938 14.9688 13.4812 14.3813C14.0687 13.7938 14.775 13.5 15.6 13.5C16.425 13.5 17.1313 13.7938 17.7188 14.3813C18.3062 14.9688 18.6 15.675 18.6 16.5C18.6 17.325 18.3062 18.0312 17.7188 18.6187C17.1313 19.2062 16.425 19.5 15.6 19.5ZM23.175 16.5L20.625 12L23.175 7.5H28.275L30.825 12L28.275 16.5H23.175Z"
                          fill="#AFC6EE"
                        />
                      </svg>

                    </div>

                    <span className="
                      px-3
                      py-1.5
                      rounded-full
                      bg-[#E3ECFC]
                      text-[#315A91]
                      text-xs
                      font-semibold
                    ">
                      Personal
                    </span>

                  </div>


                  {/* Title */}
                  <h3 className="
                    text-[#002046]
                    font-bold
                    text-2xl
                    sm:text-[26px]
                    leading-tight
                    mb-4
                  ">
                    පුද්ගලික විදේශීය නිවාඩු
                  </h3>


                  {/* Description */}
                  {/* <p className="
                    text-[#5C6470]
                    text-base
                    leading-7
                    max-w-md
                    mb-8
                  ">
                    Applications for private travel, holidays, religious pilgrimages,
                    or visiting family abroad. Requires personal funding and
                    supporting documents.
                  </p> */}


                  {/* Divider */}
                  <div className="h-px bg-[#E2E8F3] mb-6"></div>


                  {/* CTA */}
                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-xs text-[#7A8494] mb-1">
                        Application Type
                      </p>

                      <p className="
                        text-[#1B365D]
                        font-bold
                        text-sm
                      ">
                        Apply Personal Leave
                      </p>
                    </div>

                    <div className="
                      w-11
                      h-11
                      rounded-full
                      bg-[#1B365D]
                      flex
                      items-center
                      justify-center
                      text-white
                      group-hover:translate-x-1
                      transition-transform
                      duration-300
                      shadow-md
                    ">
                      →
                    </div>

                  </div>

                </div>
              </button>

              {/* ================================================= */}
              {/* OFFICIAL FOREIGN LEAVE */}
              {/* ================================================= */}

              <button
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[28px]
                  bg-linear-to-br
                  from-[#ECFBF5]
                  via-white
                  to-[#F2FBFF]
                  border
                  border-[#D6EDE4]
                  p-7
                  sm:p-9
                  lg:p-10
                  text-left
                  shadow-[0_8px_30px_rgba(20,100,75,0.06)]
                  hover:shadow-[0_18px_45px_rgba(30,130,95,0.14)]
                  hover:-translate-y-2
                  hover:border-[#8CCEB5]
                  transition-all
                  duration-300
                "
                onClick={() => {
                  navigate("/official-leave-category");
                  setNatureOfTrip("official");
                }}
              >

                {/* Decorative circles */}
                <div className="
                  absolute
                  -right-16
                  -top-16
                  w-52
                  h-52
                  rounded-full
                  bg-[#BEE8D5]
                  opacity-35
                  group-hover:scale-125
                  transition-transform
                  duration-500
                " />

                <div className="
                  absolute
                  -right-6
                  -bottom-20
                  w-40
                  h-40
                  rounded-full
                  bg-[#C9EAF2]
                  opacity-30
                " />


                <div className="relative z-10">

                  {/* Icon + badge */}
                  <div className="flex items-center justify-between mb-8">

                    <div className="
                      w-20
                      h-20
                      rounded-2xl
                      bg-linear-to-br
                      from-[#087F5B]
                      to-[#13A673]
                      flex
                      items-center
                      justify-center
                      shadow-lg
                      group-hover:scale-105
                      group-hover:rotate-2
                      transition-all
                      duration-300
                    ">
                      <svg
                        width="34"
                        height="33"
                        viewBox="0 0 30 29"
                        fill="none"
                      >
                        <path
                          d="M3 28.5C2.175 28.5 1.46875 28.2062 0.88125 27.6187C0.29375 27.0312 0 26.325 0 25.5V9C0 8.175 0.29375 7.46875 0.88125 6.88125C1.46875 6.29375 2.175 6 3 6H9V3C9 2.175 9.29375 1.46875 9.88125 0.88125C10.4688 0.29375 11.175 0 12 0H18C18.825 0 19.5312 0.29375 20.1187 0.88125C20.7062 1.46875 21 2.175 21 3V6H27C27.825 6 28.5312 6.29375 29.1187 6.88125C29.7062 7.46875 30 8.175 30 9V25.5C30 26.325 29.7062 27.0312 29.1187 27.6187C28.5312 28.2062 27.825 28.5 27 28.5H3ZM12 6H18V3H12V6Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <span className="px-3 py-1.5 rounded-full bg-[#DDF5EA] text-[#087F5B] text-xs font-semibold">Official</span>
                  </div>

                  {/* Title */}
                  <h3 className="stext-[#002046] font-bold text-2xl sm:text-[26px] leading-tight mb-4">රාජකාරී විදේශීය නිවාඩු</h3>

                  {/* Description */}
                  {/* <p className="text-[#5C6470] text-base leading-7 max-w-md mb-8">
                    For government delegations, international conferences, or
                    state-sponsored training programs. Requires official invitation
                    and supporting documents.
                  </p> */}

                  {/* Divider */}
                  <div className="h-px bg-[#DDEDE7] mb-6"></div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#7A8494] mb-1">Application Type</p>
                      <p className="text-[#087F5B] font-bold text-sm ">Apply Official Leave</p>
                    </div>

                    <div className="w-11 h-11  rounded-full bg-[#087F5B] flex items-center justify-center text-white group-hover:translate-x-1 transition-transform duration-300 shadow-md">
                      →
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
