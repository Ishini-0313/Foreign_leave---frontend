// import axios from "axios";
// import {  Check, Hourglass, Undo2 } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../components/navbar";
// import Footer from "../components/footer";
// import Topbar from "../components/topbar";

// export default function ApplicationTracking() {
//   const [user, setUser] = useState<any>(null);
//   const {id} = useParams();
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [tracking, setTracking] = useState<any>();
  
//   useEffect(()=>{
//     const storedUser = localStorage.getItem("user");
//     console.log("Stored User:", storedUser);
//     if(!storedUser){
//       navigate("/");
//       return;
//     }
//     setUser(JSON.parse(storedUser));
//   },[]);

  
//   useEffect(() => {
//         axios.get(
//             `http://127.0.0.1:8000/api/applications/${id}/tracking`,
//             {
//                 headers: {
//                     Authorization:
//                         `Bearer ${localStorage.getItem("token")}`
//                 }
//             }
//         )
//         .then((res) => {
//             setTracking(res.data);
//             console.log(res.data);
//         })
//         .catch((err) => {
//             console.log(err);
//         });

//     }, []);

//   return (
//     <div className="flex h-screen bg-[#FAF9FD] font-[Inter,sans-serif] overflow-hidden relative">
//       {/* Mobile sidebar overlay */}
//       <Navbar
//             user={user}
//             sidebarOpen={sidebarOpen}
//             setSidebarOpen={setSidebarOpen}
//         />

//       {/* Main area */}
//       <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
//         {/* Top Header */}
//         <Topbar
//             user={user}
//             sidebarOpen={sidebarOpen}
//             setSidebarOpen={setSidebarOpen}
//         />

//         {/* Page content */}
//         <main className="flex-1 px-4 sm:px-6 py-6 space-y-8 overflow-y-auto">
//             {/* progress panel */}
//             <div className="bg-white rounded-lg shadow p-6">
//                 <h2 className="font-bold mb-6">Workflow Progress</h2>
//                 {tracking?.steps.map((step:any, index:any)=>{
//                     const completed = step.status === 'completed';
//                     const current = step.status === 'current';
//                     const returned = step.status === 'returned';
//                     return(
//                         <div key={step.id} className="flex gap-4">
//                             <div className="flex flex-col items-center">
//                                 <div className={`w-10 h-10 rounded-md flex items-center justify-center border-2
//                                     ${
//                                         step.status === 'completed' ? "border-green-500 bg-green-100" : 
//                                         step.status === 'current' ? "border-blue-500 bg-blue-100" : 
//                                         step.status === 'returned' ? "border-yellow-500 bg-yellow-100" : 
//                                         "border-gray-300 bg-gray-100"
//                                     }`
//                                 }
//                                 >
//                                     {
//                                         step.status === 'completed' ? <Check className="w-5 text-green-500"/> : 
//                                         step.status === 'current' ? <Hourglass className="w-5 text-blue-500"/>:
//                                         step.status === 'returned' ? <Undo2 className="w-5 text-yellow-500"/> :
//                                         step.sequence_no
//                                     }
//                                 </div>
//                                 {/* Vertical Line (don't show after last step) */}
//                                 {index !== tracking.steps.length - 1 && (
//                                     <div
//                                         className={`w-0.5 flex-1 min-h-10
//                                         ${completed ? "bg-green-500" : "bg-gray-300"}`}
//                                     />
//                                 )}
//                             </div>

//                             <div>
//                                 {
//                                     step.status === 'completed'?<div className="text-green-600 ">{step.role.role_name}</div>:
//                                     step.status === 'current' ? <div className="text-blue-500 ">{step.role.role_name}</div>:
//                                     step.status === 'returned' ? <div className="text-yellow-500 ">{step.role.role_name}</div>:
//                                     <div className="text-gray-500 ">{step.role.role_name}</div>
//                                 }
//                                 <div className="text-xs text-gray-500">
//                                     {step.office_name}
//                                 </div>
//                             </div>
//                         </div>
//                     )
//                 })}
//             </div>

