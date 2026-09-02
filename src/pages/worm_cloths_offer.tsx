import axios from "axios";
import { ChevronsRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApplication } from "../context/ApplicationContext";
import Navbar from "../components/navbar";
import Topbar from "../components/topbar";
import Footer from "../components/footer";

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


export default function AdditionalOffer() {
  const {id} = useParams();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {applicationData, setApplicationData, isEditMode, applicationId} = useApplication();
  const [institutes, setInstitutes] = useState([]);
  const [designations, setDesignations] = useState([]);

  const navigate = useNavigate();

  //load user
  useEffect(()=>{
    const storedUser = localStorage.getItem("user");
    console.log("Stored User:", storedUser);
    if(!storedUser){
      navigate("/");
      return;
    }
    setUser(JSON.parse(storedUser));
  },[]);

  //fetch institutes
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

  //fetch desinations
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

  const handleNext = ()=>{
    navigate(`/new-doc/edit/${id}`);
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
              <span className="text-[#002046] font-['Noto_Sans_Sinhala'] text-xs font-bold leading-4">Request Additional Offer</span>
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
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    01. නිලධාරියාගේ නම
                  </label>
                  <input
                      type="text"
                      value={applicationData.name}
                      onChange={(e)=> setApplicationData({...applicationData, name:e.target.value})}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    02. ආයතනය / අමාත්‍යාංශය
                  </label>
                  <select 
                    name="institute_id"
                    value={applicationData.institute_id}
                    onChange={(e)=> setApplicationData({...applicationData, institute_id:e.target.value})}
                    className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  >
                    <option value="">-- Select Institute --</option>
                    {institutes.map((institute: any)=>(
                      <option key={institute.id} value={institute.id}>{institute.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    03. නිලධාරියාගේ තනතුර
                  </label>
                    <select 
                        name="position"
                        value={applicationData.position}
                        onChange={(e)=> setApplicationData({...applicationData, position:e.target.value})}
                        className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    >
                        <option value="">-- Select Designation --</option>
                        {designations.map((service:any)=>(
                            <option key={service.id} value={service.name}>
                            {service.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    04. සහභාගි වන පුහුණුව
                  </label>
                  <input
                      type="text"
                      value={applicationData.purpose}
                      onChange={(e)=> setApplicationData({...applicationData, purpose:e.target.value})}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    05. විදේශ නිවාඩුවේ ස්වභාවය
                  </label>
                  <div className="border border-[#C4C6CF] rounded p-4 space-y-6.75">
                    {[
                      "අධ්‍යයන හෝ අභ්‍යාස කටයුත්තක්",
                      "රාජකාරී"
                    ].map((opt) => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="radio" 
                          name="nature_of_leave" 
                          className="w-4 h-4 accent-[#002046]" 
                          value={opt} 
                          checked={applicationData.expenses_mainly_to_be_met === opt}
                          onChange={(e)=> setApplicationData({...applicationData, expenses_mainly_to_be_met:e.target.value})}
                        />
                        <span className="text-base text-black tracking-[0.6px] uppercase">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    06. පුහුණුව පැවැත්වෙන රට
                  </label>
                    <input
                        type="text"
                        value={applicationData.country}
                        onChange={(e)=> setApplicationData({...applicationData, country:e.target.value})}
                        className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    07. පුහුණුව සදහා කැදවීම් ලිපිය
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-center gap-2 w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors">
                      <input
                        name="Letter_of_invitation_for_training"
                        type="radio"
                        value="yes"
                        checked={applicationData.Letter_of_invitation_for_training === "yes"}
                        onChange={(e)=> setApplicationData({...applicationData, Letter_of_invitation_for_training:e.target.value})}
                      />
                      <label htmlFor="">ඇත</label>
                    </div>
                    <div className="flex items-center gap-2 w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors">
                      <input
                        name="Letter_of_invitation_for_training"
                        type="radio"
                        value="no"
                        checked={applicationData.Letter_of_invitation_for_training === "no"}
                        onChange={(e)=> setApplicationData({...applicationData, Letter_of_invitation_for_training:e.target.value})}
                      />
                      <label htmlFor="">නැත</label>
                    </div>
                  </div>
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    08. ප්‍රධායක ආයතනය විසින් වෙනත් දීමනා ලබා දෙන්නේ නම් ඒ මොනවාද?
                  </label>
                    <input
                        type="text"
                        value={applicationData.country}
                        onChange={(e)=> setApplicationData({...applicationData, country:e.target.value})}
                        className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    09. ගෙවන්නේ නම් ගෙවනු ලබන මුදල
                  </label>
                    <input
                        type="text"
                        value={applicationData.country}
                        onChange={(e)=> setApplicationData({...applicationData, country:e.target.value})}
                        className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    10. විධිමත් විදේශ නිවාඩු අනුමැතිය ලද ලිපිය
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="flex items-center gap-2 w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors">
                      <input
                        name="approval_letter"
                        type="radio"
                        value="yes"
                        checked={applicationData.approval_letter === "yes"}
                        onChange={(e)=> setApplicationData({...applicationData, approval_letter:e.target.value})}
                      />
                      <label htmlFor="">ඇත</label>
                    </div>
                    <div className="flex items-center gap-2 w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors">
                      <input
                        name="approval_letter"
                        type="radio"
                        value="no"
                        checked={applicationData.approval_letter === "no"}
                        onChange={(e)=> setApplicationData({...applicationData, approval_letter:e.target.value})}
                      />
                      <label htmlFor="">නැත</label>
                    </div>
                    <div className="flex items-center gap-2 w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors">
                      <input
                        name="approval_letter"
                        type="radio"
                        value="processing"
                        checked={applicationData.approval_letter === "processing"}
                        onChange={(e)=> setApplicationData({...applicationData, approval_letter:e.target.value})}
                      />
                      <label htmlFor="">අනුමැතිය සදහා ඉදිරිපත් කර ඇත</label>
                    </div>
                  </div>
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    11. ආයතන සංග්‍රහයේ XV පරිච්ඡේදයේ 9.4 අනුව වසර 05ක් තුල උණුසුම් ඇඳුම් දීමනාව ලබාගෙන තිබේද?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-center gap-2 w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-sm text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors">
                      <input
                        name="government_also_been_invited_for_training?"
                        type="radio"
                        value="yes"
                        checked={applicationData.government_also_been_invited_for_training === "yes"}
                        onChange={(e)=> setApplicationData({...applicationData, government_also_been_invited_for_training:e.target.value})}
                      />
                      <label htmlFor="">ඔව්</label>
                    </div>
                    <div className="flex items-center gap-2 w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors">
                      <input
                        name="government_also_been_invited_for_training"
                        type="radio"
                        value="no"
                        checked={applicationData.government_also_been_invited_for_training === "no"}
                        onChange={(e)=> setApplicationData({...applicationData, government_also_been_invited_for_training:e.target.value})}
                      />
                      <label htmlFor="">නැත</label>
                    </div>
                  </div>
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    12. පුහුණුව පැවැත්වෙන දින
                  </label>
                  <input
                      type="text"
                      value={applicationData.cost_maintanence_abroad}
                      onChange={(e)=> setApplicationData({...applicationData, cost_maintanence_abroad:e.target.value})}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                </div>
              </div>
            </FormCard>

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
          <Footer/>
        </main>
      </div>
    </div>
  );
}
