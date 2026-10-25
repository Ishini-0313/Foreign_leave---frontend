import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApplication } from "../context/ApplicationContext";
import Navbar from "../components/navbar";
import Topbar from "../components/topbar";
import Footer from "../components/footer";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

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

  const {applicationData, setApplicationData} = useApplication();

  const navigate = useNavigate();

  const [offer, setOffer ] = useState({
    no_of_days : 0,
    total_amount : 0
  });

  const leaveNature = applicationData?.application?.leave_nature;

  const is25Dollar15Days =
    leaveNature === "සම්මන්ත්‍රණයක්" ||
    leaveNature === "අභ්‍යාස වැඩපිළිවෙලක්" ||
    leaveNature === "ශිල්පීය අභ්‍යාස පාඨමාලාවක්" ||
    leaveNature === "සාකච්ඡාවක්" ||
    leaveNature === "වෘත්තීය උපදේශක පාඨමාලාවක්" ||
    leaveNature === "අධ්‍යයන චාරිකාවක්" ||
    leaveNature === "පුහුණු වැඩමුළුවක්";

  const is40Dollar10Days =
    leaveNature === "විදේශ නිලදූත කාර්‍යයක්" ||
    leaveNature === "දිවයින තුල ඉටු කල නොහැකි ආයතන විෂය පථයට අදාල රාජකාරී කටයුත්තක්";

  const is25Dollar10Days =
    leaveNature === "පශ්චාත් උපාධි පාඨමාලාව" ||
    leaveNature === "පූර්ණ කාලීන ශිෂ්‍යත්වයක්";

  const allowanceRate = is40Dollar10Days ? 40 : 25;

  const maxDays = is25Dollar15Days ? 15 : 10;

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let days = Number(e.target.value);

    // Prevent negative values
    if (days < 0) {
      days = 0;
    }

    // Maximum allowed days
    if (days > maxDays) {
      days = maxDays;
    }

    const totalAmount = days * allowanceRate;

    setOffer({
      ...offer,
      no_of_days: days,
      total_amount: totalAmount,
    });
  };

  const save = async () => {
    try{
      await axios.post(`${API_URL}/application/${id}/additional-offer`, offer,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      toast.success("Saved successfully !");
      navigate(`/application/${id}`);
    }catch(error:any){
      console.error(error);

      // validate errors
      if(error.response?.status === 422){
        const errors = error.response.data.errors;
        Object.values(errors).forEach((messages:any)=>{
          toast.error(messages[0]);
        });
        return;
      }

      // backend returned an error message
      toast.error(
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Something went wrong."
      );
    }
  }

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
            `${API_URL}/applications/${id}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        .then((res) => {
            setApplicationData(res.data);
            if(res.data.application?.additional_offer){
              setOffer({
                no_of_days : res.data.application?.additional_offer?.no_of_days ?? 0,
                total_amount : res.data.application?.additional_offer?.total_additional_offer ?? 0
              });
            }
        })
        .catch((err) => {
            console.log(err);
        });

    }, []);

  const currentApplication = applicationData?.application;

  const canEdit = user && currentApplication && user.id == currentApplication?.current_assigned_user_id && user.office_id == currentApplication.institute_id && user.role.role_name == "Subject Officer";

    
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

                {
                  (applicationData?.application?.leave_nature === "සම්මන්ත්‍රණයක්" || 
                  applicationData?.application?.leave_nature === "අභ්‍යාස වැඩපිළිවෙලක්" ||
                  applicationData?.application?.leave_nature === "ශිල්පීය අභ්‍යාස පාඨමාලාවක්" ||
                  applicationData?.application?.leave_nature === "සාකච්ඡාවක්" ||
                  applicationData?.application?.leave_nature === "වෘත්තීය උපදේශක පාඨමාලාවක්" ||
                  applicationData?.application?.leave_nature === "අධ්‍යයන චාරිකාවක්" ||
                  applicationData?.application?.leave_nature === "පුහුණු වැඩමුළුවක්" ) && (
                    <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                      <label className="text-[#44474E] text-sm font-semibold leading-6">
                        13. මු.අ.චක්‍රලේඛ 01/2015/01 හි 03 අ කොටස අනුව සහ 2023.03.20 දිනැති සංශෝධනය අනුව හිමිවිය යුතු දීමනාව (ඇ.එ.ජ.ඩො. 25 බැගින් උපරිම දින 15ක් දක්වා)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        ඇ.එ.ජ.ඩො. 25  *  දින
                        <input
                          type="text"
                          value={offer.no_of_days || ""}
                          onChange={handleDaysChange}
                          className="border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                        /> 
                        <input
                          type="text"
                          value={`ඇ.එ.ජ.ඩො. ${offer.total_amount || 0}`}
                          readOnly
                          className="border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                        />
                      </div>
                    </div>
                  )
                }

                {
                  (applicationData?.application?.leave_nature === "විදේශ නිලදූත කාර්‍යයක්" || 
                  applicationData?.application?.leave_nature === "දිවයින තුල ඉටු කල නොහැකි ආයතන විෂය පථයට අදාල රාජකාරී කටයුත්තක්") && (
                    <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                      <label className="text-[#44474E] text-sm font-semibold leading-6">
                        13. මු.අ.චක්‍රලේඛ 01/2015/01 හි 03 ආ කොටස අනුව සහ 2023.03.20 දිනැති සංශෝධනය අනුව හිමිවිය යුතු දීමනාව (ඇ.එ.ජ.ඩො. 40 බැගින් උපරිම දින 10ක් දක්වා)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        ඇ.එ.ජ.ඩො. 40  *  දින
                        <input
                          type="text"
                          value={offer.no_of_days || ""}
                          onChange={handleDaysChange}
                          className="border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                        /> 
                        <input
                          type="text"
                          value={`ඇ.එ.ජ.ඩො. ${offer.total_amount || 0}`}
                          readOnly
                          className="border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                        />
                      </div>
                    </div>
                  )
                }

                {
                  (applicationData?.application?.leave_nature === "පශ්චාත් උපාධි පාඨමාලාව" || 
                  applicationData?.application?.leave_nature === "පූර්ණ කාලීන ශිෂ්‍යත්වයක්") && (
                    <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                      <label className="text-[#44474E] text-sm font-semibold leading-6">
                        13. මු.අ.චක්‍රලේඛ 01/2015/01 හි 04 ඉ කොටස අනුව සහ 2023.03.20 දිනැති සංශෝධනය අනුව හිමිවිය යුතු දීමනාව (ඇ.එ.ජ.ඩො. 25 බැගින් උපරිම දින 10ක් දක්වා)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        ඇ.එ.ජ.ඩො. 25  *  දින
                        <input
                          type="text"
                          value={offer.no_of_days || ""}
                          onChange={handleDaysChange}
                          className="border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                        /> 
                        <input
                          type="text"
                          value={`ඇ.එ.ජ.ඩො. ${offer.total_amount || 0}`}
                          readOnly
                          className="border border-[#C4C6CF] rounded bg-white px-3 py-3.5 text-base text-[#1A1B1E] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                        />
                      </div>
                    </div>
                  )
                }
                
              </div>
            </FormCard>

            {
              canEdit && (
                <div className="flex justify-end mt-8 gap-4">
                  <button className="px-6 py-3 border rounded-lg" onClick={()=>navigate(`/form/edit/${id}`)}>
                      Back
                  </button>
                  <button className="px-6 py-3 border rounded-lg" onClick={()=>save()}>
                      Save
                  </button>
              </div>
              )
            }
            
          </div>

          {/* Footer */}
          <Footer/>
        </main>
      </div>
    </div>
  );
}
