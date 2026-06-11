import { LayoutDashboard, FileText, Settings, FilePlusCorner } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

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

const applications = [
  { id: "LV/SP/2024/0842", name: "Anura Siriwardena", office: "Agriculture Dept", date: "24 Oct 2024", status: "Pending" },
  { id: "LV/SP/2024/0841", name: "Kamala Perera", office: "Education Ministry", date: "24 Oct 2024", status: "Pending" },
  { id: "LV/SP/2024/0839", name: "Rohan Madugalle", office: "Provincial Council HQ", date: "23 Oct 2024", status: "Pending" },
  { id: "LV/SP/2024/0835", name: "Dilini Jayasuriya", office: "Irrigation Dept", date: "23 Oct 2024", status: "Pending" },
];

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState<"all" | "queue">("queue");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#FAF9FD] font-[Inter,sans-serif] overflow-hidden relative">
      {/* Sidebar */}
      {/* Mobile Overlay */}
      <>
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <aside className={`
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

          <nav className="flex flex-col gap-1 px-2 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.active ? "" : `/${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm] transition-colors ${
                  item.active
                    ? "bg-[#1B365D] text-[#87A0CD]"
                    : "text-[#44474E] hover:bg-[#E8E7EC]"
                }`}
              >
                {/* <span className={item.active ? "text-[#87A0CD]" : "text-[#44474E]"}>
                  {item.icon}
                </span> */}
                <item.icon size={20} />
                <span className="font-medium text-sm leading-5 tracking-[0.14px]">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </aside>
      </>

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
            <h1 className="text-[#002046] font-bold text-lg md:text-xl lg:text-2xl leading-8">
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
                  Gunawardena P.
                </p>
                <p className="text-[#44474E] text-[10px] leading-3.75">Check Officer</p>
              </div>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/1a35442aef3b23cf026a35860f88273fb0bb0a0e?width=80"
                alt="User Profile Avatar"
                className="w-10 h-10 rounded-xl border border-[#002046] object-cover"
              />
            </div>
          </div>
        </header>

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
                  onClick={() => setActiveFilter("all")}
                  className={`px-4 py-2 rounded-sm border border-[#C4C6CF] font-bold text-base leading-6 transition-colors ${
                    activeFilter === "all"
                      ? "bg-[#002046] text-white border-[#002046]"
                      : "bg-white text-[#002046]"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveFilter("queue")}
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
                    42 Total
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
                              {app.id}
                            </span>
                          </td>
                          <td className="px-4 py-7">
                            <span className="text-[#1A1B1E] font-medium text-base leading-6">
                              {app.name}
                            </span>
                          </td>
                          <td className="px-4 py-7">
                            <span className="text-[#44474E] font-normal text-base leading-6">
                              {app.office}
                            </span>
                          </td>
                          <td className="px-4 py-7">
                            <span className="text-[#44474E] font-normal text-base leading-6 whitespace-nowrap">
                              {app.date}
                            </span>
                          </td>
                          <td className="px-4 py-5.5">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FEF3C7]">
                              <span className="w-[5.33px] h-1.5 rounded-full bg-[#D97706] shrink-0" />
                              <span className="text-[#92400E] font-bold text-xs leading-4">
                                {app.status}
                              </span>
                            </span>
                          </td>
                          <td className="px-4 py-6 text-right">
                            <button className="px-4 py-2 rounded-sm bg-[#002046] text-white font-bold text-xs leading-4 hover:bg-[#001530] transition-colors">
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
                <p className="text-[#44474E] text-sm">Showing 1 to 4 of 42 entries</p>
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
