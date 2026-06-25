import { FilePlusCorner, FileText, LayoutDashboard, RotateCcw, ChevronsRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignaturePad from "signature_pad";
import { useApplication } from "../context/ApplicationContext";
import axios from "axios";

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

function ChevronRight() {
  return (
    <svg width="5" height="7" viewBox="0 0 5 7" fill="none">
      <path d="M2.68333 3.5L0 0.816667L0.816667 0L4.31667 3.5L0.816667 7L0 6.18333L2.68333 3.5Z" fill="#44474E" />
    </svg>
  );
}



export default function SignPage() {
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

  const [signature, setSignature] = useState("");
  const [signaturePreview, setSignaturePreview] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);

  const { applicationData,setApplicationData } = useApplication();

  const saveSignature = () => {
    if (!signaturePadRef.current) return;

    const signatureData = signaturePadRef.current.toDataURL("image/png");

    setApplicationData((prev: any) => ({
      ...prev,
      signature: signatureData,
    }));

    alert("Signature saved!");
  };

  const clearSignature = () => {
    signaturePadRef.current?.clear();
    setSignature("");
    setSignaturePreview("");
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

  const submitApplication = async()=>{
    const formData = new FormData();

    formData.append("name", applicationData.name);
    formData.append("position", applicationData.position);
    formData.append("service_id", applicationData.service_id);

    formData.append("dob", applicationData.dob);
    formData.append("nic", applicationData.nic);

    formData.append("ministry_id", applicationData.ministry_id);
    formData.append("institute_id", applicationData.institute_id);

    formData.append("arrangement_made_to_cover_duty", applicationData.arrangement_made_to_cover_duty);

    formData.append("purpose", applicationData.purpose);
    formData.append("nature_of_trip", applicationData.nature_of_trip);
    formData.append("awarding_agency", applicationData.awarding_agency);
    formData.append("expenses_mainly_to_be_met", applicationData.expenses_mainly_to_be_met);
    formData.append("goslFunds", JSON.stringify(applicationData.goslFunds));
    formData.append("foreign_loan_project_particulars_thereof", applicationData.foreign_loan_project_particulars_thereof);
    formData.append("commencement_date_of_trainig", applicationData.commencement_date_of_trainig);
    formData.append("completion_date_of_trainig", applicationData.completion_date_of_trainig);
    formData.append("departure_date", applicationData.departure_date);
    formData.append("return_date", applicationData.return_date);
    formData.append("country", applicationData.country);
    formData.append("foreign_address", applicationData.foreign_address);
    formData.append("foreign_phone", applicationData.foreign_phone);
    formData.append("foreign_fax", applicationData.foreign_fax);
    formData.append("foreign_email", applicationData.foreign_email);
    formData.append("has_previous_trip_report_submitted", applicationData.has_previous_trip_report_submitted);

    formData.append("previousTravels", JSON.stringify(applicationData.previousTravels));

    formData.append("name_and_designation", applicationData.name_and_designation);
    formData.append("class_or_grade", applicationData.class_or_grade);
    formData.append("first_appoinment_date", applicationData.first_appoinment_date);
    formData.append("last_return_date", applicationData.last_return_date);
    formData.append("leave_start_date", applicationData.leave_start_date);
    formData.append("leave_end_date", applicationData.leave_end_date);
    formData.append("reason_for_leave", applicationData.reason_for_leave);
    formData.append("is_travel_on_a_pre_paid_ticket", applicationData.is_travel_on_a_pre_paid_ticket);
    formData.append("relationship_of_the_person_sending_it", applicationData.relationship_of_the_person_sending_it);
    formData.append("cost_maintanence_abroad", applicationData.cost_maintanence_abroad);
    formData.append("relationship_of_person_meeting_expenditure", applicationData.relationship_of_person_meeting_expenditure);
    formData.append("address_during_leave", applicationData.address_during_leave);

    Object.entries(applicationData.documents).forEach(
      ([key, file]) => {
        if(file){
          formData.append(key, file as File)
        }
      }
    );

    formData.append("signature", applicationData.signature);

    const token = localStorage.getItem("token");

    await axios.post(
      "http://127.0.0.1:8000/api/application",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Application submitted succesfully!");
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
              <span className="text-[#002046] font-['Noto_Sans_Sinhala'] text-xs font-bold leading-4">126</span>
            </nav>

            <h2 className="text-[#002046] text-2xl sm:text-3xl font-semibold leading-10 tracking-tight mt-1">
              Create Foreign Leave Application
            </h2>
            <p className="text-[#44474E] text-base leading-6 mt-1">
              Please fill in the required fields to initiate your leave authorization process.
            </p>
          </div>

          {/* Form sections */}
          

            <div className="flex flex-col gap-4">
                <p className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-sm font-medium leading-5 tracking-[0.14px]">
                  මෙම අයදුම්පත්‍රයේ සපයා ඇති තොරතුරු නිවැරදි බව සහතික කරමි.
                </p>
                <div className="relative rounded bg-white overflow-hidden h-62.5">
                  <canvas ref={canvasRef} className="w-full h-full border-2 border-dashed border-[#C4C6CF] rounded-lg bg-white"/>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <p className="text-[#C4C6CF] text-base leading-6 select-none">
                      Sign inside this box
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <button
                    onClick={clearSignature}
                    className="flex items-center gap-1 text-[#BA1A1A] text-xs font-bold leading-4 hover:opacity-70 transition-opacity"
                  >
                    <RotateCcw/>
                    Clear Signature
                  </button>
                  <button className="flex items-center gap-4 px-8 py-1 bg-[#002046] text-white text-base font-semibold leading-10 tracking-tight rounded-lg hover:bg-[#001533] transition-colors"
                  onClick={saveSignature}>
                    <span>Save Signature</span>
                    <ChevronsRight/>
                  </button>
                </div>
                <button
                  className="w-full bg-amber-300 py-3 rounded-lg"
                  onClick={submitApplication}
                >
                  Submit Application
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