//             {/* history table */}
//             <table className="w-full table-auto bg-white">
//                 <thead className="border-b border-gray-400">
//                     <tr>
//                         <th>Date</th>
//                         <th>Office</th>
//                         <th>Officer</th>
//                         <th>Action</th>
//                         <th>Remarks</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {tracking?.history.map((item:any)=>(
//                         <tr key={item.id} className=" border-b border-gray-400">
//                             <td className="">
//                                 {new Date(item.created_at).toLocaleDateString()}
//                                 <br/>
//                                 {new Date(item.created_at).toLocaleTimeString()}
//                             </td>
//                             <td>
//                                 {item.user.office.name}
//                             </td>
//                             <td>
//                                 {item.user.full_name}
//                             </td>
//                             <td>
//                                 {item.action === "Forwarded" && (
//                                     <span className="px-2 py-1 rounded bg-blue-100">{item.action}</span>
//                                 )}
//                                 {item.action === "Returned" && (
//                                     <span className="px-2 py-1 rounded bg-red-100">{item.action}</span>
//                                 )}
//                                 {item.action === "Approved" && (
//                                     <span className="px-2 py-1 rounded bg-green-100">{item.action}</span>
//                                 )}
//                                 {item.action === "Resubmited" && (
//                                     <span className="px-2 py-1 rounded bg-blue-100">{item.action}</span>
//                                 )}
//                                 {item.action === "Submited" && (
//                                     <span className="px-2 py-1 rounded bg-blue-100">{item.action}</span>
//                                 )}
//                             </td>
//                             <td>
//                                 {item.remarks}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

          
//         <Footer/>
//     </main>
//     </div>
//     </div>
//   );
// }


