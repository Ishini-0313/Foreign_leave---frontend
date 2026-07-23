import axios from "axios";
import { ChevronsRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApplication } from "../context/ApplicationContext";
import Navbar from "../components/navbar";
import Topbar from "../components/topbar";

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


export default function Form2() {
  const {id} = useParams();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {applicationData, setApplicationData, isEditMode, applicationId} = useApplication();

  const [services, setServices] = useState([]);
  const [grades, setGrades] = useState([]);
  const [institutes, setInstitutes] = useState([]);

  const navigate = useNavigate();

  useEffect(()=>{
    console.log("form2: "+isEditMode);
    const storedUser = localStorage.getItem("user");
    console.log("Stored User:", storedUser);
    if(!storedUser){
      navigate("/");
      return;
    }
    setUser(JSON.parse(storedUser));
  },[]);

  const handleNext = ()=>{
    navigate(`/documents/edit/${id}`);
  };



  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/services');
        setServices(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchGrades = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/grades');
        setGrades(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchServices();
    fetchGrades();
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
          <div className="flex flex-col gap-8">

            <FormCard>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    1. දෙපාර්තමේන්තුව
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

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    2. නම හා නිලනාමය
                  </label>
                  <input
                      type="text"
                      value={applicationData.name_and_designation}
                      onChange={(e)=> setApplicationData({...applicationData, name_and_designation:e.target.value})}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    3. සේවය, පංතිය හෝ ශ්‍රේණිය
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <select 
                        name="service_id"
                        value={applicationData.service_id}
                        onChange={(e)=> setApplicationData({...applicationData, service_id:e.target.value})}
                        className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    >
                        <option value="">-- Select Service --</option>
                        {services.map((service:any)=>(
                            <option key={service.id} value={service.name}>
                            {service.name}
                            </option>
                        ))}
                    </select>
                    <select 
                        name="grade_id"
                        value={applicationData.class_or_grade}
                        onChange={(e)=> setApplicationData({...applicationData, class_or_grade:e.target.value})}
                        className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    >
                        <option value="">-- Select Grade --</option>
                        {grades.map((grade:any)=>(
                            <option key={grade.id} value={grade.id}>
                            {grade.name}
                            </option>
                        ))}
                    </select>
                  </div>
                  
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    4. මුලින්ම පත් වූ දිනය
                  </label>
                  <input
                      type="date"
                      value={applicationData.first_appoinment_date}
                      onChange={(e)=> setApplicationData({...applicationData, first_appoinment_date:e.target.value})}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    5. මීට පෙරද නිවාඩු ගත්තේ නම් පසු ගිය වර ශ්‍රී ලංකාවට ආපසු පැමිණි දිනය
                  </label>
                  <input
                      type="date"
                      value={applicationData.last_return_date}
                      onChange={(e)=> setApplicationData({...applicationData, last_return_date:e.target.value})}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    6. දැන් ඉල්ලා සිටින නිවාඩු කාලය (නිවාඩු පටන් ගන්නා දිනය හා අවසන් වන දිනය සදහන් කරන්න)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="date"
                      value={applicationData.leave_start_date}
                      onChange={(e)=> setApplicationData({...applicationData, leave_start_date:e.target.value})}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                    <input
                      type="date"
                      value={applicationData.leave_end_date}
                      onChange={(e)=> setApplicationData({...applicationData, leave_end_date:e.target.value})}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                  </div>
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    7. නිවාඩු ඉල්ලීමට හේතු
                  </label>
                  <input
                      type="text"
                      value={applicationData.reason_for_leave}
                      onChange={(e)=> setApplicationData({...applicationData, reason_for_leave:e.target.value})}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    8. (අ) ගමන් කරන්නේ කලින් මුදල් ගෙවූ ටිකට්ටුවකින්ද
                  </label>
                  <input
                      type="text"
                      value={applicationData.is_travel_on_a_pre_paid_ticket}
                      onChange={(e)=> setApplicationData({...applicationData, is_travel_on_a_pre_paid_ticket:e.target.value})}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    (ආ) එය එවන පුද්ගලයා හා ඉල්ලුම්කරු අතර ඇති සම්බන්ධය
                  </label>
                  <input
                      type="text"
                      value={applicationData.relationship_of_the_person_sending_it}
                      onChange={(e)=> setApplicationData({...applicationData, relationship_of_the_person_sending_it:e.target.value})}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    9. (අ) පිටරට තමාගේ නඩත්තු වියදම් දරන්නේ කෙසේද?
                  </label>
                  <input
                      type="text"
                      value={applicationData.cost_maintanence_abroad}
                      onChange={(e)=> setApplicationData({...applicationData, cost_maintanence_abroad:e.target.value})}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    (ආ) එම වියදම් දරන පුද්ගලයා හා ඉල්ලුම්කරු අතර ඇති සම්බන්ධය
                  </label>
                  <input
                      type="text"
                      value={applicationData.relationship_of_person_meeting_expenditure}
                      onChange={(e)=> setApplicationData({...applicationData, relationship_of_person_meeting_expenditure:e.target.value})}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] font-['Noto_Sans_Sinhala'] text-xs font-bold tracking-[0.6px] uppercase leading-4">
                    10. නිවාඩු කාලයේදී ඉල්ලුම්කරුගේ ලිපිනය
                  </label>
                  <input
                      type="text"
                      value={applicationData.address_during_leave}
                      onChange={(e)=> setApplicationData({...applicationData, address_during_leave:e.target.value})}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                </div>
              </div>
            </FormCard>

            {/* <button className="flex items-center gap-4 px-8 py-1 bg-[#002046] text-white text-base font-semibold leading-10 tracking-tight rounded-lg hover:bg-[#001533] transition-colors w-full"
              onClick={handleNext}>
                    <span>Next</span>
                    <ChevronsRight/>
            </button> */}
            <div className="flex justify-end mt-8 gap-4">
                <button className="px-6 py-3 border rounded-lg" onClick={()=>navigate(`/form/edit/${id}`)}>
                    Back
                </button>
                <button
                    onClick={handleNext}
                    //disabled={!allUploaded}
                    className={`flex items-center gap-2 px-8 py-3 rounded-lg text-white font-semibold transition bg-[#1B365D] hover:bg-[#001533]`}>
                    
                    Next
                    <ChevronsRight size={18} />
                </button>
            </div>
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
