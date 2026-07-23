import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Workflow,
  Building2,
  Users,
  ClipboardList,
  Landmark,
  Home,
  ChevronRight,
  Bell,
  CircleQuestionMark
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function Offices_mng() {
  const {id} = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [office_name, setOffice_name] = useState("");

  interface Office{
    id: number;
    name: string;
    district_office_id: number;
    status: string;
  }
  const [offices, setOffices] = useState<Office[]>([]);

  const add = async () => {
    try{
        await axios.post("http://127.0.0.1:8000/api/offices",{
            name : office_name,
            district_office_id: id
        });
        alert("District Office added sucessfully!");
        setOffice_name("");
        setShowModal(false);
    }catch(error){
        console.error(error);
        alert("Failed to add District Office !");
    }
  };

  

  useEffect(()=>{
    const loadOffices = async()=>{
        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/${id}/offices`);
            setOffices(response.data);
        }
        catch(error){
            console.error(error);
        }
    };
    loadOffices();
  }, [offices]);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: FileText, label: "Applications" },
    { icon: Workflow, label: "Workflow" },
    { icon: Building2, label: "Office Management", active: true },
    { icon: Users, label: "User Management" },
    { icon: ClipboardList, label: "Audit Logs" },
  ];

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
                src="/images.png"
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
              <Bell/>
            </button>
            {/* Help */}
            <button className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-[#E8E7EC] transition-colors">
              <CircleQuestionMark/>
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

        <div className="bg-white border-b border-gray-200 px-4 md:px-10 py-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Home size={18} />
            <span>Office Management</span>
          </div>
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-[#FAF9FD]">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 pt-6 md:pt-10 pb-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                    <div>
                    <h3 className="text-2xl font-semibold text-[#0B2957]">
                        Offices
                    </h3>

                    <p className="text-gray-600">
                        Offices of 
                    </p>
                    </div>
                    <button className="bg-[#002A5C] text-white px-6 py-3 rounded-lg hover:bg-[#001F47]"
                        onClick={()=>setShowModal(true)}>
                    + Add Office
                    </button>
                </div>
                <div className="space-y-5">
                    {offices.map((office) => (
                    <div
                        key={office.id}
                        className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between hover:shadow-sm transition"
                    >
                        <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                            <Landmark
                            size={28}
                            className="text-[#0B2957]"
                            />
                        </div>

                        <div>
                            <h4 className=" font-medium text-gray-800">
                            {office.name}
                            </h4>

                            <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-500">
                                Department
                            </span>

                            <span>•</span>

                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                {office.status}
                            </span>
                            </div>
                        </div>
                        </div>

                        <ChevronRight
                        size={28}
                        className="text-gray-500"
                        />
                    </div>
                    ))}
                </div>
            </div>
            {/* popup card */}
            {
                showModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100">
                        <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
                            <h2 className="text-xl font-semibold text-[#0B2957] mb-5">Add Ministry</h2>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium">
                                    Ministry Name
                                </label>
                                <input
                                    type="text"
                                    value={office_name}
                                    onChange={(e) =>
                                        setOffice_name(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B2957]"
                                    placeholder="Enter ministry name"
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setOffice_name("");
                                    }}
                                    className="px-4 py-2 border rounded-lg"
                                    >
                                    Cancel
                                </button>

                                <button
                                    onClick={add}
                                    className="bg-[#002A5C] text-white px-5 py-2 rounded-lg"
                                    >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </main>
      </div>
    </div>
  );
}