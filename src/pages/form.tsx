import axios from "axios";
import { FilePlusCorner, FileText, LayoutDashboard } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignaturePad from "signature_pad";
import { useApplication } from "../context/ApplicationContext";
import type { PreviousTravel } from "../context/ApplicationContext";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard
    
  },
  {
    label: "Applications",
    icon: FileText,
  },
  {
    label: "New Application",
    icon: FilePlusCorner,
    active: true,
  },
];


function FormCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#C4C6CF] rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] p-8">
      {children}
    </div>
  );
}

function ChevronRight() {
  return (
    <svg width="5" height="7" viewBox="0 0 5 7" fill="none">
      <path d="M2.68333 3.5L0 0.816667L0.816667 0L4.31667 3.5L0.816667 7L0 6.18333L2.68333 3.5Z" fill="#44474E" />
    </svg>
  );
}

const fundOptions = [
  {
    label: "ගුවන් ගමන්",
    key: "air_travel",
  },
  {
    label: "යැපීම් දීමනා",
    key: "subsistence",
  },
  {
    label: "පාඨමාලා ගාස්තු",
    key: "course_fees",
  },
  {
    label: "අතිරේක වියදම්",
    key: "additional_expenses",
  },
  {
    label: "වෙනත් පුද්ගලික වියදම්",
    key: "other_personal_expenses",
  },
];

