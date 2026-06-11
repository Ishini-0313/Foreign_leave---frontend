import React, { useState } from 'react';
import { LayoutDashboard, FileText, FilePlusCorner, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  {
    label: "Dashboard",
    active: true,
    icon: LayoutDashboard
  },
  {
    label: "Applications",
    icon: FileText,
  },
  {
    label: "New Application",
    icon: FilePlusCorner
  },
  // {
  //   label: "Workflow Management",
  //   icon: (
  //     <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
  //       <path d="M13 18V15H9V5H7V8H0V0H7V3H13V0H20V8H13V5H11V13H13V10H20V18H13ZM2 2V6V2ZM15 12V16V12ZM15 2V6V2ZM15 6H18V2H15V6ZM15 16H18V12H15V16ZM2 6H5V2H2V6Z" fill="currentColor" />
  //     </svg>
  //   ),
  // },
  // {
  //   label: "Office Management",
  //   icon: (
  //     <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
  //       <path d="M0 18V0H10V4H20V18H0ZM2 16H4V14H2V16ZM2 12H4V10H2V12ZM2 8H4V6H2V8ZM2 4H4V2H2V4ZM6 16H8V14H6V16ZM6 12H8V10H6V12ZM6 8H8V6H6V8ZM6 4H8V2H6V4ZM10 16H18V6H10V8H12V10H10V12H12V14H10V16ZM14 10V8H16V10H14ZM14 14V12H16V14H14Z" fill="currentColor" />
  //     </svg>
  //   ),
  // },
  // {
  //   label: "User Management",
  //   icon: (
  //     <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
  //       <path d="M0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0ZM18 16V13C18 12.2667 17.7958 11.5625 17.3875 10.8875C16.9792 10.2125 16.4 9.63333 15.65 9.15C16.5 9.25 17.3 9.42083 18.05 9.6625C18.8 9.90417 19.5 10.2 20.15 10.55C20.75 10.8833 21.2083 11.2542 21.525 11.6625C21.8417 12.0708 22 12.5167 22 13V16H18ZM8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM18 4C18 5.1 17.6083 6.04167 16.825 6.825C16.0417 7.60833 15.1 8 14 8C13.8167 8 13.5833 7.97917 13.3 7.9375C13.0167 7.89583 12.7833 7.85 12.6 7.8C13.05 7.26667 13.3958 6.675 13.6375 6.025C13.8792 5.375 14 4.7 14 4C14 3.3 13.8792 2.625 13.6375 1.975C13.3958 1.325 13.05 0.733333 12.6 0.2C12.8333 0.116667 13.0667 0.0625 13.3 0.0375C13.5333 0.0125 13.7667 0 14 0C15.1 0 16.0417 0.391667 16.825 1.175C17.6083 1.95833 18 2.9 18 4ZM2 14H14V13.2C14 13.0167 13.9542 12.85 13.8625 12.7C13.7708 12.55 13.65 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5625 10.775 11.3375C9.85833 11.1125 8.93333 11 8 11C7.06667 11 6.14167 11.1125 5.225 11.3375C4.30833 11.5625 3.4 11.9 2.5 12.35C2.35 12.4333 2.22917 12.55 2.1375 12.7C2.04583 12.85 2 13.0167 2 13.2V14ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6Z" fill="currentColor" />
  //     </svg>
  //   ),
  // },
  // {
  //   label: "Audit Logs",
  //   icon: (
  //     <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
  //       <path d="M9 18C6.7 18 4.69583 17.2375 2.9875 15.7125C1.27917 14.1875 0.3 12.2833 0.05 10H2.1C2.33333 11.7333 3.10417 13.1667 4.4125 14.3C5.72083 15.4333 7.25 16 9 16C10.95 16 12.6042 15.3208 13.9625 13.9625C15.3208 12.6042 16 10.95 16 9C16 7.05 15.3208 5.39583 13.9625 4.0375C12.6042 2.67917 10.95 2 9 2C7.85 2 6.775 2.26667 5.775 2.8C4.775 3.33333 3.93333 4.06667 3.25 5H6V7H0V1H2V3.35C2.85 2.28333 3.8875 1.45833 5.1125 0.875C6.3375 0.291667 7.63333 0 9 0C10.25 0 11.4208 0.2375 12.5125 0.7125C13.6042 1.1875 14.5542 1.82917 15.3625 2.6375C16.1708 3.44583 16.8125 4.39583 17.2875 5.4875C17.7625 6.57917 18 7.75 18 9C18 10.25 17.7625 11.4208 17.2875 12.5125C16.8125 13.6042 16.1708 14.5542 15.3625 15.3625C14.5542 16.1708 13.6042 16.8125 12.5125 17.2875C11.4208 17.7625 10.25 18 9 18ZM11.8 13.2L8 9.4V4H10V8.6L13.2 11.8L11.8 13.2Z" fill="currentColor" />
  //     </svg>
  //   ),
  // },
  {
    label: "Settings",
    icon: Settings
  },
];

export default function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return(
        <>
            {sidebarOpen && (
                <div
                    className='fixed inset-0 bg-black/40 z-40 lg:hidden'
                    onClick={()=>setSidebarOpen(false)}
                />
            )}
            <aside
                className={`
                    fixed lg:static
                    top-0 left-0 z-50
                    h-full w-64
                    border-r border-[#C4C6CF]
                    bg-[#F4F3F7]
                    overflow-y-auto
                    transform transition-transform duration-300
                    ${
                    sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                    }
                `}>
                <div className="px-4 pt-8 pb-10">
                    <div className="flex items-center gap-3">
                        <img
                            src="./public/images.png"
                            alt="Government Seal"
                            className="w-12 h-10 rounded-sm shrink-0"
                        />
                        <div>
                            <p className="text-[#002046] font-bold text-sm leading-[17.5px] tracking-[0.14px]">
                            Southern Provincial Council
                            </p>
                            <p className="text-[#44474E] font-semibold text-[10px] leading-3.75 tracking-[0.5px] uppercase mt-0.5">
                            Government of Sri Lanka
                            </p>
                        </div>
                    </div>
                </div>
                <nav>
                    {
                        navItems.map((item)=>(
                            <Link
                                key={item.label}
                                to={item.active ? "" : `/${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                                className={`flex items-center gap-3 px-4 py-3 rounded-sm] transition-colors ${
                                    item.active
                                        ? "bg-[#1B365D] text-[#87A0CD]"
                                        : "text-[#44474E] hover:bg-[#E8E7EC]"
                                    }`}
                            >
                                <item.icon size={20} />
                                <span className="font-medium text-sm leading-5 tracking-[0.14px]">
                                    {item.label}
                                </span>
                            </Link>
                        ))
                    }
                </nav>
            </aside>
        </>
    );
}
