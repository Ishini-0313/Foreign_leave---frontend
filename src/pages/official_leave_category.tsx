import  { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar';
import Topbar from '../components/topbar';
import Footer from '../components/footer';
import { useLeaveCategory } from '../context/LeaveCategoryContext';

//const categories = ['කෙටි සංචාර සදහා','අධ්‍යයන සදහා','රැකියාව සදහා', 'අධ්‍යයන හා රැකියාව සදහා', 'කාලත්‍රය සදහා' ];

type PersonalLeaveCategory =
    | "leave_without_offers"
    | "leave_with_warm_cloths_offer"
    | "leave_with_additional_offer"
    | "leave_with_warm_cloths_and_additional_offer";

export default function OfficialLeaveCategory() {
    const {leaveCategory,setNatureOfTrip,setLeaveCategory, natureOfTrip} = useLeaveCategory();
    const categories: {id:PersonalLeaveCategory,name:String}[] = [
        {
            id: "leave_without_offers",
            name: "දීමනා රහිත නිවඩු",
        },
        {
            id: "leave_with_warm_cloths_offer",
            name: "උණුසුම් ඇදුම් දීමනාව සහිත නිවාඩු",
        },
        {
            id: "leave_with_additional_offer",
            name: "අනියම් දීමනාව සහිත නිවාඩු",
        },
        {
            id: "leave_with_warm_cloths_and_additional_offer",
            name: "උණුසුම් ඇදුම් සහ අනියම් දීමනා සහිත නිවාඩු",
        },
    ];
    
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(()=>{
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
                        {/* Page Header */}
                        <div className="text-center mb-10 lg:mb-14">
                            {/* Small label */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-white shadow-sm border border-gray-100">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#5B8DEF]"></span>
                                <span className="text-sm font-medium text-[#526070]"> Official Foreign Leave</span>
                            </div>
        
                            {/* Main heading */}
                            <h2 className="font-bold text-3xl sm:text-4xl lg:text-[40px] leading-tight
                                            bg-linear-to-r from-[#002046] via-[#315FA5] to-[#7B4FA3]
                                            bg-clip-text text-transparent">
                                Select Official Leave Category
                            </h2>
        
                            {/* Description */}
                            <p className="mt-4 text-[#5E6470] text-base sm:text-lg leading-7 max-w-2xl mx-auto">
                                Please choose the sub-category that describes the purpose of your
                                personal travel to ensure correct administrative routing.
                            </p>
                        </div>
        
                        {/* Selection Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-6">
                            {categories.map((category, index) => {
            
                                const cardColors = [
                                {
                                    bg: "from-[#EAF2FF] to-[#F7FAFF]",
                                    icon: "bg-[#5B8DEF]",
                                    border: "hover:border-[#7FA6E8]",
                                    text: "text-[#315FA5]",
                                },
                                {
                                    bg: "from-[#EFFFF8] to-[#F8FFFC]",
                                    icon: "bg-[#35B77A]",
                                    border: "hover:border-[#71D3A7]",
                                    text: "text-[#21865A]",
                                },
                                {
                                    bg: "from-[#FFF2E8] to-[#FFF9F5]",
                                    icon: "bg-[#F28C52]",
                                    border: "hover:border-[#F3B08A]",
                                    text: "text-[#C56532]",
                                },
                                {
                                    bg: "from-[#F3EDFF] to-[#FBF9FF]",
                                    icon: "bg-[#8B62D9]",
                                    border: "hover:border-[#B79AEF]",
                                    text: "text-[#7045B4]",
                                },
                                {
                                    bg: "from-[#FFF0F5] to-[#FFF9FB]",
                                    icon: "bg-[#E76F9B]",
                                    border: "hover:border-[#F0A5BE]",
                                    text: "text-[#C44D78]",
                                },
                                ];
            
                                const color = cardColors[index];
            
                                return (
                                    <button
                                        key={category.id}
                                        className={`
                                        relative overflow-hidden
                                        bg-linear-to-br ${color.bg}
                                        border border-white
                                        rounded-3xl
                                        p-6
                                        text-left
                                        shadow-[0_4px_20px_rgba(0,32,70,0.06)]
                                        ${color.border}
                                        hover:shadow-[0_12px_30px_rgba(0,32,70,0.12)]
                                        hover:-translate-y-2
                                        transition-all duration-300
                                        group
                                        min-h-52.5
                                        flex flex-col justify-between
                                        `}
                                        onClick={() => {
                                        setNatureOfTrip("official");
                                        setLeaveCategory(category.id);
                                        navigate("/options");
                                        }}
                                    >
                
                                        {/* Decorative circle */}
                                        <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/50 group-hover:scale-125 transition-transform duration-500"></div>
                
                                        <div>
                                            {/* Number / Icon */}
                                            <div className={`relative z-10 w-12 h-12 rounded-2xl ${color.icon} text-white flex items-center justify-center font-bold text-lg shadow-md mb-5 group-hover:scale-110 transition-transform duration-300`}>{index + 1}</div>
                
                                            {/* Category name */}
                                            <h3 className={`${color.text} font-bold text-lg leading-7`}>{category.name}</h3>
                                        </div>
                
                                        {/* Bottom section */}
                                        <div className="flex items-center justify-between mt-6">
                                            <span className="text-sm text-[#697386] font-medium">Apply Leave</span>
                                            <span className={`w-9 h-9 rounded-full bg-white  ${color.text} flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-transform duration-300 `}>
                                                →
                                            </span>
                                        </div>
                
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
}