export default function Form() {
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
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [services, setServices] = useState([]);
  const [ministries, setMinistries] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);

  const {applicationData, setApplicationData} = useApplication();


  const addTravelRow = () => {
    setApplicationData({
      ...applicationData,
      previousTravels: [
        ...applicationData.previousTravels,
        {
          year: "",
          purpose: "",
          period: "",
          country: "",
        },
      ],
    });
  };

  const handleTravelChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedTravels = [...applicationData.previousTravels];

    updatedTravels[index] = {
      ...updatedTravels[index],
      [field]: value,
    };

    setApplicationData({
      ...applicationData,
      previousTravels: updatedTravels,
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const resizeCanvas = () => {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);

      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;

      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.scale(ratio, ratio);
      }

      signaturePadRef.current?.clear();
    };

    resizeCanvas();

    signaturePadRef.current = new SignaturePad(canvas, {
      penColor: "#1A1B1E",
      minWidth: 1,
      maxWidth: 3,
    });

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, ministriesRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/services"),
          axios.get("http://127.0.0.1:8000/api/ministries"),
        ]);

        setServices(servicesRes.data);
        setMinistries(ministriesRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!applicationData.ministry_id) return;

    const fetchSubOffices = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/sub-offices",
          {
            params: {
              parent_office_id: applicationData.ministry_id,
            },
          }
        );

        setInstitutes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubOffices();
  }, [applicationData.ministry_id]);

  

  const handleNext = ()=>{
    navigate("/form2");
  };

  return (
    <div className="flex h-screen bg-[#FAF9FD] font-[Inter,sans-serif] overflow-hidden relative">
      {/* Mobile sidebar overlay */}
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

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-[#C4C6CF] bg-[#FAF9FD] flex items-center px-6 justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-[#44474E] hover:bg-[#E8E6EC] rounded"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 5H18M2 10H18M2 15H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <h1 className="text-[#002046] text-xl lg:text-2xl font-bold leading-8">
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
                  {user?.full_name}
                </p>
                <p className="text-[#44474E] text-[10px] leading-3.75">{user?.role_id}</p>
              </div>
              {/* <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/1a35442aef3b23cf026a35860f88273fb0bb0a0e?width=80"
                alt="User Profile Avatar"
                className="w-10 h-10 rounded-xl border border-[#002046] object-cover"
              /> */}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 sm:px-6 py-6 space-y-8 overflow-y-auto">
          {/* Page header */}
          <div>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-3">
              <span className="text-[#44474E] text-xs font-semibold leading-4">Home</span>
              <ChevronRight />
              <span className="text-[#44474E] text-xs font-semibold leading-4">New Leave Request</span>
              <ChevronRight />
              <span className="text-[#002046] font-['Noto_Sans_Sinhala'] text-xs font-bold leading-4">16 වැනි පරිශිෂ්ටය</span>
            </nav>

            <h2 className="text-[#002046] text-2xl sm:text-3xl font-semibold leading-10 tracking-tight mt-1">
              Create Foreign Leave Application
            </h2>
            <p className="text-[#44474E] text-base leading-6 mt-1">
              Please fill in the required fields to initiate your leave authorization process.
            </p>
          </div>

          {/* Form sections */}
          <div className="flex flex-col gap-8">

            {/* Section 1 */}
            <FormCard>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    1:1 නම
                  </label>
                  <input
                    type="text"
                    value={applicationData.name}
                    onChange={(e)=> setApplicationData({...applicationData, name:e.target.value})}
                    className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    1:2 තනතුර
                  </label>
                  <input
                    type="text"
                    value={applicationData.position}
                    onChange={(e)=> setApplicationData({...applicationData, position:e.target.value})}
                    className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    1:3 නිලධාරියා අයත්වන සේවය
                  </label>
                  <select 
                    name="service_id"
                    className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    value={applicationData.service_id}
                    onChange={(e)=> setApplicationData({...applicationData, service_id:e.target.value})}
                  >
                    <option value="">-- Select Service --</option>
                    {services.map((service:any)=>(
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                    ))}
                  </select>
                </div>
              </div>
            </FormCard>

            {/* Section 2 */}
            <FormCard>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* DOB */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    2:1 උපන් දිනය
                  </label>
                  <input
                    type="date"
                    value={applicationData.dob}
                    onChange={(e)=> setApplicationData({...applicationData, dob:e.target.value})}
                    className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>

                {/* NIC */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    2:2 හැදුනුම්පත් අංකය
                  </label>
                  <input
                    type="text"
                    value={applicationData.nic}
                    onChange={(e)=> setApplicationData({...applicationData, nic:e.target.value})}
                    className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>
              </div>
            </FormCard>

            {/* Section 3: Ministry & Department */}
            <FormCard>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    3:1 අමාත්‍යාංශය / පළාත් සභාව
                  </label>
                  <select 
                    name="ministry_id"
                    value={applicationData.ministry_id}
                    onChange={(e)=> setApplicationData({...applicationData, ministry_id:e.target.value})}
                    className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  >
                    <option value="">-- Select Ministry --</option>
                    {ministries.map((ministry: any)=>(
                      <option key={ministry.id} value={ministry.id}>{ministry.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    3:2 දෙපාර්තමේන්තුව / ආයතනය
                  </label>
                  <select 
                    name="institute_id"
                    value={applicationData.institute_id}
                    onChange={(e)=> setApplicationData({...applicationData, institute_id:e.target.value})}
                    className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  >
                    <option value="">-- Select Department / Institute --</option>
                    {institutes.map((institute: any)=>(
                      <option key={institute.id} value={institute.id}>{institute.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </FormCard>

            {/* Section 4: Work arrangement */}
            <FormCard>
              <div className="flex flex-col gap-2">
                <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                  4. රාජකාරි ආවරණයට / වැඩ බැලීමට යොදා ඇති වැඩ පිළිවෙළ
                </label>
                <input
                    type="text"
                    value={applicationData.arrangement_made_to_cover_duty}
                    onChange={(e)=> setApplicationData({...applicationData, arrangement_made_to_cover_duty:e.target.value})}
                    className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
              </div>
            </FormCard>

            {/* Section 5: Detailed Travel Info */}
            <FormCard>
              <div className="flex flex-col gap-6">
                {/* 5:1 */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    5:1 ගමනේ අරමුණ / පුහුණු ක්ශේත්‍රය
                  </label>
                  <input
                    type="text"
                    value={applicationData.purpose}
                    onChange={(e)=> setApplicationData({...applicationData, purpose:e.target.value})}
                    className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>

                {/* 5:2 Nature of trip */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    5:2 ගමනේ ස්වභාවය
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-center gap-2 w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors">
                      <input
                        name="trip_nature"
                        type="radio"
                        value="official"
                        checked={applicationData.nature_of_trip === "official"}
                        onChange={(e)=> setApplicationData({...applicationData, nature_of_trip:e.target.value})}
                      />
                      <label htmlFor="">නිල</label>
                    </div>
                    <div className="flex items-center gap-2 w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors">
                      <input
                        name="trip_nature"
                        type="radio"
                        value="personal"
                        checked={applicationData.nature_of_trip === "personal"}
                        onChange={(e)=> setApplicationData({...applicationData, nature_of_trip:e.target.value})}
                      />
                      <label htmlFor="">පුද්ගලික</label>
                    </div>
                  </div>
                </div>

                {/* 5:3 */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    5:3 පුහුණුව සදහා නම් ප්‍රදානය කරනු ලබන ආයතනය
                  </label>
                  <input
                        type="text"
                        value={applicationData.awarding_agency}
                        onChange={(e)=> setApplicationData({...applicationData, awarding_agency:e.target.value})}
                        className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>

                {/* 5:4 Expenses */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    5:4 ප්‍රධාන වශයෙන් වියදම් දරන්නේ කෙසේද?
                  </label>
                  <div className="border border-[#C4C6CF] rounded p-4 space-y-6.75">
                    {[
                      "විදේශ සම්පත් දෙපාර්තමේන්තුව මගින්",
                      "ව්‍යාපෘතියකින්",
                      "ඍජුව ලැබුණ ප්‍රදානයක්",
                      "තමාගේම මුදලක්",
                      "ශ්‍රී ලංකා රජයෙන්",
                    ].map((opt) => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="radio" 
                          name="expenses" 
                          className="w-4 h-4 accent-[#002046]" 
                          value={opt} 
                          checked={applicationData.expenses_mainly_to_be_met === opt}
                          onChange={(e)=> setApplicationData({...applicationData, expenses_mainly_to_be_met:e.target.value})}
                        />
                        <span className="font-['Noto_Sans_Sinhala'] text-xs text-black tracking-[0.6px] uppercase">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 5:5 Govt funds */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    5:5 ශ්‍රී ලංකා රජයේ අරමුදලින් ලබාගන්නේ නම් එහි ස්වභාවය හා මුදල
                  </label>
                  <div className="border border-[#C4C6CF] rounded p-4 space-y-6.75">
                    {fundOptions.map((item) => (
                      <div key={item.key} className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={applicationData.goslFunds[item.key].selected}
                          onChange={(e) =>
                            setApplicationData({
                              ...applicationData,
                              goslFunds: {
                                ...applicationData.goslFunds,
                                [item.key]: {
                                  ...applicationData.goslFunds[item.key],
                                  selected: e.target.checked,
                                },
                              },
                            })
                          }
                          className="w-4 h-4 accent-[#002046]"
                        />

                        <span className="flex-1 text-xs font-['Noto_Sans_Sinhala']">
                          {item.label}
                        </span>

                        <input
                          type="number"
                          value={applicationData.goslFunds[item.key].amount}
                          onChange={(e) =>
                            setApplicationData({
                              ...applicationData,
                              goslFunds: {
                                ...applicationData.goslFunds,
                                [item.key]: {
                                  ...applicationData.goslFunds[item.key],
                                  amount: e.target.value,
                                },
                              },
                            })
                          }
                          placeholder="Amount (LKR)"
                          className="w-40 border border-[#C4C6CF] rounded px-3 py-2 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5:6 */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    5:6 විදේශ ණය / ව්‍යාපෘතිය යටතේ වන අරමුදලක් නම් ඒ පිළිබද විස්තර
                  </label>
                  <input
                    type="text"
                    value={applicationData.foreign_loan_project_particulars_thereof}
                    onChange={(e)=> setApplicationData({...applicationData, foreign_loan_project_particulars_thereof:e.target.value})}
                    className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>

                {/* 5:7 */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    5:7 පාඨමාලාව / පුහුණුව ආරම්භක දිනය
                  </label>
                  <input
                    type="date"
                    value={applicationData.commencement_date_of_trainig}
                    onChange={(e)=> setApplicationData({...applicationData, commencement_date_of_trainig:e.target.value})}
                    className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>

                {/* 5:8 */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    5:8 අවසාන දිනය
                  </label>
                  <input
                    type="date"
                    value={applicationData.completion_date_of_trainig}
                    onChange={(e)=> setApplicationData({...applicationData, completion_date_of_trainig:e.target.value})}
                    className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>

                {/* 5:9 Departure/Return dates */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    5:9 පිටත්වන දිනය සහ ආපසු පැමිණෙන දිනය
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="date"
                      value={applicationData.departure_date}
                      onChange={(e)=> setApplicationData({...applicationData, departure_date:e.target.value})}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                    <input
                      type="date"
                      value={applicationData.return_date}
                      onChange={(e)=> setApplicationData({...applicationData, return_date:e.target.value})}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                  </div>
                </div>

                {/* 5:10 Countries */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    5:10 යන රටවල්
                  </label>
                  <input
                      type="text"
                      value={applicationData.country}
                      onChange={(e)=> setApplicationData({...applicationData, country:e.target.value})}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>

                {/* 5:11 Foreign address */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    5:11 විදේශ ලිපිනය: දුරකතන, ෆැක්ස් , ඊමේල් අංක සහිතව
                  </label>
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      value={applicationData.foreign_address}
                      onChange={(e)=> setApplicationData({...applicationData, foreign_address:e.target.value})}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                    <input
                      type="text"
                      value={applicationData.foreign_phone}
                      onChange={(e)=> setApplicationData({...applicationData, foreign_phone:e.target.value})}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                    <input
                      type="text"
                      value={applicationData.foreign_fax}
                      onChange={(e)=> setApplicationData({...applicationData, foreign_fax:e.target.value})}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                    <input
                      type="text"
                      value={applicationData.foreign_email}
                      onChange={(e)=> setApplicationData({...applicationData, foreign_email:e.target.value})}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                  </div>
                </div>

                {/* 5:12 Report submitted */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    5:12 පසුගිය නිල ගමනට අදාළ වාර්තාව ඉදිරිපත් කළේද?
                  </label>
                  <div className="border border-[#C4C6CF] rounded p-4 space-y-6.75">
                    <label htmlFor="" className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="reportSubmitted"
                        value="true"
                        checked={applicationData.has_previous_trip_report_submitted === true}
                        onChange={() =>
                            setApplicationData({
                                ...applicationData,
                                has_previous_trip_report_submitted: true
                            })
                        }
                      />
                      <span className="font-['Noto_Sans_Sinhala'] text-xs text-black tracking-[0.6px] uppercase">
                          ඔව්
                      </span>
                    </label>
                    
                    <label htmlFor="" className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="reportSubmitted"
                        value="false"
                        checked={applicationData.has_previous_trip_report_submitted === false}
                        onChange={() =>
                            setApplicationData({
                                ...applicationData,
                                has_previous_trip_report_submitted: false
                            })
                        }
                      />
                      <span className="font-['Noto_Sans_Sinhala'] text-xs text-black tracking-[0.6px] uppercase">
                          නැත
                      </span>
                    </label>
                    
                    
                  </div>
                </div>
              </div>
            </FormCard>

            {/* Section 6: Previous foreign travel */}
            <FormCard>
              <div className="flex flex-col gap-4">
                <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                  6. අයදුම්කරු පවත්නා වර්ෂයේදී සහ පසුගිය වර්ෂ 3 තුළ ගිය විදේශ ගමන් තොරතුරු
                </label>

                {/* Table */}
                <div className="border border-[#C4C6CF] rounded overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-[#C4C6CF]">
                        <th className="text-left px-4 py-3 font-['Noto_Sans_Sinhala'] font-bold text-black tracking-[0.6px] uppercase border-r border-[#C4C6CF]">
                          වර්ෂය
                        </th>
                        <th className="text-left px-4 py-3 font-['Noto_Sans_Sinhala'] font-bold text-black tracking-[0.6px] uppercase border-r border-[#C4C6CF]">
                          ගමනේ අරමුණු
                        </th>
                        <th className="text-left px-4 py-3 font-['Noto_Sans_Sinhala'] font-bold text-black tracking-[0.6px] uppercase border-r border-[#C4C6CF]">
                          කාලය
                        </th>
                        <th className="text-left px-4 py-3 font-['Noto_Sans_Sinhala'] font-bold text-black tracking-[0.6px] uppercase">
                          රට
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {applicationData.previousTravels.map((row: PreviousTravel , i: number) => (
                        <tr key={i} className="border-b border-[#C4C6CF]">
                          <td className="px-2 py-2 border-r border-[#C4C6CF]">
                            <input
                              type="text"
                              value={row.year}
                              onChange={(e) => handleTravelChange(
                                  i,
                                  "year",
                                  e.target.value
                                )
                              }
                              className="w-full outline-none text-xs px-1"
                            />
                          </td>
                          <td className="px-2 py-2 border-r border-[#C4C6CF]">
                            <input
                              type="text"
                              value={row.purpose}
                              onChange={(e) => handleTravelChange(
                                i,
                                "purpose",
                                e.target.value
                              )}
                              className="w-full outline-none text-xs px-1"
                            />
                          </td>
                          <td className="px-2 py-2 border-r border-[#C4C6CF]">
                            <input
                              type="text"
                              value={row.period}
                              onChange={(e) => handleTravelChange(
                                i,
                                "period",
                                e.target.value
                              )}
                              className="w-full outline-none text-xs px-1"
                            />
                          </td>
                          <td className="px-2 py-2">
                            <input
                              type="text"
                              value={row.country}
                              onChange={(e) => handleTravelChange(
                                i,
                                "country",
                                e.target.value
                              )}
                              className="w-full outline-none text-xs px-1"
                            />
                          </td>
                        </tr>
                      ))}
                      {applicationData.previousTravels.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-4 py-6 text-center text-[#74777F] text-xs">
                            No records. Click "Add +" to add a row.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={addTravelRow}
                    className="px-5 py-3 border border-[#002046] rounded-lg text-[#002046] font-bold text-sm hover:bg-[#002046] hover:text-white transition-colors"
                  >
                    Add +
                  </button>
                </div>
              </div>
            </FormCard>

            <button className="flex items-center gap-4 px-8 py-1 bg-[#002046] text-white text-base font-semibold leading-10 tracking-tight rounded-lg hover:bg-[#001533] transition-colors w-full"
            onClick={handleNext}>
                    <span>Next</span>
                    <ChevronRight/>
            </button>
          </div>

          {/* Footer */}
        <footer className="border-t border-[#C4C6CF] px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-[#44474E] text-xs font-semibold leading-4">
            © 2024 Southern Provincial Government of Sri Lanka. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
            <a href="#" className="text-[#44474E] text-base leading-6 hover:text-[#002046] transition-colors">
                Privacy Policy
            </a>
            <a href="#" className="text-[#44474E] text-base leading-6 hover:text-[#002046] transition-colors">
                Terms of Service
            </a>
            <a href="#" className="text-[#44474E] text-base leading-6 hover:text-[#002046] transition-colors">
                Contact Support
            </a>
            </div>
        </div>
        </footer>
        </main>
      </div>
    </div>
  );
}
