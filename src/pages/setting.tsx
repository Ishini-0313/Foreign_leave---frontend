import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Topbar from "../components/topbar";
import Footer from "../components/footer";
import toast from "react-hot-toast";
import { Mail, User, UserStar } from "lucide-react";

export default function Setting() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [designations, setDesignations] = useState([]);
    const [profile, setProfile] = useState({
        full_name: "",
        email: "",
        phone: "",
        designation_id: 0,
    });

    const [pwd, setPwd] = useState({
        current_password: "",
        new_password: "",
        new_password_confirmation: ""
    });

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

    // fetch designations
    useEffect(()=>{
    const fetchDesignation = async()=>{
        try{
        const response = await axios.get('http://127.0.0.1:8000/api/designations');
        setDesignations(response.data);
        }catch(error){
        console.error(error);
        }
    };
    fetchDesignation();
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

    const updateProfile = async()=>{
        try{
            const response = await axios.put(`http://127.0.0.1:8000/api/profile`,
                profile,
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            toast.success(response.data.message);
            navigate("/profile");
        }
        catch(error:any){
            console.error(error);

            if(error.response?.status === 422){
                const errors = error.response.data.errors;
                Object.values(errors).forEach((messages:any)=>{
                toast.error(messages[0]);
                });
                return;
            }

            toast.error(error.response?.data?.error || error.response?.data?.message || "Something went wrong");
        }
    };

    const changePassword = async () => {
        try{
            const response = await axios.put(`http://127.0.0.1:8000/api/password-change`,
                pwd,
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            toast.success(response.data.message);
            navigate("/profile");
        }catch(error:any){
            console.error(error);

            if(error.response?.status === 422){
                const errors = error.response.data.errors;
                Object.values(errors).forEach((messages:any)=>{
                toast.error(messages[0]);
                });
                return;
            }

            toast.error(error.response?.data?.error || error.response?.data?.message || "Something went wrong");
        }
    };

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
                <main className="flex-1 overflow-y-auto bg-linear-to-br from-[#F7F9FF] via-[#FAF9FD] to-[#F7FFFC]">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-6 md:py-10">
                        {/* ================= PAGE HEADER ================= */}
                        <div className="max-w-5xl mx-auto mb-8">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-[#5B7FC4]"></span>
                                <span className="text-sm font-semibold text-[#60708A] tracking-wide">ACCOUNT SETTINGS</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-[#002046]">Settings</h1>
                            <p className="mt-2 text-[#697386] text-sm md:text-base">Manage your personal information and account security.</p>
                        </div>

                        {/* PROFILE DETAILS */}
                        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-[#E7EAF0] shadow-[0_6px_25px_rgba(0,32,70,0.06)] overflow-hidden mb-7">
                            {/* Section Header */}
                            <div className="px-6 md:px-8 py-5 border-b border-[#EEF0F4] flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-[#EAF1FC] text-[#315F91] flex items-center justify-center ">

                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8"r="3"stroke="currentColor"strokeWidth="1.8"/>
                        <path d="M5 20C5.4 16.8 7.7 15 12 15C16.3 15 18.6 16.8 19 20" stroke="currentColor" strokeWidth="1.8"strokeLinecap="round" />
                    </svg>
                </div>

                <div>
                    <h2 className="
                        text-[#002046]
                        font-bold
                        text-lg
                    ">
                        Change Profile Details
                    </h2>

                    <p className="
                        text-[#7A8494]
                        text-xs
                        mt-0.5
                    ">
                        Update your personal information
                    </p>
                </div>

            </div>


            {/* Profile Form */}

            <div className="p-6 md:p-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                    {/* Name */}
                    <div>
                        <label className="
                            block
                            text-sm
                            font-semibold
                            text-[#344054]
                            mb-2
                        ">
                            නම
                        </label>

                        <div className="relative">

                            <div className="
                                absolute
                                left-3
                                top-1/2
                                -translate-y-1/2
                                w-8
                                h-8
                                rounded-lg
                                bg-[#EEF3FC]
                                text-[#5378B8]
                                flex
                                items-center
                                justify-center
                                text-xs
                                font-bold
                            ">
                                <User size={15}/>
                            </div>

                            <input
                                type="text"
                                value={profile.full_name}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        full_name: e.target.value
                                    })
                                }
                                className="
                                    w-full
                                    pl-14
                                    pr-4
                                    py-3.5
                                    rounded-xl
                                    border
                                    border-[#D9DEE7]
                                    bg-[#FBFCFE]
                                    text-[#1D2B3A]
                                    text-sm
                                    outline-none
                                    focus:border-[#6D8FC6]
                                    focus:ring-4
                                    focus:ring-[#6D8FC6]/10
                                    transition-all
                                "
                                placeholder="Enter your name"
                            />

                        </div>

                    </div>


                    {/* Email */}
                    <div>
                        <label className="block text-sm
                            font-semibold
                            text-[#344054]
                            mb-2
                        ">
                            පුද්ගලික විද්‍යුත් තැපෑල
                        </label>

                        <div className="relative">

                            <div className="
                                absolute
                                left-3
                                top-1/2
                                -translate-y-1/2
                                w-8
                                h-8
                                rounded-lg
                                bg-[#EEF3FC]
                                text-[#5378B8]
                                flex
                                items-center
                                justify-center
                                text-xs
                                font-bold
                            ">
                                <Mail size={15}/>
                            </div>

                            <input
                                type="text"
                                value={profile.email}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        email: e.target.value
                                    })
                                }
                                className="
                                    w-full
                                    pl-14
                                    pr-4
                                    py-3.5
                                    rounded-xl
                                    border
                                    border-[#D9DEE7]
                                    bg-[#FBFCFE]
                                    text-[#1D2B3A]
                                    text-sm
                                    outline-none
                                    focus:border-[#8B6FC1]
                                    focus:ring-4
                                    focus:ring-[#8B6FC1]/10
                                    transition-all
                                "
                                placeholder="Enter your email"
                            />

                        </div>

                    </div>

                    {/* Phone */}
                    <div>
                        <label className="
                            block
                            text-sm
                            font-semibold
                            text-[#344054]
                            mb-2
                        ">
                            ජංගම දුරකතන අංකය
                        </label>

                        <div className="relative">

                            <div className="
                                absolute
                                left-3
                                top-1/2
                                -translate-y-1/2
                                w-8
                                h-8
                                rounded-lg
                                bg-[#E4F4EC]
                                text-[#27825D]
                                flex
                                items-center
                                justify-center
                            ">

                                <svg
                                    className="w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M6.5 3.5H9L10.5 7.5L8.5 9C9.35 10.8 10.8 12.65 13 14.5L15 12.5L19 14V17.5C19 18.3284 18.3284 19 17.5 19C9.5 18.5 5.5 14.5 5 6.5C5 5.67157 5.67157 5 6.5 5V3.5Z"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                            </div>

                            <input
                                type="text"
                                value={profile.phone}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        phone: e.target.value
                                    })
                                }
                                className="
                                    w-full
                                    pl-14
                                    pr-4
                                    py-3.5
                                    rounded-xl
                                    border
                                    border-[#D9DEE7]
                                    bg-[#FBFCFE]
                                    text-[#1D2B3A]
                                    text-sm
                                    outline-none
                                    focus:border-[#46A77E]
                                    focus:ring-4
                                    focus:ring-[#46A77E]/10
                                    transition-all
                                "
                                placeholder="Enter your phone number"
                            />

                        </div>

                    </div>


                    {/* Designation */}

                    <div>
                        <label className="block  text-sm font-semibold text-[#344054] mb-2">
                            තනතුර
                        </label>
                        <div className="relative">
                            <div className="absolute  left-3  top-1/2 -translate-y-1/2 w-8 h-8  rounded-lg  bg-[#FFF0DF] text-[#B86F2E]  flex items-center justify-center text-xs font-bold">
                                <UserStar size={15}/>
                            </div>
                            {/* <input
                                type="number"
                                value={profile.designation_id}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        designation_id: e.target.value
                                    })
                                }
                                className="
                                    w-full
                                    pl-14
                                    pr-4
                                    py-3.5
                                    rounded-xl
                                    border
                                    border-[#D9DEE7]
                                    bg-[#FBFCFE]
                                    text-[#1D2B3A]
                                    text-sm
                                    outline-none
                                    focus:border-[#D28A4B]
                                    focus:ring-4
                                    focus:ring-[#D28A4B]/10
                                    transition-all
                                "
                                placeholder="Enter your designation"
                            /> */}

                            <select 
                                name="designation_id" 
                                value={profile.designation_id}
                                onChange={(e) =>
                                    setProfile({
                                    ...profile,
                                    designation_id: Number(e.target.value)
                                    })
                                }
                                className="w-full  pl-14  pr-4  py-3.5  rounded-xl  border border-[#D9DEE7]  bg-[#FBFCFE]  text-[#1D2B3A]  text-sm outline-none  focus:border-[#D28A4B]  focus:ring-4 focus:ring-[#D28A4B]/10 transition-all"
                                >
                                    <option value={0}>-- Select Designation --</option>

                                    {designations.map((designation: any) => (
                                        <option key={designation.id} value={designation.id}>
                                            {designation.name}
                                        </option>
                                    ))}
                            </select>

                        </div>

                    </div>

                </div>


                {/* Update Button */}

                <div className="
                    mt-8
                    pt-6
                    border-t
                    border-[#EEF0F4]
                    flex
                    flex-col
                    sm:flex-row
                    items-center
                    justify-between
                    gap-4
                ">

                    <div className="text-center sm:text-left">

                        <p className="
                            text-sm
                            font-semibold
                            text-[#344054]
                        ">
                            Keep your information up to date
                        </p>

                        <p className="
                            text-xs
                            text-[#7A8494]
                            mt-1
                        ">
                            Changes will be reflected in your profile.
                        </p>

                    </div>

                    <button
                        onClick={updateProfile}
                        disabled={loading}
                        className="
                            w-full
                            sm:w-auto
                            flex
                            items-center
                            justify-center
                            gap-2
                            bg-[#002046]
                            hover:bg-[#163D6B]
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                            text-white
                            px-7
                            py-3
                            rounded-xl
                            font-semibold
                            text-sm
                            shadow-sm
                            hover:shadow-md
                            transition-all
                        "
                    >

                        

                        Update Profile

                    </button>

                </div>

            </div>

        </div>


        {/* ===================================================== */}
        {/* SECURITY / PASSWORD */}
        {/* ===================================================== */}

        <div className="
            max-w-5xl
            mx-auto
            bg-white
            rounded-3xl
            border
            border-[#E7EAF0]
            shadow-[0_6px_25px_rgba(0,32,70,0.06)]
            overflow-hidden
        ">

            {/* Security Header */}

            <div className="
                px-6
                md:px-8
                py-5
                border-b
                border-[#EEF0F4]
                flex
                items-center
                gap-3
            ">

                <div className="
                    w-11
                    h-11
                    rounded-xl
                    bg-[#FFF1E9]
                    text-[#C9683A]
                    flex
                    items-center
                    justify-center
                ">

                    <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <rect
                            x="5"
                            y="10"
                            width="14"
                            height="10"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        />

                        <path
                            d="M8 10V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V10"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />

                        <circle
                            cx="12"
                            cy="15"
                            r="1"
                            fill="currentColor"
                        />
                    </svg>

                </div>

                <div>

                    <h2 className="
                        text-[#002046]
                        font-bold
                        text-lg
                    ">
                        Change Password
                    </h2>

                    <p className="
                        text-[#7A8494]
                        text-xs
                        mt-0.5
                    ">
                        Keep your account secure with a strong password
                    </p>

                </div>

            </div>


            {/* Security Info */}

            <div className="p-6 md:p-8">

                <div className="
                    flex
                    gap-3
                    p-4
                    rounded-2xl
                    bg-[#F5F8FD]
                    border
                    border-[#E3EAF5]
                    mb-7
                ">

                    <div className="
                        shrink-0
                        w-8
                        h-8
                        rounded-full
                        bg-[#E4ECF9]
                        text-[#5579B2]
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-sm
                    ">
                        i
                    </div>

                    <p className="
                        text-xs
                        md:text-sm
                        text-[#647084]
                        leading-6
                    ">
                        Use a strong password that contains a combination of
                        letters, numbers, and special characters. Never share
                        your password with anyone.
                    </p>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">


                    {/* Current Password */}

                    <div>

                        <label className="
                            block
                            text-sm
                            font-semibold
                            text-[#344054]
                            mb-2
                        ">
                            Enter Current Password
                        </label>

                        <input
                            type="password"
                            value={pwd.current_password}
                            onChange={(e) =>
                                setPwd({
                                    ...pwd,
                                    current_password: e.target.value
                                })
                            }
                            className="
                                w-full
                                px-4
                                py-3.5
                                rounded-xl
                                border
                                border-[#D9DEE7]
                                bg-[#FBFCFE]
                                text-[#1D2B3A]
                                text-sm
                                outline-none
                                focus:border-[#C9683A]
                                focus:ring-4
                                focus:ring-[#C9683A]/10
                                transition-all
                            "
                            placeholder="Current password"
                        />

                    </div>


                    {/* New Password */}

                    <div>

                        <label className="
                            block
                            text-sm
                            font-semibold
                            text-[#344054]
                            mb-2
                        ">
                            Enter New Password
                        </label>

                        <input
                            type="password"
                            value={pwd.new_password}
                            onChange={(e) =>
                                setPwd({
                                    ...pwd,
                                    new_password: e.target.value
                                })
                            }
                            className="
                                w-full
                                px-4
                                py-3.5
                                rounded-xl
                                border
                                border-[#D9DEE7]
                                bg-[#FBFCFE]
                                text-[#1D2B3A]
                                text-sm
                                outline-none
                                focus:border-[#C9683A]
                                focus:ring-4
                                focus:ring-[#C9683A]/10
                                transition-all
                            "
                            placeholder="New password"
                        />

                    </div>


                    {/* Confirm Password */}

                    <div>

                        <label className="
                            block
                            text-sm
                            font-semibold
                            text-[#344054]
                            mb-2
                        ">
                            Confirm New Password
                        </label>

                        <input
                            type="password"
                            value={pwd.new_password_confirmation}
                            onChange={(e) =>
                                setPwd({
                                    ...pwd,
                                    new_password_confirmation: e.target.value
                                })
                            }
                            className="
                                w-full
                                px-4
                                py-3.5
                                rounded-xl
                                border
                                border-[#D9DEE7]
                                bg-[#FBFCFE]
                                text-[#1D2B3A]
                                text-sm
                                outline-none
                                focus:border-[#C9683A]
                                focus:ring-4
                                focus:ring-[#C9683A]/10
                                transition-all
                            "
                            placeholder="Confirm new password"
                        />

                    </div>

                </div>


                {/* Password Button */}

                <div className="
                    mt-8
                    pt-6
                    border-t
                    border-[#EEF0F4]
                    flex
                    flex-col
                    sm:flex-row
                    items-center
                    justify-between
                    gap-4
                ">


                    <div className="
                        flex
                        flex-col
                        sm:flex-row
                        gap-3
                        w-full
                        sm:w-auto
                    ">

                        

                        <button
                            onClick={changePassword}
                            className="
                                w-full
                                sm:w-auto
                                px-7
                                py-3
                                rounded-xl
                                bg-[#C9683A]
                                hover:bg-[#B4572E]
                                text-white
                                font-semibold
                                text-sm
                                shadow-sm
                                hover:shadow-md
                                transition-all
                            "
                        >
                            Change Password
                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>


    {/* ================= FOOTER ================= */}

    <Footer />

</main>
            </div>
        </div>
    );
}
