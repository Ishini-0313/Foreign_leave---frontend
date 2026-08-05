import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Topbar from "../components/topbar";

export default function Profile() {
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
                {/* <main className="flex-1 overflow-y-auto bg-[#FAF9FD]">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 pt-6 md:pt-10 pb-6 ">
                        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
                            <h1 className="text-3xl font-bold text-[#002046] mb-8">My Profile</h1>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label>නම</label>
                                    <input disabled className=" w-full p-3 rounded bg-blue-100" value={profile?.full_name}/>

                                </div>
                                <div>
                                    <label>පුද්ගලික විද්‍යුත් තැපෑල</label>
                                    <input disabled className=" w-full p-3 rounded bg-blue-100" value={profile?.email}/>
                                </div>
                                <div>
                                    <label>ජංගම දුරකතන අංකය</label>
                                    <input disabled className=" w-full p-3 rounded bg-blue-100" value={profile?.phone}/>
                                </div>
                                <div>
                                    <label>තනතුර</label>
                                    <input disabled className=" w-full p-3 rounded bg-blue-100" value={profile?.designation}/>
                                </div>
                                <div>
                                    <label>ආයතනය</label>
                                    <input disabled className=" w-full p-3 rounded bg-blue-100" value={profile?.office?.name}/>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button className="border border-[#002046]  text-[#002046] hover:bg-[#002046] hover:text-white px-8 py-3 rounded"
                                    onClick={()=>navigate('/setting')}>
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>

                    
                    <Footer/>
                </main> */}

                <main className="flex-1 overflow-y-auto bg-linear-to-br from-[#F7F9FF] via-[#FAF9FD] to-[#F5FBFA]">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-6 md:py-10">

                        {/* ================= PAGE HEADER ================= */}
                        <div className="max-w-5xl mx-auto mb-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-2 h-2 rounded-full bg-[#5B7FC4]"></span>
                                        <span className=" text-sm font-semibold text-[#60708A] tracking-wide">
                                            ACCOUNT
                                        </span>
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-[#002046] ">
                                        My Profile
                                    </h1>

                                    <p className="mt-2 text-[#697386] text-sm md:text-base">
                                        View and manage your personal and official information.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ================= PROFILE CONTAINER ================= */}
                        <div className="max-w-5xl mx-auto">
                            {/* ================= PROFILE SUMMARY ================= */}
                            <div className="
                                relative
                                overflow-hidden
                                rounded-3xl
                                bg-gradient-to-r
                                from-[#002046]
                                via-[#163D6B]
                                to-[#315F91]
                                p-6
                                md:p-8
                                shadow-[0_12px_35px_rgba(0,32,70,0.15)]
                                mb-6
                            ">
                                {/* Decorative circles */}
                                <div className="
                                    absolute
                                    -right-16
                                    -top-20
                                    w-64
                                    h-64
                                    rounded-full
                                    bg-white/5
                                "></div>

                                <div className="
                                    absolute
                                    right-20
                                    -bottom-24
                                    w-48
                                    h-48
                                    rounded-full
                                    bg-[#87A0CD]/10
                                "></div>


                                <div className="
                                    relative
                                    z-10
                                    flex
                                    flex-col
                                    sm:flex-row
                                    items-center
                                    sm:items-start
                                    gap-5
                                ">

                                    {/* Profile Avatar */}

                                    <div className="
                                        w-20
                                        h-20
                                        md:w-24
                                        md:h-24
                                        shrink-0
                                        rounded-3xl
                                        bg-white
                                        flex
                                        items-center
                                        justify-center
                                        shadow-lg
                                        border-4
                                        border-white/20
                                    ">

                                        <svg
                                            className="w-10 h-10 md:w-12 md:h-12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M20 21C20 19.6044 20 18.9067 19.7822 18.3541C19.3025 17.1499 18.3501 16.1975 17.1459 15.7178C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40672 15.5 6.85407 15.7178C5.6499 16.1975 4.69749 17.1499 4.21783 18.3541C4 18.9067 4 19.6044 4 21"
                                                stroke="#315F91"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                            />

                                            <circle
                                                cx="12"
                                                cy="7"
                                                r="4"
                                                stroke="#315F91"
                                                strokeWidth="1.8"
                                            />
                                        </svg>

                                    </div>


                                    {/* User Summary */}

                                    <div className="text-center sm:text-left flex-1">
                                        <p className=" text-[#B8C9E0] text-sm mb-1">
                                            Welcome back
                                        </p>
                                        <h2 className=" text-white text-2xl md:text-3xl font-bold">
                                            {profile?.full_name || "Loading..."}
                                        </h2>
                                        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mt-3 ">
                                            {profile?.designation && (
                                                <span className="
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    bg-white/10
                                                    border
                                                    border-white/10
                                                    text-[#E3ECF7]
                                                    text-xs
                                                    font-medium
                                                ">
                                                    {profile.designation}
                                                </span>
                                            )}

                                            {role && (
                                                <span className="
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    bg-[#87A0CD]/20
                                                    border
                                                    border-[#87A0CD]/20
                                                    text-[#DCE7F5]
                                                    text-xs
                                                    font-medium
                                                ">
                                                    {role}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* ================= PERSONAL INFORMATION ================= */}
                            <div className=" bg-white rounded-3xl border border-[#E7EAF0] shadow-[0_6px_25px_rgba(0,32,70,0.06)] overflow-hidden">
                                {/* Section Header */}
                                <div className="px-6  md:px-8  py-5 border-b border-[#EEF0F4] flex items-center gap-3">
                                    <div className="w-10  h-10  rounded-xl bg-[#EAF1FC] text-[#315F91] flex  items-center justify-center">
                                        <svg
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <circle
                                                cx="12"
                                                cy="8"
                                                r="3"
                                                stroke="currentColor"
                                                strokeWidth="1.8"/>

                                            <path
                                                d="M5 20C5.4 16.8 7.7 15 12 15C16.3 15 18.6 16.8 19 20"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-[#002046]  font-bold text-lg">
                                            Personal Information
                                        </h3>
                                        <p className=" text-[#7A8494] text-xs mt-0.5">
                                            Your registered personal details
                                        </p>
                                    </div>
                                </div>

                                {/* Information Grid */}
                                <div className="p-6  md:p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Name */}
                                    <div className="group  rounded-2xl  bg-linear-to-br  from-[#F7F9FF] to-[#FCFDFF]  border border-[#E7EBF3]  p-5 hover:border-[#B8C9E0] transition-all">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-9 h-9 rounded-xl bg-[#E7EFFB] text-[#4F74A8] flex items-center justify-center text-sm font-bold">
                                                න
                                            </div>
                                            <label className="text-xs font-semibold text-[#737D8D]">
                                                නම
                                            </label>
                                        </div>

                                        <p className="text-[#1D2B3A] font-semibold text-base wrap-break-word">
                                            {loading ? "Loading..." : profile?.full_name || "-"}
                                        </p>
                                    </div>

                                    {/* Email */}
                                    <div className="group  rounded-2xl  bg-linear-to-br  from-[#F8F7FF] to-[#FEFDFF]  border border-[#DFEEE8]  p-5 hover:border-[#C8BDE5] transition-all">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-9 h-9 rounded-xl bg-[#EEE9FA] text-[#7659A9] flex items-center justify-center text-sm font-bold">
                                                න
                                            </div>
                                            <label className="text-xs font-semibold text-[#737D8D]">
                                                පුද්ගලික විද්‍යුත් තැපෑල
                                            </label>
                                        </div>
                                        <p className="text-[#1D2B3A] font-semibold text-base wrap-break-word">
                                            {loading ? "Loading..." : profile?.email || "-"}
                                        </p>
                                    </div>

                                    {/* Phone */}
                                    <div className="group  rounded-2xl  bg-linear-to-br  from-[#F4FBF8] to-[#FCFFFD]  border border-[#E9E5F4]  p-5 hover:border-[#B2D9C9] transition-all">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-9 h-9 rounded-xl bg-[#E1F3EA] text-[#27825D] flex items-center justify-center text-sm font-bold">
                                                න
                                            </div>
                                            <label className="text-xs font-semibold text-[#737D8D]">
                                                ජංගම දුරකතන අංකය
                                            </label>
                                        </div>
                                        <p className="text-[#1D2B3A] font-semibold text-base wrap-break-word">
                                            {loading ? "Loading..." : profile?.phone || "-"}
                                        </p>
                                    </div>
                                    
                                    {/* Designation */}
                                    <div className="group  rounded-2xl  bg-linear-to-br  from-[#FFF8F1] to-[#FFFCF8]  border border-[#F2E6D8]  p-5 hover:border-[#E8CDAE] transition-all">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-9 h-9 rounded-xl bg-[#FCEBD7] text-[#B86F2E] flex items-center justify-center text-sm font-bold">
                                                න
                                            </div>
                                            <label className="text-xs font-semibold text-[#737D8D]">
                                                තනතුර
                                            </label>
                                        </div>
                                        <p className="text-[#1D2B3A] font-semibold text-base wrap-break-word">
                                            {loading ? "Loading..." : profile?.designation || "-"}
                                        </p>
                                    </div>

                                    {/* Office */}
                                    <div className="md:col-span-2 group  rounded-2xl  bg-linear-to-br  from-[#F5F8FC] to-[#FBFCFE]  border border-[#E3E8EF]  p-5 hover:border-[#BAC8D9] transition-all">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-9 h-9 rounded-xl bg-[#E8EEF6] text-[#496B94] flex items-center justify-center text-sm font-bold">
                                                න
                                            </div>
                                            <label className="text-xs font-semibold text-[#737D8D]">
                                                ආයතනය
                                            </label>
                                        </div>
                                        <p className="text-[#1D2B3A] font-semibold text-base wrap-break-word">
                                            {loading ? "Loading..." : profile?.office?.name || "-"}
                                        </p>
                                    </div>
                                </div>

                                {/* ================= ACTION AREA ================= */}
                                <div className="px-6  md:px-8 py-5  bg-[#FAFBFD]  border-t  border-[#EEF0F4] flex  flex-col  sm:flex-row items-center  justify-between gap-4">
                                    <div className="text-center sm:text-left">
                                        <p className=" text-sm  font-semibold text-[#344054]">
                                            Need to update your information?
                                        </p>
                                        <p className="text-xs text-[#7A8494]  mt-1">
                                            Edit your profile details from the settings page.
                                        </p>
                                    </div>

                                    <button
                                        className="
                                            w-full
                                            sm:w-auto
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            bg-[#002046]
                                            text-white
                                            hover:bg-[#163D6B]
                                            px-7
                                            py-3
                                            rounded-xl
                                            font-semibold
                                            text-sm
                                            shadow-sm
                                            hover:shadow-md
                                            transition-all
                                            duration-200
                                        "
                                        onClick={() => navigate('/setting')}
                                    >

                                        <svg
                                            className="w-4 h-4"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M12 20H21"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                            />

                                            <path
                                                d="M16.5 3.5C16.8978 3.10218 17.4374 2.87868 18 2.87868C18.5626 2.87868 19.1022 3.10218 19.5 3.5C19.8978 3.89782 20.1213 4.43739 20.1213 5C20.1213 5.56261 19.8978 6.10218 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />

                                        </svg>
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= FOOTER ================= */}
                    <footer className="border-t border-[#E1E4EA] bg-white mt-2">
                        <div className="
                            max-w-7xl
                            mx-auto
                            px-4
                            md:px-6
                            py-4
                            flex
                            flex-col
                            md:flex-row
                            items-center
                            justify-between
                            gap-3
                            text-center
                            md:text-left
                        ">
                            <p className="text-[#555E6B] font-medium text-xs leading-4">
                                © 2024 Southern Provincial Government of Sri Lanka.
                                All Rights Reserved.
                            </p>
                            <nav className="flex items-center gap-6">
                                <a href="#" className="text-[#555E6B] font-medium text-xs hover:text-[#002046] transition-colors">
                                    Privacy Policy
                                </a>
                                <a href="#" className="text-[#555E6B] font-medium text-xs hover:text-[#002046] transition-colors">
                                    Terms of Service
                                </a>
                                <a href="#" className="text-[#555E6B] font-medium text-xs hover:text-[#002046] transition-colors">
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
