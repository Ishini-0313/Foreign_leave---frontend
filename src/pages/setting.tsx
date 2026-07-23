import axios from "axios";
import { LayoutDashboard, FileText, Settings, FilePlusCorner } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  {
    label: "Settings",
    icon: Settings
  },
];

export default function Setting() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [role, setRole] =useState("");
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // get logged user
    useEffect(()=>{
        const storedUser = localStorage.getItem("user");
        if(!storedUser){
            navigate("/");
            return;
        }
        console.log("stored user" +storedUser);
        setUser(JSON.parse(storedUser));
        
    }, []);

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/profile",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            setProfile(res.data);
        }).finally(()=>{
            setLoading(false);
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
                        <p className="text-[#1A1B1E] font-bold text-sm leading-5 tracking-[0.14px]" onClick={()=>navigate('/profile')}>
                            {user?.full_name}
                        </p>
                        <p className="text-[#4e7ce5] text-[12px] leading-3.75">{role}</p>
                        </div>
                    </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto bg-[#FAF9FD]">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 pt-6 md:pt-10 pb-6 ">
                        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
                            <h3 className=" font-bold text-[#002046] mb-8">Change Profile Details</h3>
                            <div className="grid md:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <label>නම</label>
                                    <input className="w-full p-3 rounded border border-gray-300" value={profile?.full_name} onChange={(e)=>setProfile({...profile, full_name:e.target.value})}/>

                                </div>
                                <div>
                                    <label>පුද්ගලික විද්‍යුත් තැපෑල</label>
                                    <input  className="w-full p-3 rounded border border-gray-300" value={profile?.email} onChange={(e)=>setProfile({...profile, email:e.target.value})}/>
                                </div>
                                <div >
                                    <label>ජංගම දුරකතන අංකය</label>
                                    <input  className="w-full p-3 rounded border border-gray-300" value={profile?.phone} onChange={(e)=>setProfile({...profile, Phone:e.target.value})}/>
                                </div>
                                <div>
                                    <label>තනතුර</label>
                                    <input  className="w-full p-3 rounded border border-gray-300" value={profile?.designation} onChange={(e)=>setProfile({...profile, designation:e.target.value})}/>
                                </div>
                                {/* <div>
                                    <label>ආයතනය</label>
                                    <input  className="w-full p-3 rounded border border-gray-300" value={profile?.office?.name} onChange={(e)=>setProfile({...profile, office.name:e.target.value})}/>
                                </div> */}
                                {/* <div>
                                    <label>Role</label>
                                    <input disabled className=" w-full p-3 rounded bg-blue-100" value={profile?.role?.role_name}/>
                                </div> */}
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button className="border border-[#002046]  text-[#002046] hover:bg-[#002046] hover:text-white px-8 py-3 rounded"
                                    onClick={()=>navigate('/setting')}>
                                    Save Changes
                                </button>
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
