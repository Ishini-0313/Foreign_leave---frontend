import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Form_126() {
    const {id} = useParams();
    const [applicationData, setApplicationData] = useState<any>(null);

    const [department, setDepartment] = useState("");
    const [grade, setGrade] = useState("");

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

    useEffect(() => {
      if (!applicationData?.institute_id) return;

        axios
          .get("http://127.0.0.1:8000/api/office-by-id", {
            params: {
              id: applicationData.institute_id,
            },
          })
          .then((res) => {
            setDepartment(res.data.name);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [applicationData]
    );

    useEffect(() => {
      if (!applicationData?.service_id) return;

        axios
          .get("http://127.0.0.1:8000/api/grade-by-id", {
            params: {
              id: applicationData.class_or_grade,
            },
          })
          .then((res) => {
            setGrade(res.data.name);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [applicationData]
    );

    if (!applicationData) {
        return <div>Loading...</div>;
    }
  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg border border-gray-300 p-10">
  
  {/* Header */}
  <div className="text-center  pb-4 mb-8">
    <h1 className="text-2xl font-bold uppercase">
      Application for Leave Out of Sri Lanka
    </h1>
    <p className="text-sm text-gray-600 mt-1">
      General Form 126
    </p>
  </div>

  {/* Section 1 */}
  <div className="border-t mb-4">
    <div className="grid grid-cols-12">
      {/* <div className="col-span-1  p-3 font-medium">
        1.
      </div> */}

      <div className="col-span-4 p-3 ">
        <p className='text-sm'>1. දෙපාර්තමේන්තුව</p>
        <p className='ml-3 text-sm'>Department</p>
      </div>

      <div className="col-span-8 p-3 text-sm">
        {department}
      </div>
    </div>
  </div>

  {/* Section 2 */}
  <div className="border-t  mb-4">
    <div className="grid grid-cols-12">
      {/* <div className="col-span-1  p-3 font-semibold">
        2.
      </div> */}

      <div className="col-span-4  p-3 ">
        <p className='text-sm'>2. නම හා නිලනාමය</p>
        <p className='ml-3 text-sm'>Name and Designation</p>
      </div>

      <div className="col-span-8 p-3 text-sm">
        {applicationData.application.name_and_designation}
      </div>
    </div>
  </div>

  {/* Section 3 */}
  <div className="border-t mb-4">
    <div className="grid grid-cols-12">
      {/* <div className="col-span-1  p-3 font-semibold">
        3.
      </div> */}

      <div className="col-span-4  p-3 ">
        <p className='text-sm'>3. සේවය, පංතිය හෝ ශ්‍රේණිය</p>
        <p className='ml-3 text-sm'>Service, Class or Grade</p>
      </div>

      <div className="col-span-8 p-3 text-sm">
        {applicationData.application.service_id}{" - "}{grade}
      </div>
    </div>
  </div>

  {/* Section 4 */}
  <div className="border-t mb-4">
    <div className="grid grid-cols-12">
      {/* <div className="col-span-1  p-3 font-semibold">
        4.
      </div> */}

      <div className="col-span-4  p-3 ">
        <p className='text-sm'>4. මුලින්ම පත් වූ දිනය</p>
        <p className='ml-3 text-sm'>Date of first appoinment</p>
      </div>

      <div className="col-span-8 p-3 text-sm">
        {applicationData.application.first_appoinment_date}
      </div>
    </div>
  </div>

  {/* Section 5*/}
  <div className="border-t mb-4">
    <div className="grid grid-cols-12">
      {/* <div className="col-span-1  p-3 font-semibold">
        5.
      </div> */}

      <div className="col-span-4  p-3 ">
        <p className='text-sm'>5. මීට පෙරද නිවාඩු ගත්තේ නම් පසු ගිය වර ශ්‍රී ලංකාවට ආපසු පැමිණි දිනය</p>
        <p className='ml-3 text-sm'>If leave was taken earlier,date of last return to Sri Lanka</p>
      </div>

      <div className="col-span-8 p-3 text-sm">
        {applicationData.application.last_return_date}
      </div>
    </div>
  </div>

  {/* Section 6 */}
  <div className="border-t mb-4">
    <div className="grid grid-cols-12">
      {/* <div className="col-span-1  p-3 font-semibold">
        6.
      </div> */}

      <div className="col-span-4  p-3">
        <p className='text-sm'>6. දැන් ඉල්ලා සිටින නිවාඩු කාලය (නිවාඩු පටන් ගන්නා දිනය හා අවසන් වන දිනය සදහන් කරන්න)</p>
        <p className='ml-3 text-sm'>Period of leave now applied for(Give dates of commencement and completion)</p>
      </div>

      <div className="col-span-8 p-3">
        <div>
          <span className="ml-2 text-sm">
            {applicationData.application.leave_start_date}{"  සිට  "}{applicationData.leave_end_date}{"  දක්වා  "}
          </span>

        </div>

        {/* <div>
          To:
          <span className="ml-2 font-medium">
            {applicationData.leave_end_date}
          </span>
        </div> */}
      </div>
    </div>
  </div>

  {/* Section 7 */}
  <div className="border-t mb-4">
    <div className="grid grid-cols-12">
      {/* <div className="col-span-1  p-3 font-semibold">
        7.
      </div> */}

      <div className="col-span-4  p-3 ">
        <p className='text-sm'>7. නිවාඩු ඉල්ලීමට හේතු</p>
        <p className='ml-3 text-sm'>Reasons for leave</p>
      </div>

      <div className="col-span-8 p-3 text-sm">
        {applicationData.application.reason_for_leave}
      </div>
    </div>
  </div>

  {/* Section 8 */}
  <div className="border-t mb-4">
    <div className="grid grid-cols-12">
      {/* <div className="col-span-1  p-3 font-semibold">
        8.
      </div> */}

      <div className="col-span-4  p-3 ">
        <p className='text-sm'>8. (අ) ගමන් කරන්නේ කලින් මුදල් ගෙවූ ටිකට්ටුවකින්ද</p>
        <p className='ml-3 text-sm'>(a) Is travel on pre-paid ticket</p>
      </div>

      <div className="col-span-8 p-3 text-sm">
        {applicationData.application.is_travel_on_a_pre_paid_ticket
          ? "ඔව්"
          : "නැත"}
      </div>
    </div>
  </div>

  {/* */}
  <div className=" mb-4">
    <div className="grid grid-cols-12">
      {/* <div className="col-span-1  p-3 font-semibold">
        
      </div> */}

      <div className="col-span-4  p-3 ">
        <p className='text-sm ml-3'>(ආ) එය එවන පුද්ගලයා හා ඉල්ලුම්කරු අතර ඇති සම්බන්ධය</p>
        <p className='ml-3 text-sm'>(b) Relationship of the person sending it</p>
      </div>

      <div className="col-span-8 p-3 text-sm">
        {applicationData.application.relationship_of_the_person_sending_it}
      </div>
    </div>
  </div>

  {/* Section 9 */}
  <div className="border-t mb-4">
    <div className="grid grid-cols-12">
      {/* <div className="col-span-1  p-3 font-semibold">
        9.
      </div> */}

      <div className="col-span-4  p-3 ">
        <p className='text-sm'>9. (අ) පිටරට තමාගේ නඩත්තු වියදම් දරන්නේ කෙසේද?</p>
        <p className='ml-3 text-sm'>(a) How is the cost maintenance abroad met?</p>
      </div>

      <div className="col-span-8 p-3 text-sm">
        {applicationData.application.cost_maintanence_abroad}
      </div>
    </div>
  </div>

  {/*  */}
  <div className=" mb-8">
    <div className="grid grid-cols-12">
      {/* <div className="col-span-1  p-3 font-semibold">
        
      </div> */}

      <div className="col-span-4  p-3 ">
        <p className='text-sm ml-3'>(ආ) එම වියදම් දරන පුද්ගලයා හා ඉල්ලුම්කරු අතර ඇති සම්බන්ධය</p>
        <p className='ml-3 text-sm'>(b) Relationship of person meeting such expenditure</p>
      </div>

      <div className="col-span-8 p-3 whitespace-pre-line text-sm">
        {applicationData.application.relationship_of_person_meeting_expenditure}
      </div>
    </div>
  </div>

  {/* section 10  */}
  <div className="border-t border-b mb-8">
    <div className="grid grid-cols-12">
      {/* <div className="col-span-1 p-3 font-semibold">
        10.
      </div> */}

      <div className="col-span-4 p-3 ">
        <p className='text-sm'>10. නිවාඩු කාලයේදී ඉල්ලුම්කරුගේ ලිපිනය</p>
        <p className='ml-4 text-sm'>Address when on leave</p>
      </div>

      <div className="col-span-8 p-3 whitespace-pre-line text-sm">
        {applicationData.application.foreign_address}
      </div>
    </div>
  </div>

  {/* Signature */}
  <div className="flex justify-between items-end mt-16">
    <div>
        <div className="w-40 pt-2 text-sm">
            {new Date(applicationData.application.created_at).toLocaleDateString()}
        </div>
        <div className="border-t w-64 pt-2 mt-2 text-sm">
            Date
        </div>
    </div>

    <div className="text-center">
      {applicationData.application.signature_path && (
        <img
          src={`http://127.0.0.1:8000/storage/${applicationData.application.signature_path}`}
          alt="signature"
          className="h-20 object-contain mx-auto bg-amber-200"
        />
      )}

      <div className="border-t w-64 pt-2 mt-2 text-sm">
        Applicant Signature
      </div>
    </div>
  </div>

  {/* office use only */}
  <div className="border-t border-b  mt-8 ">
    <div className="grid grid-cols-12 ">
      {/* fields */}
      <div className="col-span-6 p-3 text-sm ">

        <p>කාර්යාලයීය ප්‍රයෝජනය සදහා පමණි</p>
        <p>For Office use only</p>

        <p className='mt-1'>ඉතිරි නිවාඩු පිළිබද විස්තර</p>
        <p>Particulars of available leave</p>

        {/* <p className='mt-2'>විවේක නිවාඩු</p>
        <p>Vacation Leave</p>
        
        <p className='mt-2'>පරිවර්තිත අඩ වැටුප් නිවාඩු</p>
        <p>Commuted half-pay leave</p>

        <p className='mt-2'>අඩ වැටුප් නිවාඩු</p>
        <p>Half-pay leave</p>

        <p className='mt-2'>වැටුප් රහිත නිවාඩු</p>
        <p>No-pay leave</p> */}
      </div>

      {/* table */}
      <div className="col-span-6 p-3 text-sm ">
        <div className=' '>
          <div className='grid grid-cols-2 gap-6'>
            <div className='w-full text-center '>
              <p>මාස</p>
              <p>Months</p>
            </div>
            <div className='w-full text-center '>
              <p>දින</p>
              <p>Days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div className="border-t border-b ">
    <div className="grid grid-cols-12 ">
      {/* fields */}
      <div className="col-span-6 p-3 text-sm ">
        <p className='mt-2'>විවේක නිවාඩු</p>
        <p>Vacation Leave</p>
        
        <p className='mt-2'>පරිවර්තිත අඩ වැටුප් නිවාඩු</p>
        <p>Commuted half-pay leave</p>

        <p className='mt-2'>අඩ වැටුප් නිවාඩු</p>
        <p>Half-pay leave</p>

        <p className='mt-2'>වැටුප් රහිත නිවාඩු</p>
        <p>No-pay leave</p>
      </div>

      {/* table */}
      <div className="col-span-6 p-3 text-sm ">
        <div className=' '>
          <div className='grid grid-cols-2 gap-6'>
            {/* <div className='w-full text-center bg-green-200'>
              <p className='p-4'>{applicationData.application.available_leave_info.vacation_months}</p>
              <p className='p-4'>{applicationData.application.available_leave_info.commuted_halfpay_months}</p>
              <p className='p-4'>{applicationData.application.available_leave_info.halfpay_months}</p>
              <p className='p-4'>{applicationData.application.available_leave_info.nopay_months}</p>
            </div>
            <div className='w-full text-center bg-gray-100'>
              <p className='p-4'>{applicationData.application.available_leave_info.vacation_days}</p>
              <p className='p-4'>{applicationData.application.available_leave_info.commuted_halfpay_days}</p>
              <p className='p-4'>{applicationData.application.available_leave_info.halfpay_days}</p>
              <p className='p-4'>{applicationData.application.available_leave_info.nopay_days}</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}
