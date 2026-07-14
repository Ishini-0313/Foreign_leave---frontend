import  { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar';
import Topbar from '../components/topbar';

const categories = ['කෙටි සංචාර සදහා','අධ්‍යයන සදහා','රැකියාව සදහා', 'අධ්‍යයන හා රැකියාව සදහා', 'කාලත්‍රය සදහා' ];


export default function Personal_leave_category() {
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
            <div className='flex flex-col flex-1 justify-center py-6 '>
                <div className="pb-12">
                    <div className="flex flex-col items-center gap-2">
                    <h2 className="text-[#002046] font-semibold text-2xl sm:text-3xl lg:text-[32px] leading-tight text-center">
                        Select Personal Leave Category
                    </h2>

                    <p className="text-[#44474E] text-center text-base leading-6 max-w-2xl">
                        Please choose the sub-category that describes the purpose of your personal travel 
                        to ensure correct administrative routing.
                    </p>
                    </div>
                </div>
            </div>
            
            {/* Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ">
                {
                    categories.map((category)=>(
                        
                        <button
                            key={category}
                            className="
                                bg-white
                                border border-gray-200
                                rounded-2xl
                                p-6
                                text-left
                                shadow-sm
                                hover:shadow-lg
                                hover:border-[#87A0CD]
                                transition-all
                                group
                            "
                        >
                            <div className="flex items-start justify-between">
                                <h3 className="text-[#002046] font-semibold text-lg">
                                {category}
                                </h3>

                                <span className="text-[#87A0CD] group-hover:translate-x-1 transition-transform">
                                →
                                </span>
                            </div>

                            <p className="mt-3 text-sm text-[#44474E]">
                                Apply Leave
                            </p>
                        </button>
                    ))
                }
             
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
