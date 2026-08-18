import { useEffect, useState } from 'react'
import Navbar from '../components/navbar';
import Topbar from '../components/topbar';
import { ChevronRight,FileStack, FileUser} from 'lucide-react';
import Footer from '../components/footer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useApplication } from '../context/ApplicationContext';
import { useLeaveCategory } from '../context/LeaveCategoryContext';

export default function Options() {
    const [user, setUser] = useState<any>(null);
    const {id} = useParams();
    const navigate = useNavigate();
    const { applicationData, setApplicationData,setExistingDocs,setIsEditMode,setApplicationId, setExistingSignature} = useApplication();
    const {natureOfTrip, leaveCategory, setNatureOfTrip, setLeaveCategory} = useLeaveCategory();
    const [role, setRole] = useState("");

    useEffect(()=>{
        console.log("nature of trip: " + natureOfTrip);
        console.log("leave category: "+ leaveCategory);
        const storedUser = localStorage.getItem("user");
        console.log("Stored User:", storedUser);
        if(!storedUser){
        navigate("/");
        return;
        }
        setUser(JSON.parse(storedUser));
    },[]);

    // useEffect(() => {
    //   if(!id) return;

    //   axios.get(`http://127.0.0.1:8000/api/applications/${id}`,
    //     {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("token")}`
    //         }
    //     }
    //   )
    //   .then((res) => {
    //     console.log("Application response:", res.data);
    //     setApplicationData(res.data);
    //     const docs = res.data?.application?.documents || [];
    //     const existingDocuments: any = {};
    //     docs.forEach((doc: any) => {
    //         existingDocuments[doc.document_type] = doc;
    //     });
    //     console.log("Existing Documents:", existingDocuments);
    //     setExistingDocs(existingDocuments);
    //       setIsEditMode(true);
    //       setApplicationId(Number(id));
    //   })
    //   .catch((err) => {
    //       console.log(err);
    //   });
    // }, [id]);

    const loadApplication = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
          `http://127.0.0.1:8000/api/applications/${id}`,
          {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }
      );
  
      const app = response.data.application;
      const funds = app.gosl_funds?.[0];
      if(id){
        setApplicationId(Number(id));
        setIsEditMode(true);
      }
      
      setApplicationData({...app, 
          has_previous_trip_report_submitted:Boolean(app.has_previous_trip_report_submitted),
          goslFunds: {
              air_travel: {
                  selected: !!funds?.air_travel_selected,
                  amount: funds?.air_travel_amount ?? "",
              },
              subsistence: {
                  selected: !!funds?.subsistence_selected,
                  amount: funds?.subsistence_amount ?? "",
              },
              course_fees: {
                  selected: !!funds?.course_fees_selected,
                  amount: funds?.course_fees_amount ?? "",
              },
              additional_expenses: {
                  selected: !!funds?.additional_expenses_selected,
                  amount: funds?.additional_expenses_amount ?? "",
              },
              other_personal_expenses: {
                  selected: !!funds?.other_personal_expenses_selected,
                  amount: funds?.other_personal_expenses_amount ?? "",
              },
          },
          previousTravels : app.previous_travels.map((travel:any)=>({
            year : String(travel.year),
            purpose : travel.purpose,
            period : travel.period,
            country : travel.country,
          })),
          address_during_leave:app.foreign_address,
      });

      const docs:any = {};
      app.documents.forEach((doc:any)=>{
        docs[doc.document_type] = doc;
      });

      setExistingDocs(docs);
      setExistingSignature(app.signature_path ? `http://127.0.0.1:8000/storage/${app.signature_path}`: null)
  };
  
  useEffect(() => {
    if(!id) return;
    loadApplication();
  }, [id]);

    useEffect(() => {
    if (!applicationData) return;
    if (applicationData.nature_of_trip) {
        setNatureOfTrip(applicationData.nature_of_trip);
    }
    if (applicationData.leave_category) {
        setLeaveCategory(applicationData.leave_category);
    }
}, [applicationData]);

    useEffect(()=>{
      if (!user?.role_id) return;
      axios.get(
            `http://127.0.0.1:8000/api/role-by-id`,
            {
                params: {
                    id: user?.role_id
                }
            }
        )
        .then((res) => {
          console.log("Role Response:", res.data);
          setRole(res.data.role_name);
        })
        .catch((err) => {
            console.log(err);
        });

    },[user]);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        {/* <main className="flex-1 px-4 sm:px-6 py-6 space-y-8 overflow-y-auto">
          
          <div>
            
            <nav className="flex items-center gap-2 mb-3">
              <span className="text-[#44474E] text-xs font-semibold leading-4">Home</span>
              <ChevronRight size={10}/>
              <span className="text-[#44474E] text-xs font-semibold leading-4">Leave Request</span>
            </nav>

            <h2 className="text-[#002046] text-2xl sm:text-3xl font-semibold leading-10 tracking-tight mt-1">
                Apply for Official Foreign Leave 
            </h2>
            <div className="flex items-center gap-3 mt-1">
                
            </div>
            
          </div>

          
          <div className="flex flex-col gap-8  p-8">

            <div className="flex justify-between bg-white p-8 rounded-lg shadow-sm hover:scale-102 text-[#002046]"
              onClick={()=>navigate(`/form`)}>
                <div className="flex gap-2 items-center" 
                    >
                    <FileUser/>
                    <p>Fill the Form 16</p>
                </div>
                <ChevronsRight/>
            </div>
            
            <div className="flex justify-between bg-white p-8 rounded-lg shadow-sm hover:scale-102 text-[#002046]"
                onClick={()=>navigate(`/form2`)}>
                <div className="flex gap-2 items-center">
                    <FileUser/>
                    <p>Fill the Form 126</p>
                </div>
                <ChevronsRight/>
            </div>
            
            <div className="flex justify-between bg-white p-8 rounded-lg shadow-sm hover:scale-102 text-[#002046]" onClick={()=>navigate(`/documents`)}>
                <div className="flex gap-2 items-center">
                    <FileStack/>
                    <p>Upload Supporting Documents</p>
                </div>
                <ChevronsRight/>
            </div>
          </div>

          
        <Footer/>
        </main> */}

        <main className="flex-1 overflow-y-auto bg-linear-to-br from-[#F7F9FF] via-[#FAF9FD] to-[#F7FFFC]">

  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8">

    {/* ================= PAGE HEADER ================= */}

    <div className="mb-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-5">

        <span className="text-[#6B7280] text-xs font-semibold">
          Home
        </span>

        <ChevronRight
          size={13}
          className="text-[#A0A6B0]"
        />

        <span className="text-[#315F91] text-xs font-semibold">
          Leave Request
        </span>

      </nav>


      {/* Header Card */}

      <div className="
        relative
        overflow-hidden
        rounded-3xl
        bg-linear-to-r
        from-[#002046]
        via-[#163D6B]
        to-[#315F91]
        px-6
        py-7
        sm:px-8
        sm:py-8
        shadow-[0_12px_35px_rgba(0,32,70,0.15)]
      ">

        {/* Decorative circles */}

        <div className="
          absolute
          -right-16
          -top-20
          w-64
          h-64
          rounded-full
          bg-white/5
        " />

        <div className="
          absolute
          right-32
          -bottom-24
          w-48
          h-48
          rounded-full
          bg-[#87A0CD]/10
        " />


        <div className="relative z-10">

          {/* Step badge */}

          <div className="
            inline-flex
            items-center
            gap-2
            px-3
            py-1.5
            rounded-full
            bg-white/10
            border
            border-white/10
            mb-4
          ">

            <span className="
              flex
              items-center
              justify-center
              w-6
              h-6
              rounded-full
              bg-white
              text-[#002046]
              text-xs
              font-bold
            ">
              2
            </span>

            <span className="
              text-[#DCE7F5]
              text-xs
              font-semibold
            ">
              Application Preparation
            </span>

          </div>


          <h2 className="
            text-white
            text-2xl
            sm:text-3xl
            lg:text-4xl
            font-bold
            leading-tight
          ">
            Apply for {natureOfTrip ==  "official" ? "Official" : "Personal"} Foreign Leave
          </h2>


          <p className="
            text-[#C9D7E8]
            text-sm
            sm:text-base
            leading-6
            max-w-2xl
            mt-3
          ">
            Complete the required application forms and upload the
            supporting documents to continue with your foreign leave request.
          </p>

        </div>

      </div>

    </div>


    {/* ================= PROGRESS ================= */}

    <div className="
      bg-white
      rounded-2xl
      border
      border-[#E6EAF0]
      shadow-sm
      px-5
      sm:px-7
      py-5
      mb-8
    ">

      <div className="
        flex
        items-center
        justify-between
        gap-4
        mb-4
      ">

        <div>

          <p className="
            text-[#002046]
            text-sm
            font-bold
          ">
            Application Progress
          </p>

          <p className="
            text-[#7A8494]
            text-xs
            mt-1
          ">
            Complete all required steps before submitting your application.
          </p>

        </div>

        <span className="
          text-[#315F91]
          text-xs
          font-bold
          bg-[#EAF1FC]
          px-3
          py-1.5
          rounded-full
        ">
          0 / 3 Completed
        </span>

      </div>


      {/* Progress bar */}

      <div className="
        h-2
        w-full
        bg-[#EDF0F5]
        rounded-full
        overflow-hidden
      ">

        <div
          className="
            h-full
            w-0
            bg-linear-to-r
            from-[#315F91]
            to-[#6D8FC6]
            rounded-full
          "
        />

      </div>

    </div>


    {/* ================= OPTIONS ================= */}

    <div className="mb-4">

      <h3 className="
        text-[#002046]
        text-xl
        sm:text-2xl
        font-bold
      ">
        Complete Your Application
      </h3>

      <p className="
        text-[#707987]
        text-sm
        mt-1
      ">
        Follow the steps below to prepare your foreign leave application.
      </p>

    </div>


    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">


      {/* ================================================= */}
      {/* FORM 16 */}
      {/* ================================================= */}

      <button
        onClick={() => navigate(`/form/edit/${id}`)}
        className="
          group
          relative
          overflow-hidden
          text-left
          bg-linear-to-br
          from-[#EEF4FF]
          via-white
          to-[#F8FAFF]
          border
          border-[#DDE6F5]
          rounded-3xl
          p-6
          sm:p-7
          min-h-65
          shadow-[0_6px_25px_rgba(30,60,100,0.06)]
          hover:-translate-y-1
          hover:shadow-[0_15px_35px_rgba(30,60,100,0.12)]
          hover:border-[#9DB6E5]
          transition-all
          duration-300
        "
      >

        {/* Decorative circle */}

        <div className="
          absolute
          -right-12
          -top-12
          w-40
          h-40
          rounded-full
          bg-[#D6E3FA]
          opacity-40
          group-hover:scale-125
          transition-transform
          duration-500
        " />


        <div className="relative z-10 h-full flex flex-col">

          {/* Icon */}

          <div className="
            w-14
            h-14
            rounded-2xl
            bg-linear-to-br
            from-[#315F91]
            to-[#557EB3]
            text-white
            flex
            items-center
            justify-center
            shadow-md
            group-hover:scale-105
            transition-transform
          ">

            <FileUser size={27} />

          </div>


          {/* Number */}

          <span className="
            absolute
            top-0
            right-0
            text-xs
            font-bold
            text-[#5579A8]
            bg-[#E5EEF9]
            px-2.5
            py-1
            rounded-full
          ">
            01
          </span>


          {/* Content */}

          <div className="mt-6">

            <h4 className="
              text-[#002046]
              font-bold
              text-xl
            ">
              Fill Form 16
            </h4>

            <p className="
              text-[#697386]
              text-sm
              leading-6
              mt-2
            ">
              Complete the required Form 16 information for your
              foreign leave application.
            </p>

          </div>


          {/* Bottom */}

          <div className="
            mt-auto
            pt-6
            flex
            items-center
            justify-between
          ">

            <span className="
              text-[#315F91]
              text-sm
              font-bold
            ">
              Start Form
            </span>

            <span className="
              w-9
              h-9
              rounded-full
              bg-[#315F91]
              text-white
              flex
              items-center
              justify-center
              group-hover:translate-x-1
              transition-transform
            ">
              →
            </span>

          </div>

        </div>

      </button>


      {/* ================================================= */}
      {/* FORM 126 */}
      {/* ================================================= */}

      <button
        onClick={() => navigate(`/form2/edit/${id}`)}
        className="
          group
          relative
          overflow-hidden
          text-left
          bg-linear-to-br
          from-[#F4EEFF]
          via-white
          to-[#FBF9FF]
          border
          border-[#E7DDF6]
          rounded-3xl
          p-6
          sm:p-7
          min-h-65
          shadow-[0_6px_25px_rgba(80,50,120,0.05)]
          hover:-translate-y-1
          hover:shadow-[0_15px_35px_rgba(80,50,120,0.11)]
          hover:border-[#C8B5E5]
          transition-all
          duration-300
        "
      >

        {/* Decorative circle */}

        <div className="
          absolute
          -right-12
          -top-12
          w-40
          h-40
          rounded-full
          bg-[#E2D5F7]
          opacity-40
          group-hover:scale-125
          transition-transform
          duration-500
        " />


        <div className="relative z-10 h-full flex flex-col">

          {/* Icon */}

          <div className="
            w-14
            h-14
            rounded-2xl
            bg-linear-to-br
            from-[#7659A9]
            to-[#9A7BC9]
            text-white
            flex
            items-center
            justify-center
            shadow-md
            group-hover:scale-105
            transition-transform
          ">

            <FileUser size={27} />

          </div>


          {/* Number */}

          <span className="
            absolute
            top-0
            right-0
            text-xs
            font-bold
            text-[#7659A9]
            bg-[#F0E8FA]
            px-2.5
            py-1
            rounded-full
          ">
            02
          </span>


          {/* Content */}

          <div className="mt-6">

            <h4 className="
              text-[#002046]
              font-bold
              text-xl
            ">
              Fill Form 126
            </h4>

            <p className="
              text-[#697386]
              text-sm
              leading-6
              mt-2
            ">
              Provide the additional details required for processing
              your foreign leave request.
            </p>

          </div>


          {/* Bottom */}

          <div className="
            mt-auto
            pt-6
            flex
            items-center
            justify-between
          ">

            <span className="
              text-[#7659A9]
              text-sm
              font-bold
            ">
              Start Form
            </span>

            <span className="
              w-9
              h-9
              rounded-full
              bg-[#7659A9]
              text-white
              flex
              items-center
              justify-center
              group-hover:translate-x-1
              transition-transform
            ">
              →
            </span>

          </div>

        </div>

      </button>


      {/* ================================================= */}
      {/* DOCUMENTS */}
      {/* ================================================= */}

      <button
        onClick={() => navigate(`/new-doc/edit/${id}`)}
        className="
          group
          relative
          overflow-hidden
          text-left
          bg-linear-to-br
          from-[#ECFBF5]
          via-white
          to-[#F7FFFC]
          border
          border-[#D7EEE4]
          rounded-3xl
          p-6
          sm:p-7
          min-h-65
          shadow-[0_6px_25px_rgba(20,100,75,0.05)]
          hover:-translate-y-1
          hover:shadow-[0_15px_35px_rgba(20,100,75,0.11)]
          hover:border-[#9ED2BC]
          transition-all
          duration-300
        "
      >

        {/* Decorative circle */}

        <div className="
          absolute
          -right-12
          -top-12
          w-40
          h-40
          rounded-full
          bg-[#C7EADB]
          opacity-40
          group-hover:scale-125
          transition-transform
          duration-500
        " />


        <div className="relative z-10 h-full flex flex-col">

          {/* Icon */}

          <div className="
            w-14
            h-14
            rounded-2xl
            bg-linear-to-br
            from-[#087F5B]
            to-[#13A673]
            text-white
            flex
            items-center
            justify-center
            shadow-md
            group-hover:scale-105
            transition-transform
          ">

            <FileStack size={27} />

          </div>


          {/* Number */}

          <span className="
            absolute
            top-0
            right-0
            text-xs
            font-bold
            text-[#087F5B]
            bg-[#DDF5EA]
            px-2.5
            py-1
            rounded-full
          ">
            03
          </span>


          {/* Content */}

          <div className="mt-6">

            <h4 className="
              text-[#002046]
              font-bold
              text-xl
            ">
              Supporting Documents
            </h4>

            <p className="
              text-[#697386]
              text-sm
              leading-6
              mt-2
            ">
              Upload the required documents and supporting evidence
              for your application.
            </p>

          </div>


          {/* Bottom */}

          <div className="
            mt-auto
            pt-6
            flex
            items-center
            justify-between
          ">

            <span className="
              text-[#087F5B]
              text-sm
              font-bold
            ">
              Upload Documents
            </span>

            <span className="
              w-9
              h-9
              rounded-full
              bg-[#087F5B]
              text-white
              flex
              items-center
              justify-center
              group-hover:translate-x-1
              transition-transform
            ">
              →
            </span>

          </div>

        </div>

      </button>

    </div>


    {/* ================= INFORMATION BOX ================= */}

    <div className="
      mt-7
      bg-white
      border
      border-[#E5E9EF]
      rounded-2xl
      px-5
      py-4
      flex
      items-start
      gap-3
      shadow-sm
    ">

      <div className="
        shrink-0
        w-9
        h-9
        rounded-full
        bg-[#EEF3FC]
        text-[#5378B8]
        flex
        items-center
        justify-center
        font-bold
        text-sm
      ">
        i
      </div>

      <div>

        <p className="
          text-[#344054]
          text-sm
          font-semibold
        ">
          Before submitting
        </p>

        <p className="
          text-[#727B89]
          text-xs
          sm:text-sm
          leading-6
          mt-1
        ">
          Make sure all forms are completed correctly and all required
          supporting documents have been uploaded before proceeding with
          your application.
        </p>

      </div>

    </div>


    {/* ================= FOOTER ================= */}

    <div className="mt-10">
      <Footer />
    </div>

  </div>

</main>
      </div>
    </div>
  );
}