import axios from "axios";
import { Check, Hourglass, Undo2, Clock3 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Topbar from "../components/topbar";

export default function ApplicationTracking() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tracking, setTracking] = useState<any>();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    console.log("Stored User:", storedUser);

    if (!storedUser) {
      navigate("/");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/applications/${id}/tracking`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setTracking(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex h-screen bg-[#F7F8FA] font-[Inter,sans-serif] overflow-hidden relative">

      {/* =========================
          SIDEBAR
      ========================== */}
      <Navbar
        user={user}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* =========================
          MAIN AREA
      ========================== */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">

        {/* DO NOT CHANGE TOPBAR */}
        <Topbar
          user={user}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* =========================
            PAGE CONTENT
        ========================== */}
        <main className="flex-1 overflow-y-auto">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

            {/* =========================
                PAGE HEADER
            ========================== */}
            <div className="mb-7">

              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs mb-3">

                <span className="text-[#6B7280]">
                  Home
                </span>

                <span className="text-[#9CA3AF]">
                  /
                </span>

                <span className="text-[#6B7280]">
                  My Applications
                </span>

                <span className="text-[#9CA3AF]">
                  /
                </span>

                <span className="text-[#002046] font-semibold">
                  Application Tracking
                </span>

              </div>

              {/* Title */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

                <div>

                  <h1 className="text-[#002046] text-2xl sm:text-3xl font-bold tracking-tight">
                    Application Tracking
                  </h1>

                  <p className="text-[#6B7280] mt-1 text-sm sm:text-base">
                    Track the progress and approval status of your foreign
                    leave application.
                  </p>

                </div>

                {/* Application Number */}
                {tracking?.application?.application_no && (
                  <div className="bg-white border border-[#D1D5DB] rounded-lg px-4 py-3">

                    <p className="text-[11px] uppercase tracking-wider text-[#6B7280] font-semibold">
                      Application Number
                    </p>

                    <p className="text-[#002046] font-bold mt-0.5">
                      {tracking.application.application_no}
                    </p>

                  </div>
                )}

              </div>
            </div>


            {/* =========================
                WORKFLOW PROGRESS
            ========================== */}
            <div className="bg-white border border-[#D9DDE3] rounded-xl shadow-sm overflow-hidden mb-7">

              {/* Card Header */}
              <div className="px-5 sm:px-6 py-5 border-b border-[#E5E7EB]">

                <div className="flex items-center justify-between gap-4">

                  <div>

                    <h2 className="text-[#1A1B1E] text-lg sm:text-xl font-bold">
                      Workflow Progress
                    </h2>

                    <p className="text-[#6B7280] text-sm mt-1">
                      Follow your application through each approval stage.
                    </p>

                  </div>

                  <div className="hidden sm:flex items-center gap-2 text-xs text-[#6B7280]">

                    {/* <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Completed */}

                  </div>

                </div>

              </div>


              {/* Timeline */}
              <div className="px-5 sm:px-8 py-7">

                {!tracking ? (

                  /* Loading */
                  <div className="flex flex-col items-center justify-center py-10">

                    <div className="w-8 h-8 border-4 border-[#D9E2F0] border-t-[#002046] rounded-full animate-spin"></div>

                    <p className="text-sm text-[#6B7280] mt-3">
                      Loading application progress...
                    </p>

                  </div>

                ) : tracking.steps?.length === 0 ? (

                  /* Empty */
                  <div className="text-center py-10">

                    <Clock3 className="mx-auto w-10 h-10 text-[#9CA3AF]" />

                    <p className="text-[#6B7280] mt-3">
                      No workflow steps available.
                    </p>

                  </div>

                ) : (

                  <div className="relative">

                    {tracking.steps.map((step: any, index: number) => {

                      const completed = step.status === "completed";
                      const current = step.status === "current";
                      const returned = step.status === "returned";

                      return (

                        <div
                          key={step.id}
                          className="relative flex gap-4 sm:gap-6"
                        >

                          {/* =========================
                              ICON + CONNECTOR
                          ========================== */}
                          <div className="flex flex-col items-center">

                            {/* Icon */}
                            <div
                              className={`
                                relative z-10
                                w-11 h-11 sm:w-12 sm:h-12
                                rounded-full
                                flex items-center justify-center
                                border-2
                                shrink-0
                                transition-all

                                ${
                                  completed
                                    ? "border-green-500 bg-green-50"
                                    : current
                                    ? "border-[#2563EB] bg-blue-50 shadow-[0_0_0_5px_rgba(37,99,235,0.08)]"
                                    : returned
                                    ? "border-yellow-500 bg-yellow-50"
                                    : "border-[#D1D5DB] bg-[#F9FAFB]"
                                }
                              `}
                            >

                              {completed ? (
                                <Check
                                  className="w-5 h-5 text-green-600"
                                  strokeWidth={3}
                                />
                              ) : current ? (
                                <Hourglass
                                  className="w-5 h-5 text-blue-600"
                                />
                              ) : returned ? (
                                <Undo2
                                  className="w-5 h-5 text-yellow-600"
                                />
                              ) : (
                                <span className="text-sm font-bold text-[#6B7280]">
                                  {step.sequence_no}
                                </span>
                              )}

                            </div>


                            {/* Connector */}
                            {index !== tracking.steps.length - 1 && (

                              <div
                                className={`
                                  w-0.5 flex-1 min-h-17.5
                                  ${
                                    completed
                                      ? "bg-green-400"
                                      : "bg-[#E5E7EB]"
                                  }
                                `}
                              />

                            )}

                          </div>


                          {/* =========================
                              STEP INFORMATION
                          ========================== */}
                          <div className="pb-8 pt-1 min-w-0 flex-1">

                            {/* Step number */}
                            <p className="text-[11px] uppercase tracking-wider font-semibold text-[#9CA3AF] mb-1">
                              Step {step.sequence_no}
                            </p>


                            {/* Role */}
                            <div className="flex flex-wrap items-center gap-2">

                              <h3
                                className={`
                                  font-bold text-base sm:text-lg
                                  ${
                                    completed
                                      ? "text-green-700"
                                      : current
                                      ? "text-blue-700"
                                      : returned
                                      ? "text-yellow-700"
                                      : "text-[#4B5563]"
                                  }
                                `}
                              >
                                {step.role?.role_name}
                              </h3>


                              {/* Status Badge */}
                              {completed && (
                                <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[11px] font-bold">
                                  COMPLETED
                                </span>
                              )}

                              {current && (
                                <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold">
                                  CURRENT
                                </span>
                              )}

                              {returned && (
                                <span className="px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 text-[11px] font-bold">
                                  RETURNED
                                </span>
                              )}

                              {!completed && !current && !returned && (
                                <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-[11px] font-bold">
                                  PENDING
                                </span>
                              )}

                            </div>


                            {/* Office */}
                            <div className="flex items-center gap-2 mt-1.5">

                              <div className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF]"></div>

                              <p className="text-sm text-[#6B7280]">
                                {step.office_name}
                              </p>

                            </div>


                            {/* Current step message */}
                            {current && (
                              <div className="mt-3 inline-flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-lg">

                                <Hourglass className="w-4 h-4 text-blue-600" />

                                <span className="text-xs sm:text-sm text-blue-700 font-medium">
                                  Your application is currently being reviewed
                                  at this stage.
                                </span>

                              </div>
                            )}

                          </div>

                        </div>

                      );

                    })}

                  </div>

                )}

              </div>

            </div>


            {/* =========================
                HISTORY SECTION
            ========================== */}
            <div className="bg-white border border-[#D9DDE3] rounded-xl shadow-sm overflow-hidden">

              {/* Header */}
              <div className="px-5 sm:px-6 py-5 border-b border-[#E5E7EB]">

                <h2 className="text-[#1A1B1E] text-lg sm:text-xl font-bold">
                  Application History
                </h2>

                <p className="text-[#6B7280] text-sm mt-1">
                  A record of actions taken on your application.
                </p>

              </div>


              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-[#F8F9FB] border-b border-[#E5E7EB]">

                    <tr>

                      <th className="px-5 py-4 text-left text-[11px] uppercase tracking-wider font-bold text-[#6B7280]">
                        Date & Time
                      </th>

                      <th className="px-5 py-4 text-left text-[11px] uppercase tracking-wider font-bold text-[#6B7280]">
                        Office
                      </th>

                      <th className="px-5 py-4 text-left text-[11px] uppercase tracking-wider font-bold text-[#6B7280]">
                        Officer
                      </th>

                      <th className="px-5 py-4 text-left text-[11px] uppercase tracking-wider font-bold text-[#6B7280]">
                        Action
                      </th>

                      <th className="px-5 py-4 text-left text-[11px] uppercase tracking-wider font-bold text-[#6B7280]">
                        Remarks
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {tracking?.history?.length > 0 ? (

                      tracking.history.map((item: any) => (

                        <tr
                          key={item.id}
                          className="border-b border-[#E5E7EB] last:border-0 hover:bg-[#FAFBFC] transition-colors"
                        >

                          {/* Date */}
                          <td className="px-5 py-5 align-top">

                            <p className="text-sm font-semibold text-[#1A1B1E]">
                              {new Date(
                                item.created_at
                              ).toLocaleDateString()}
                            </p>

                            <p className="text-xs text-[#6B7280] mt-0.5">
                              {new Date(
                                item.created_at
                              ).toLocaleTimeString()}
                            </p>

                          </td>


                          {/* Office */}
                          <td className="px-5 py-5 align-top">

                            <p className="text-sm text-[#374151]">
                              {item.user?.office?.name}
                            </p>

                          </td>


                          {/* Officer */}
                          <td className="px-5 py-5 align-top">

                            <p className="text-sm font-medium text-[#1A1B1E]">
                              {item.user?.full_name}
                            </p>

                          </td>


                          {/* Action */}
                          <td className="px-5 py-5 align-top">

                            {item.action === "Forwarded" && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                Forwarded
                              </span>
                            )}

                            {item.action === "Recommended" && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                Recommended
                              </span>
                            )}

                            {item.action === "Not Recommended" && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-700 text-xs font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                                Not Recommended
                              </span>
                            )}

                            {item.action === "Returned" && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-50 text-yellow-700 text-xs font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-600"></span>
                                Returned
                              </span>
                            )}

                            {item.action === "Approved" && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                                Approved
                              </span>
                            )}

                            {item.action === "Resubmited" && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                Resubmitted
                              </span>
                            )}

                            {item.action === "Submited" && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                Submitted
                              </span>
                            )}

                          </td>


                          {/* Remarks */}
                          <td className="px-5 py-5 align-top">

                            <p className="text-sm text-[#4B5563] max-w-xs">
                              {item.remarks || "-"}
                            </p>

                          </td>

                        </tr>

                      ))

                    ) : (

                      <tr>

                        <td
                          colSpan={5}
                          className="px-5 py-12 text-center"
                        >

                          <Clock3 className="w-8 h-8 mx-auto text-[#9CA3AF]" />

                          <p className="text-sm text-[#6B7280] mt-2">
                            No application history available.
                          </p>

                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>


              {/* =========================
                  MOBILE HISTORY CARDS
              ========================== */}
              <div className="md:hidden">

                {tracking?.history?.length > 0 ? (

                  <div className="divide-y divide-[#E5E7EB]">

                    {tracking.history.map((item: any) => (

                      <div
                        key={item.id}
                        className="p-5"
                      >

                        {/* Top */}
                        <div className="flex items-start justify-between gap-3">

                          <div>

                            <p className="text-sm font-semibold text-[#1A1B1E]">
                              {item.user?.full_name}
                            </p>

                            <p className="text-xs text-[#6B7280] mt-1">
                              {item.user?.office?.name}
                            </p>

                          </div>


                          {/* Action */}
                          <div>

                            {item.action === "Forwarded" && (
                              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold">
                                Forwarded
                              </span>
                            )}

                            {item.action === "Returned" && (
                              <span className="px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700 text-[11px] font-bold">
                                Returned
                              </span>
                            )}

                            {item.action === "Approved" && (
                              <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-[11px] font-bold">
                                Approved
                              </span>
                            )}

                            {item.action === "Resubmited" && (
                              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold">
                                Resubmitted
                              </span>
                            )}

                            {item.action === "Submited" && (
                              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold">
                                Submitted
                              </span>
                            )}

                          </div>

                        </div>


                        {/* Date */}
                        <div className="mt-4 flex items-center gap-2">

                          <Clock3 className="w-4 h-4 text-[#9CA3AF]" />

                          <p className="text-xs text-[#6B7280]">

                            {new Date(
                              item.created_at
                            ).toLocaleDateString()}

                            {" • "}

                            {new Date(
                              item.created_at
                            ).toLocaleTimeString()}

                          </p>

                        </div>


                        {/* Remarks */}
                        {item.remarks && (
                          <div className="mt-3 bg-[#F8F9FB] rounded-lg px-3 py-2.5">

                            <p className="text-[11px] uppercase tracking-wider font-bold text-[#9CA3AF] mb-1">
                              Remarks
                            </p>

                            <p className="text-sm text-[#4B5563]">
                              {item.remarks}
                            </p>

                          </div>
                        )}

                      </div>

                    ))}

                  </div>

                ) : (

                  <div className="py-12 text-center">

                    <Clock3 className="w-8 h-8 mx-auto text-[#9CA3AF]" />

                    <p className="text-sm text-[#6B7280] mt-2">
                      No application history available.
                    </p>

                  </div>

                )}

              </div>

            </div>


            {/* =========================
                FOOTER
            ========================== */}
            <div className="mt-8">

              <Footer />

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}