import { useEffect, useState } from 'react'
import Navbar from '../components/navbar';
import Topbar from '../components/topbar';
import { BadgeDollarSign, CheckCircle2, ChevronRight,FileStack, FileUser, Trash2, Upload} from 'lucide-react';
import Footer from '../components/footer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useApplication } from '../context/ApplicationContext';
import { useLeaveCategory } from '../context/LeaveCategoryContext';
import toast from 'react-hot-toast';

export default function Options() {
    const [user, setUser] = useState<any>(null);
    const {id} = useParams();
    const navigate = useNavigate();
    const { applicationData, setApplicationData,existingDocs,setExistingDocs,isEditMode,setIsEditMode,applicationId,setApplicationId, setExistingSignature, existingSignature} = useApplication();
    const {natureOfTrip, leaveCategory, setNatureOfTrip, setLeaveCategory} = useLeaveCategory();
    const [role, setRole] = useState("");
    const [signatureFile, setSignatureFile] = useState<File | null>(null);
    const [signaturePreview, setSignaturePreview] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const signatureCompleted =
     Boolean(applicationData?.signature_path) || Boolean(signatureFile);

    const isForm16Completed = () => {
      if (!applicationData) return false;

      return Boolean(
        applicationData.name &&
        applicationData.position &&
        applicationData.service_id &&
        applicationData.dob &&
        applicationData.nic &&
        applicationData.ministry_id &&
        applicationData.institute_id &&
        applicationData.arrangement_made_to_cover_duty &&
        applicationData.purpose &&
        applicationData.awarding_agency &&
        applicationData.expenses_mainly_to_be_met &&
        applicationData.foreign_loan_project_particulars_thereof &&
        applicationData.commencement_date_of_trainig &&
        applicationData.completion_date_of_trainig &&
        applicationData.departure_date &&
        applicationData.return_date &&
        applicationData.country &&
        applicationData.foreign_address &&
        applicationData.foreign_phone &&
        applicationData.foreign_fax &&
        applicationData.foreign_email 
      );
    };

    const isForm126Completed = () => {
      if (!applicationData) return false;

      return Boolean(
        applicationData.institute_id &&
        applicationData.name_and_designation &&
        applicationData.service_id &&
        applicationData.first_appoinment_date &&
        applicationData.last_return_date &&
        applicationData.leave_start_date &&
        applicationData.leave_end_date &&
        applicationData.reason_for_leave &&
        applicationData.is_travel_on_a_pre_paid_ticket &&
        applicationData.relationship_of_the_person_sending_it &&
        applicationData.cost_maintanence_abroad &&
        applicationData.relationship_of_person_meeting_expenditure &&
        applicationData.address_during_leave 
      );
    };

    const requiredDocumentsByCategory: Record<string, string[]> = {
      short_trip: [
        "request_letter",
        "passport_copy",
      ],

      study: [
        "request_letter",
        "agreement",
        "admission_letter",
        "passport_copy",
      ],

      employment: [
        "request_letter",
        "agreement",
        "employment_letter",
        "passport_copy",
      ],

      study_and_employment: [
        "request_letter",
        "agreement",
        "admission_letter",
        "passport_copy",
      ],

      spouse: [
        "request_letter",
        "agreement",
        "spouse_invitation",
        "passport_copy",
      ],

      leave_without_offers: [
        "invitation_letter",
        "service_confirmation",
        "passport_copy",
        "flight_details",
        "request_letter",
      ],

      leave_with_warm_cloths_offer: [
        "invitation_letter",
        "service_confirmation",
        "duty_cover_letter",
        "passport_copy",
        "flight_details",
        "request_letter",
        "letter_stating_that_allowances_will_not_be_paid",
      ],

      leave_with_additional_offer: [
        "invitation_letter",
        "service_confirmation",
        "duty_cover_letter",
        "passport_copy",
        "flight_details",
        "request_letter",
        "letter_stating_that_allowances_will_not_be_paid",
      ],

      leave_with_warm_cloths_and_additional_offer: [
        "invitation_letter",
        "service_confirmation",
        "duty_cover_letter",
        "passport_copy",
        "flight_details",
        "request_letter",
        "letter_stating_that_allowances_will_not_be_paid",
      ],
    };

    const isDocumentsCompleted = () => {
      if (!leaveCategory) return false;

      const requiredDocuments =
        requiredDocumentsByCategory[leaveCategory] || [];

      if (requiredDocuments.length === 0) return false;

      return requiredDocuments.every((documentKey) => {
        return Boolean(
          applicationData?.documents?.[documentKey] ||
          existingDocs?.[documentKey]
        );
      });
    };

    const requiresAdditionalOffer =
      leaveCategory === "leave_with_additional_offer" ||
      leaveCategory === "leave_with_warm_cloths_and_additional_offer";

    // const isAdditionalOfferCompleted = () => {
    //   if (!requiresAdditionalOffer) return true;

    //   return Boolean(
    //     applicationData?.additional_offer_completed
    //   );
    // };

    const checklist = [
      {
        key: "form16",
        title: "Form 16",
        completed: isForm16Completed(),
        required: true,
      },
      {
        key: "form126",
        title: "Form 126",
        completed: isForm126Completed(),
        required: true,
      },
      // ...(requiresAdditionalOffer
      //   ? [
      //       {
      //         key: "additionalOffer",
      //         title: "Additional Offer",
      //         completed: isAdditionalOfferCompleted(),
      //         required: true,
      //       },
      //     ]
      //   : []),
      {
        key: "documents",
        title: "Supporting Documents",
        completed: isDocumentsCompleted(),
        required: true,
      },
    ];

    const completedSteps = checklist.filter(
      (step) => step.completed
    ).length;

    const totalSteps = checklist.length;

    const progressPercentage =
      totalSteps > 0
        ? (completedSteps / totalSteps) * 100
        : 0;

    const allCompleted =
      checklist.every(step => step.completed) && signatureCompleted;

    let number = 0;

    //load user
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

    const handleSignatureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file.");
        return;
      }

      // Validate file size - maximum 2MB
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Signature image must be less than 2MB.");
        return;
      }

      setSignatureFile(file);

      const previewUrl = URL.createObjectURL(file);
      setSignaturePreview(previewUrl);

      // Store the File object in applicationData
      setApplicationData((prev: any) => ({
        ...prev,
        signature: file,
      }));

      toast.success("Signature image selected.");
    };

    const clearSignature = () => {
      setSignatureFile(null);
      setSignaturePreview("");

      setApplicationData((prev: any) => ({
        ...prev,
        signature: "",
      }));

      const input = document.getElementById(
        "signature-upload"
      ) as HTMLInputElement;

      if (input) {
        input.value = "";
      }

      toast.success("Signature removed.");
    };

    const submitApplication = async()=>{
      try{
        setLoading(true);
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
        formData.append("nature_of_trip",natureOfTrip ?? "" );
        formData.append("leave_category",leaveCategory ?? "");
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

        formData.append("leave_nature", applicationData.leave_nature);
        formData.append("has_letter_of_invitation_for_training", applicationData.has_letter_of_invitation_for_training);
        formData.append("has_approval_letter", applicationData.has_approval_letter);
        formData.append("has_government_also_been_invited_for_training", applicationData.has_government_also_been_invited_for_training);
        formData.append("has_government_nominated_to_participate_in_it", applicationData.has_government_nominated_to_participate_in_it);
        formData.append("institution_designated_in_that_manner", applicationData.institution_designated_in_that_manner);

        Object.entries(applicationData.documents).forEach(
          ([key, file]) => {
            if(file){
              formData.append(key, file as File)
            }
          }
        );

        //formData.append("signature", applicationData.signature);
        if (applicationData.signature instanceof File) {
          formData.append("signature", applicationData.signature);
          }

        const token = localStorage.getItem("token");

        let response;

        if(isEditMode){
          response = await axios.put(
            `http://127.0.0.1:8000/api/application/${applicationId}/resubmit`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
          );
          setIsEditMode(false);
          setApplicationId(null);
        }else{
          response = await axios.post(
            "http://127.0.0.1:8000/api/application",
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }

        toast.success(response.data.message);
        navigate("/my-applications");
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
      }finally{
        setLoading(false);
      }
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
              <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#002046] via-[#163D6B] to-[#315F91] px-6 py-7 sm:px-8 sm:py-8 shadow-[0_12px_35px_rgba(0,32,70,0.15)]">
                {/* Decorative circles */}
                <div className="absolute -right-16 -top-20 w-64 h-64 rounded-full bg-white/5" />
                <div className="absolute  right-32 -bottom-24  w-48  h-48 rounded-full bg-[#87A0CD]/10" />

                <div className="relative z-10">
                  {/* Step badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 mb-4">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-[#002046] text-xs font-bold">
                      2
                    </span>

                    <span className="text-[#DCE7F5] text-xs font-semibold">
                      Application Preparation
                    </span>
                  </div>

                  <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                    Apply for {natureOfTrip ==  "official" ? "Official" : "Personal"} Foreign Leave
                  </h2>

                  <p className="text-[#C9D7E8] text-sm sm:text-base leading-6 max-w-2xl mt-3">
                    Complete the required application forms and upload the
                    supporting documents to continue with your foreign leave request.
                  </p>
                </div>
              </div>
            </div>


            {/* ================= PROGRESS ================= */}
            <div className="bg-white rounded-2xl border border-[#E6EAF0] shadow-sm px-5 sm:px-7 py-5 mb-8">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-[#002046] text-sm font-bold">Application Progress</p>
                  <p className="text-[#7A8494] text-xs mt-1">Complete all required steps before submitting your application.</p>
                </div>

                <span className={`text-xs font-bold px-3 py-1.5 rounded-full
                  ${allCompleted
                    ? "text-[#087F5B] bg-[#DDF5EA]"
                    : "text-[#315F91] bg-[#EAF1FC]"
                  }
                `}>
                  {completedSteps} / {totalSteps} Completed
                </span>
              </div>

              <div className="h-2 w-full bg-[#EDF0F5] rounded-full overflow-hidden">
                <div
                  className=" h-full bg-linear-to-r from-[#315F91] to-[#087F5B] rounded-full transition-all duration-500"
                  style={{
                    width: `${progressPercentage}%`
                  }}
                />
              </div>
            </div>


            {/* ================= OPTIONS ================= */}

            <div className="mb-4">
              <h3 className="text-[#002046] text-xl sm:text-2xl font-bold">
                Complete Your Application
              </h3>

              <p className="text-[#707987] text-sm mt-1">
                Follow the steps below to prepare your foreign leave application.
              </p>
            </div>


            <div className="grid grid-cols-1 gap-5">
              {/* FORM 16 */}
              <button
                onClick={() => navigate(`/form/edit/${id}`)}
                className="group relative overflow-hidden text-left bg-linear-to-br from-[#EEF4FF] via-white to-[#F8FAFF] border border-[#DDE6F5] rounded-3xl p-6 sm:p-7 min-h-65 shadow-[0_6px_25px_rgba(30,60,100,0.06)] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(30,60,100,0.12)] hover:border-[#9DB6E5] transition-all duration-300"
              >
                {/* Decorative circle */}
                <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-[#D6E3FA] opacity-40 group-hover:scale-125 transition-transform duration-500" />

                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#315F91] to-[#557EB3] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <FileUser size={27} />
                  </div>

                  {/* Number */}
                  <div className="absolute top-0 right-0">
                    {isForm16Completed() ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087F5B] bg-[#DDF5EA] px-3 py-1.5 rounded-full">
                        {++number}
                        <CheckCircle2 size={15} />
                        Completed
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-[#5579A8] bg-[#E5EEF9] px-2.5 py-1 rounded-full">
                        {++number}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="mt-6">
                    <h4 className="text-[#002046] font-bold text-xl">
                      Fill Form 16
                    </h4>

                    <p className="text-[#697386] text-sm leading-6 mt-2">
                      Complete the required Form 16 information for your
                      foreign leave application.
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <span className="text-[#315F91] text-sm font-bold">
                      {isForm16Completed() ? "Edit Form" : "Start Form"}
                    </span>
                    <span className="w-9 h-9 rounded-full bg-[#315F91] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </button>


              {/* FORM 126 */}
              <button
                onClick={() => navigate(`/form2/edit/${id}`)}
                className=" group relative overflow-hidden text-left bg-linear-to-br from-[#F4EEFF] via-white to-[#FBF9FF] border border-[#E7DDF6] rounded-3xl p-6 sm:p-7 min-h-65 shadow-[0_6px_25px_rgba(80,50,120,0.05)] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(80,50,120,0.11)] hover:border-[#C8B5E5] transition-all duration-300"
              >
                {/* Decorative circle */}
                <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-[#E2D5F7] opacity-40 group-hover:scale-125 transition-transform duration-500" />

                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#7659A9] to-[#9A7BC9] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <FileUser size={27} />
                  </div>

                  {/* Number */}
                  <div className="absolute top-0 right-0">
                    {isForm126Completed() ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087F5B] bg-[#DDF5EA] px-3 py-1.5 rounded-full">
                        {++number}
                        <CheckCircle2 size={15} />
                        Completed
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-[#7659A9] bg-[#F0E8FA] px-2.5 py-1 rounded-full">
                        {++number}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="mt-6">
                    <h4 className="text-[#002046] font-bold text-xl">
                      Fill Form 126
                    </h4>

                    <p className="text-[#697386] text-sm leading-6 mt-2">
                      Provide the additional details required for processing
                      your foreign leave request.
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <span className="text-[#315F91] text-sm font-bold">
                      {isForm126Completed() ? "Edit Form" : "Start Form"}
                    </span>
                    <span className="w-9 h-9 rounded-full bg-[#7659A9] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </button>


              {/* offers */}
              {
                leaveCategory == "leave_with_additional_offer" && (
                  <button
                    onClick={() => navigate(`/additional-offer/edit/${id}`)}
                    className="group relative overflow-hidden text-left bg-linear-to-br from-[#f3ecdf] via-white to-[#FBF9FF] border border-[#f7e1d7] rounded-3xl p-6 sm:p-7 min-h-65 shadow-[0_6px_25px_rgba(80,50,120,0.05)] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(80,50,120,0.11)] hover:border-[#f9cdac] transition-all duration-300">

                    {/* Decorative circle */}
                    <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-[#faece8] opacity-40 group-hover:scale-125 transition-transform duration-500" />

                    <div className="relative z-10 h-full flex flex-col">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#de9f61] to-[#e99312] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                        <BadgeDollarSign size={27} />
                      </div>

                      {/* Number */}
                      <span className="absolute top-0 right-0 text-xs font-bold text-[#e99312] bg-[#faece8] px-2.5 py-1 rounded-full">
                        {++number}
                      </span>

                      {/* Content */}
                      <div className="mt-6">
                        <h4 className="text-[#002046] font-bold text-xl">
                          Request Additional Offer
                        </h4>
                        <p className="text-[#697386] text-sm leading-6 mt-2">
                          Provide the additional details required for processing
                          your foreign leave request.
                        </p>
                      </div>

                      {/* Bottom */}
                      <div className="mt-auto pt-6 flex items-center justify-between">
                        <span className="text-[#e99312] text-sm font-bold">
                          Start Form
                        </span>
                        <span className="w-9 h-9 rounded-full bg-[#e99312] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </div>
                  </button>
                )
              }

              {
                leaveCategory == "leave_with_warm_cloths_and_additional_offer" && (
                  <>
                    <button
                      onClick={() => navigate(`/additional-offer/edit/${id}`)}
                      className="group relative overflow-hidden text-left bg-linear-to-br from-[#f6f0e6] via-white to-[#FBF9FF] border border-[#f7e1d7] rounded-3xl p-6 sm:p-7 min-h-65 shadow-[0_6px_25px_rgba(80,50,120,0.05)] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(80,50,120,0.11)] hover:border-[#f9cdac] transition-all duration-300">

                      {/* Decorative circle */}
                      <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-[#faece8] opacity-40 group-hover:scale-125 transition-transform duration-500" />

                      <div className="relative z-10 h-full flex flex-col">
                        {/* Icon */}
                        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#de9f61] to-[#e99312] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                          <BadgeDollarSign size={27} />
                        </div>

                        {/* Number */}
                        <span className="absolute top-0 right-0 text-xs font-bold text-[#e99312] bg-[#faece8] px-2.5 py-1 rounded-full">
                          {++number}
                        </span>

                        {/* Content */}
                        <div className="mt-6">
                          <h4 className="text-[#002046] font-bold text-xl">
                            Request Additional Offer
                          </h4>
                          <p className="text-[#697386] text-sm leading-6 mt-2">
                            Provide the additional details required for processing
                            your foreign leave request.
                          </p>
                        </div>

                        {/* Bottom */}
                        <div className="mt-auto pt-6 flex items-center justify-between">
                          <span className="text-[#e99312] text-sm font-bold">
                            Start Form
                          </span>
                          <span className="w-9 h-9 rounded-full bg-[#e99312] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate(`/additional-offer/edit/${id}`)}
                      className="group relative overflow-hidden text-left bg-linear-to-br from-[#efd6e9] via-white to-[#fbfafb] border border-[#fbdef4] rounded-3xl p-6 sm:p-7 min-h-65 shadow-[0_6px_25px_rgba(80,50,120,0.05)] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(80,50,120,0.11)] hover:border-[#fac3ed] transition-all duration-300">

                      {/* Decorative circle */}
                      <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-[#f7c6e6] opacity-40 group-hover:scale-125 transition-transform duration-500" />

                      <div className="relative z-10 h-full flex flex-col">
                        {/* Icon */}
                        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#de55c9] to-[#e912c9] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                          <BadgeDollarSign size={27} />
                        </div>

                        {/* Number */}
                        <span className="absolute top-0 right-0 text-xs font-bold text-[#e912c9] bg-[#faece8] px-2.5 py-1 rounded-full">
                          {++number}
                        </span>

                        {/* Content */}
                        <div className="mt-6">
                          <h4 className="text-[#002046] font-bold text-xl">
                            Request Warm Cloth Offer
                          </h4>
                          <p className="text-[#697386] text-sm leading-6 mt-2">
                            Provide the additional details required for processing
                            your foreign leave request.
                          </p>
                        </div>

                        {/* Bottom */}
                        <div className="mt-auto pt-6 flex items-center justify-between">
                          <span className="text-[#e912c9] text-sm font-bold">
                            Start Form
                          </span>
                          <span className="w-9 h-9 rounded-full bg-[#e912c9] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </div>
                      </div>
                    </button>
                  </>
                )
              }
              


              {/* DOCUMENTS */}
              <button
                onClick={() => navigate(`/new-doc/edit/${id}`)}
                className="group relative overflow-hidden text-left bg-linear-to-br from-[#ECFBF5]  via-white to-[#F7FFFC] border border-[#D7EEE4] rounded-3xl p-6 sm:p-7 min-h-65 shadow-[0_6px_25px_rgba(20,100,75,0.05)] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(20,100,75,0.11)]  hover:border-[#9ED2BC] transition-all duration-300"
              >
                {/* Decorative circle */}
                <div className="absolute -right-12 -top-12 w-40  h-40 rounded-full bg-[#C7EADB] opacity-40 group-hover:scale-125 transition-transform duration-500" />

                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon */}
                  <div className=" w-14 h-14 rounded-2xl bg-linear-to-br from-[#087F5B] to-[#13A673] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <FileStack size={27} />
                  </div>

                  {/* Number */}
                  <div className="absolute top-0 right-0">
                    {isDocumentsCompleted() ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087F5B] bg-[#DDF5EA] px-3 py-1.5 rounded-full">
                        {++number}
                        <CheckCircle2 size={15} />
                        Completed
                      </span>
                    ) : (
                      <span className=" text-xs font-bold text-[#087F5B] bg-[#DDF5EA] px-2.5 py-1 rounded-full">
                        {++number}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="mt-6">
                    <h4 className="text-[#002046] font-bold text-xl">
                      Supporting Documents
                    </h4>

                    <p className="text-[#697386] text-sm leading-6 mt-2">
                      Upload the required documents and supporting evidence
                      for your application.
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <span className="text-[#087F5B] text-sm font-bold">
                      {isDocumentsCompleted() ? "View / Edit Documents": "Upload Documents"}
                    </span>
                    <span className="w-9 h-9 rounded-full bg-[#087F5B] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
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

            <div className="mt-6 flex flex-col gap-4">
              <p className="text-[#44474E]  text-sm font-medium leading-5 tracking-[0.14px]">
                I hereby declare that the information provided in this application
                and the attached documents are true and correct to the best of my
                knowledge. I understand that providing false information may result
                in appropriate action being taken against me.
              </p>

              <div className="relative rounded-lg bg-white border-2 border-dashed border-[#C4C6CF] min-h-62.5 flex items-center justify-center overflow-hidden">
                {/* New uploaded signature */}
                {signaturePreview && (
                  <img
                    src={signaturePreview}
                    alt="Signature Preview"
                    className="max-w-full max-h-57.5 object-contain"
                  />
                )}

                {/* Existing signature when editing */}
                {!signaturePreview && existingSignature && (
                  <img
                    src={existingSignature}
                    alt="Existing Signature"
                    className="max-w-full max-h-57.5 object-contain"
                  />
                )}

                {/* Upload message */}
                {!signaturePreview && !existingSignature && (
                  <div className="text-center">
                    <Upload className="mx-auto mb-3 text-gray-400 w-10 h-10" />
                    <p className="text-gray-500 text-sm">Upload your signature image</p>
                    <p className="text-gray-400 text-xs mt-1">PNG, JPG or JPEG — Maximum 2MB</p>
                  </div>
                )}
              </div>

              {/* Upload button */}
              <div className="flex items-center justify-between mb-5">
                <label
                  htmlFor="signature-upload"
                  className="flex items-center gap-2 px-5 py-2 bg-[#002046] text-white rounded-lg cursor-pointer hover:bg-[#001533]"
                >
                  <Upload size={18} />
                  {signaturePreview || existingSignature
                    ? "Change Signature"
                    : "Upload Signature"}
                </label>

                <input
                  id="signature-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="hidden"
                  onChange={handleSignatureUpload}
                />

                {(signaturePreview || existingSignature) && (
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="flex items-center gap-2 text-[#BA1A1A] text-sm font-bold hover:opacity-70"
                  >
                    <Trash2 size={18} />
                    Remove
                  </button>
                )}
              </div>
            </div>

            {isEditMode ? (
                <button
                  className={`w-full py-3 rounded-lg
                    ${
                       allCompleted ? `bg-[#002046] hover:bg-[#001533] text-white`
                      : `bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed`
                    }`}
                  onClick={submitApplication}
                  disabled = {loading}
                >
                  {loading ? "Resubmitting Application..." :"Resubmit Application"}
                </button>
              ):(
                <button
                  className={`w-full py-3 rounded-lg
                    ${
                      allCompleted ? `bg-[#002046] hover:bg-[#001533] text-white`
                      : `bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed`
                    }`}
                  onClick={submitApplication}
                  disabled = {loading}
                >
                  {loading ? "Submitting Application..." :"Submit Application"}
                </button>
              )
            }
            <button
              className="mt-3 w-full bg-gray-300 hover:bg-gray-400 text-[#1B365D] py-3 rounded-lg"
              onClick={()=>navigate(`/new-doc/edit/${id}`)}
            >
              Back
            </button>

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
