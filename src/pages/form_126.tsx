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

      <div className="col-span-4 p-3 font-medium">
        <p className='text-sm'>1. දෙපාර්තමේන්තුව</p>
        <p className='ml-3'>Department</p>
      </div>

      <div className="col-span-8 p-3">
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

      <div className="col-span-4  p-3 font-medium">
        <p className='text-sm'>2. නම හා නිලනාමය</p>
        <p className='ml-3'>Name and Designation</p>
      </div>

      <div className="col-span-8 p-3">
        {applicationData.name_and_designation}
      </div>
    </div>
  </div>

  {/* Section 3 */}
  <div className="border-t mb-4">
    <div className="grid grid-cols-12">
      {/* <div className="col-span-1  p-3 font-semibold">
        3.
      </div> */}

      <div className="col-span-4  p-3 font-medium">
        <p className='text-sm'>3. සේවය, පංතිය හෝ ශ්‍රේණිය</p>
        <p className='ml-3'>Service, Class or Grade</p>
      </div>

      <div className="col-span-8 p-3">
        {applicationData.service_id}{" - "}{grade}
      </div>
    </div>
  </div>

  {/* Section 4 */}
  <div className="border-t mb-4">
    <div className="grid grid-cols-12">
      {/* <div className="col-span-1  p-3 font-semibold">
        4.
      </div> */}

      <div className="col-span-4  p-3 font-medium">
        <p className='text-sm'>4. මුලින්ම පත් වූ දිනය</p>
        <p className='ml-3'>Date of first appoinment</p>
      </div>

      <div className="col-span-8 p-3">
        {applicationData.first_appoinment_date}
      </div>
    </div>
  </div>

  {/* Section 5*/}
  <div className="border-t mb-4">
    <div className="grid grid-cols-12">
      {/* <div className="col-span-1  p-3 font-semibold">
        5.
      </div> */}

      <div className="col-span-4  p-3 font-medium">
        <p className='text-sm'>5. මීට පෙරද නිවාඩු ගත්තේ නම් පසු ගිය වර ශ්‍රී ලංකාවට ආපසු පැමිණි දිනය</p>
        <p className='ml-3'>If leave was taken earlier,date of last return to Sri Lanka</p>
      </div>

      <div className="col-span-8 p-3">
        {applicationData.last_return_date}
      </div>
    </div>
  </div>

  {/* Section 6 */}
  <div className="border-t mb-4">
    <div className="grid grid-cols-12">
      {/* <div className="col-span-1  p-3 font-semibold">
        6.
      </div> */}

      <div className="col-span-4  p-3 font-medium">
        <p className='text-sm'>6. දැන් ඉල්ලා සිටින නිවාඩු කාලය (නිවාඩු පටන් ගන්නා දිනය හා අවසන් වන දිනය සදහන් කරන්න)</p>
        <p className='ml-3'>Period of leave now applied for(Give dates of commencement and completion)</p>
      </div>

      <div className="col-span-8 p-3">
        <div>
          <span className="ml-2 ">
            {applicationData.leave_start_date}{"  සිට  "}{applicationData.leave_end_date}{"  දක්වා  "}
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

      <div className="col-span-4  p-3 font-medium">
        <p className='text-sm'>7. නිවාඩු ඉල්ලීමට හේතු</p>
        <p className='ml-3'>Reasons for leave</p>
      </div>

      <div className="col-span-8 p-3">
        {applicationData.reason_for_leave}
      </div>
    </div>
  </div>

  {/* Section 8 */}
  <div className="border-t mb-4">
    <div className="grid grid-cols-12">
      {/* <div className="col-span-1  p-3 font-semibold">
        8.
      </div> */}

      <div className="col-span-4  p-3 font-medium">
        <p className='text-sm'>8. (අ) ගමන් කරන්නේ කලින් මුදල් ගෙවූ ටිකට්ටුවකින්ද</p>
        <p className='ml-3'>(a) Is travel on pre-paid ticket</p>
      </div>

      <div className="col-span-8 p-3">
        {applicationData.is_travel_on_a_pre_paid_ticket
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

      <div className="col-span-4  p-3 font-medium">
        <p className='text-sm ml-3'>(ආ) එය එවන පුද්ගලයා හා ඉල්ලුම්කරු අතර ඇති සම්බන්ධය</p>
        <p className='ml-3'>(b) Relationship of the person sending it</p>
      </div>

      <div className="col-span-8 p-3">
        {applicationData.relationship_of_the_person_sending_it}
      </div>
    </div>
  </div>

  {/* Section 9 */}
  <div className="border-t mb-4">
    <div className="grid grid-cols-12">
      {/* <div className="col-span-1  p-3 font-semibold">
        9.
      </div> */}

      <div className="col-span-4  p-3 font-medium">
        <p className='text-sm'>9. (අ) පිටරට තමාගේ නඩත්තු වියදම් දරන්නේ කෙසේද?</p>
        <p className='ml-3'>(a) How is the cost maintenance abroad met?</p>
      </div>

      <div className="col-span-8 p-3">
        {applicationData.cost_maintanence_abroad}
      </div>
    </div>
  </div>

  {/*  */}
  <div className=" mb-8">
    <div className="grid grid-cols-12">
      {/* <div className="col-span-1  p-3 font-semibold">
        
      </div> */}

      <div className="col-span-4  p-3 font-medium">
        <p className='text-sm ml-3'>(ආ) එම වියදම් දරන පුද්ගලයා හා ඉල්ලුම්කරු අතර ඇති සම්බන්ධය</p>
        <p className='ml-3'>(b) Relationship of person meeting such expenditure</p>
      </div>

      <div className="col-span-8 p-3 whitespace-pre-line">
        {applicationData.relationship_of_person_meeting_expenditure}
      </div>
    </div>
  </div>

  {/* section 10  */}
  <div className="border-t border-b mb-8">
    <div className="grid grid-cols-12">
      {/* <div className="col-span-1 p-3 font-semibold">
        10.
      </div> */}

      <div className="col-span-4 p-3 font-medium">
        <p className='text-sm'>10. නිවාඩු කාලයේදී ඉල්ලුම්කරුගේ ලිපිනය</p>
        <p className='ml-4'>Address when on leave</p>
      </div>

      <div className="col-span-8 p-3 whitespace-pre-line">
        {applicationData.foreign_address}
      </div>
    </div>
  </div>

  {/* Signature */}
  <div className="flex justify-between items-end mt-16">
    <div>
        <div className="w-40 pt-2">
            {new Date(applicationData.created_at).toLocaleDateString()}
        </div>
        <div className="border-t w-64 pt-2 mt-2">
            Date
        </div>
    </div>

    <div className="text-center">
      {applicationData.signature_path && (
        <img
          src={`http://127.0.0.1:8000/storage/${applicationData.signature_path}`}
          alt="signature"
          className="h-20 object-contain mx-auto"
        />
      )}

      <div className="border-t w-64 pt-2 mt-2">
        Applicant Signature
      </div>
    </div>
  </div>
</div>
  )
}
