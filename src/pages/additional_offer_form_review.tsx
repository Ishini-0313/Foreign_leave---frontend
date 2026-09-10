import axios from "axios";
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

export default function AdditionalOfferReview() {
  const {id} = useParams();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {applicationData, setApplicationData, isEditMode, applicationId} = useApplication();

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

  //fetch application data
  useEffect(() => {
        axios.get(
            `http://127.0.0.1:8000/api/applications/${id}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        .then((res) => {
            setApplicationData(res.data);
        })
        .catch((err) => {
            console.log(err);
        });

    }, []);

    
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
                      value={applicationData?.application?.name}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    02. ආයතනය / අමාත්‍යාංශය
                  </label>
                  <input
                      type="text"
                      value={applicationData?.application?.institute?.name}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    03. නිලධාරියාගේ තනතුර
                  </label>
                  <input
                      type="text"
                      value={applicationData?.application?.position}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    04. සහභාගි වන පුහුණුව
                  </label>
                  <input
                      type="text"
                      value={applicationData?.application?.purpose}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    05. විදේශ නිවාඩුවේ ස්වභාවය
                  </label>
                  <input
                        type="text"
                        value={applicationData?.application?.leave_nature}
                        className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    06. පුහුණුව පැවැත්වෙන රට
                  </label>
                    <input
                        type="text"
                        value={applicationData?.application?.country}
                        className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    07. පුහුණුව සදහා කැදවීම් ලිපිය
                  </label>
                  <input
                        type="text"
                        value={applicationData?.application?.has_letter_of_invitation_for_training}
                        className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    08. විධිමත් විදේශ නිවාඩු අනුමැතිය ලද ලිපිය
                  </label>
                  <input
                        type="text"
                        value={applicationData?.application?.has_approval_letter}
                        className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    09. පුහුණුව සදහා ආරාධනා කර ඇත්තේ ශ්‍රී ලංකා රජය වෙතද
                  </label>
                  <input
                        type="text"
                        value={applicationData?.application?.has_government_also_been_invited_for_training}
                        className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    10. ඒ සදහා සහභාගි වීමට රජය විසින් මෙම නිලධාරියා නම් කර ඇත්ද
                  </label>
                  <input
                        type="text"
                        value={applicationData?.application?.has_government_nominated_to_participate_in_it}
                        className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />

                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    10.1 එසේ නම් කර ඇති ආයතනය
                  </label>
                  <input
                    type="text"
                    value={applicationData?.application?.institution_designated_in_that_manner}
                    className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    11. පුහුණුව පැවැත්වෙන දින
                  </label>
                  <input
                      type="text"
                      value={applicationData?.application?.commencement_date_of_trainig + " සිට " + applicationData?.application?.completion_date_of_trainig + " දක්වා"}
                      className="w-full border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                    />
                </div>

                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                  <label className="text-[#44474E] text-sm font-semibold leading-6">
                    12. ගුවන් ගමන් විස්තරය
                  </label>
                  <div className="">
                    {/* departure */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-2">
                      පිටවීම (දිනය සහ වේලාව ඇතුලත් කරන්න)
                      <input
                        type="date"
                        value={applicationData?.application?.departure_date}
                        className="border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                      />
                      <input
                        type="time"
                        value={applicationData?.application?.departure_time}
                        className="border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                      />
                    </div>

                    {/* return */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      පැමිණීම (දිනය සහ වේලාව ඇතුලත් කරන්න)
                      <input
                        type="date"
                        value={applicationData?.application?.return_date}
                        className="border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                      />
                      <input
                        type="time"
                        value={applicationData?.application?.return_time}
                        className="border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </FormCard>

            <div className="flex justify-end mt-8 gap-4">
                <button className="px-6 py-3 border rounded-lg" onClick={()=>navigate(`/form/edit/${id}`)}>
                    Back
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
