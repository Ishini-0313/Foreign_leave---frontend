import { RotateCcw, ChevronsRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignaturePad from "signature_pad";
import { useApplication } from "../context/ApplicationContext";
import axios from "axios";
import Navbar from "../components/navbar";
import Topbar from "../components/topbar";

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
      <Navbar
        user={user}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <Topbar
          user={user}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

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
