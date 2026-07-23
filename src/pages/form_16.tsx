import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import type { PreviousTravel } from '../context/ApplicationContext';
import { Check } from 'lucide-react';

export default function Form_16() {
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
    <div className="max-w-5xl mx-auto  shadow-lg border border-gray-300 p-3 bg-white">
  
  {/* Header */}
  <div className="text-center  pb-4 mb-8 text-sm">
    <h1 className="font-bold uppercase">
      16 වැනි පරිශිෂ්ටය
      <br />
      (XV - 10:4, 10:5)
    </h1>
    <p className="font-semibold mt-5">
      රාජ්‍ය නිලධරයන්ගේ විදේශ ගමන් සදහා පූර්ව අවසරය ලබා ගැනීමේ ඉල්ලුම්පත්‍රය
    </p>
  </div>

  {/* Section 1 */}
  <div className="mb-4 text-xs ">
    <div className="grid grid-cols-12">
      <div className="col-span-1 font-medium  pl-10">
        <p className='mb-2'>1:1</p>
        <p className='mb-2'>1:2</p>
        <p className='mb-2'>1:3</p>
      </div>

      <div className="col-span-5 font-medium ">
        <p className='mb-2'>නම</p>
        <p className='mb-2'>තනතුර</p>
        <p className='mb-2'>නිලධාරියා අයත්වන සේවය</p>
      </div>

      <div className="col-span-6">
        <p className='mb-2'>{applicationData.name}</p>
        <p className='mb-2'>{applicationData.position}</p>
        <p className='mb-2'>{applicationData.service_id}</p>
      </div>
    </div>
  </div>

  {/* Section 2 */}
  <div className="mb-4 text-xs ">
    <div className="grid grid-cols-12">
      <div className="col-span-1 font-medium  pl-10">
        <p className='mb-2'>2:1</p>
        <p className='mb-2'>2:2</p>
      </div>

      <div className="col-span-5 font-medium ">
        <p className='mb-2'>උපන් දිනය</p>
        <p className='mb-2'>හැදුනුම්පත් අංකය</p>
      </div>

      <div className="col-span-6">
        <p className='mb-2'>{applicationData.dob}</p>
        <p className='mb-2'>{applicationData.nic}</p>
      </div>
    </div>
  </div>

  {/* Section 3 */}
  <div className="mb-4 text-xs">
    <div className="grid grid-cols-12">
      <div className="col-span-1 font-medium  pl-10">
        <p className='mb-2'>3:1</p>
        <p className='mb-2'>3:2</p>
      </div>

      <div className="col-span-5 font-medium ">
        <p className='mb-2'>අමාත්‍යාංශය / පළාත් සභාව</p>
        <p className='mb-2'>දෙපාර්තමේන්තුව / ආයතනය</p>
      </div>

      <div className="col-span-6">
        <p className='mb-2'>{applicationData.ministry.name}</p>
        <p className='mb-2'>{applicationData.institute.name}</p>
      </div>
    </div>
  </div>

  {/* Section 4 */}
  <div className="mb-4 text-xs">
    <div className="grid grid-cols-12">
      <div className="col-span-1 font-medium  pl-10">
        <p className='mb-2'>4</p>
      </div>

      <div className="col-span-5 font-medium ">
        <p className='mb-2'>රාජකාරි ආවරණයට / වැඩ බැලීමට යොදා ඇති වැඩ පිළිවෙළ</p>
      </div>

      <div className="col-span-6">
        <p className='mb-2'>{applicationData.arrangement_made_to_cover_duty}</p>
      </div>
    </div>
  </div>

  {/* Section 5*/}
  <div className="mb-4 text-xs ">
    <div className="grid grid-cols-12 ">
      <div className="col-span-1 font-medium  pl-10">
        <p className='mb-2'>5:1</p>
        <p className='mb-2'>5:2</p>
        <p className='mb-2'>5:3</p>
        <p className='mb-2'>5:4</p>
      </div>

      <div className="col-span-5 font-medium ">
        <p className='mb-2'>ගමනේ අරමුණ / පුහුණු ක්ශේත්‍රය</p>
        <p className='mb-2'>ගමනේ ස්වභාවය</p>
        <p className='mb-2'>පුහුණුව සදහා නම් ප්‍රදානය කරනු ලබන ආයතනය</p>
        <p className='mb-2'>ප්‍රධාන වශයෙන් වියදම් දරන්නේ කෙසේද?</p>
      </div>

      <div className="col-span-6">
        <p className='mb-2'>{applicationData.purpose}</p>
        <p className='mb-2'>{applicationData.nature_of_trip}</p>
        <p className='mb-2'>{applicationData.awarding_agency}</p>
      </div>
    </div>

    <div className="grid grid-cols-12 mb-4 ">
      <div className="col-span-1 font-medium  pl-10">
        <p className='mb-2'></p>
      </div>

      <div className="col-span-11 ">
        <table className='w-full table border border-gray-400'>
          <thead>
            <tr className='border-b border-gray-400 text-xs text-center'>
              <td className='border-r border-gray-400'>වි.සම්.දෙ මගින්</td>
              <td className='border-r border-gray-400'>ව්‍යාපෘතියකින්</td>
              <td className='border-r border-gray-400'>ඍජුව ලැබුන ප්‍රදානයක්</td>
              <td className='border-r border-gray-400'>තමාගේම මුදලක්</td>
              <td className='border-r border-gray-400'>ශ්‍රී ලංකා රජයෙන්</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              { applicationData.expenses_mainly_to_be_met == "විදේශ සම්පත් දෙපාර්තමේන්තුව මගින්" ? <td className='text-center border-r border-gray-400'><Check/></td> : <td className='border-r border-gray-400'></td>}
              { applicationData.expenses_mainly_to_be_met == "ව්‍යාපෘතියකින්" ? <td className='text-center border-r border-gray-400'><Check/></td> : <td className='border-r border-gray-400'></td>}
              { applicationData.expenses_mainly_to_be_met == "ඍජුව ලැබුණ ප්‍රදානයක්" ? <td className='flex justify-center border-r border-gray-400'><Check/></td> : <td className='border-r border-gray-400'></td>}
              { applicationData.expenses_mainly_to_be_met == "තමාගේම මුදලක්" ? <td className='text-center border-r border-gray-400'><Check/></td> : <td className='border-r border-gray-400'></td>}
              { applicationData.expenses_mainly_to_be_met == "ශ්‍රී ලංකා රජයෙන්" ? <td className='text-center border-r border-gray-400'><Check/></td> : <td className='border-r border-gray-400'></td>}
            </tr>
          </tbody>
        </table>
      </div>

    </div>
    
    <div className="grid grid-cols-12 ">
      <div className="col-span-1 font-medium  pl-10">
        <p className='mb-2'>5:5</p>
      </div>

      <div className="col-span-5 font-medium ">
        <p className='mb-2'>ශ්‍රී ලංකා රජයේ අරමුදලින් ලබාගන්නේ නම් එහි ස්වභාවය හා මුදල</p>
      </div>
    </div>

    <div className="grid grid-cols-12 mb-4 ">
      <div className="col-span-1 font-medium  pl-10">
        <p className='mb-2'></p>
      </div>

      <div className="col-span-11 ">
        <table className='w-full table border border-gray-400'>
          <thead>
            <tr className='border-b border-gray-400 text-xs text-center'>
              <td className='border-r border-gray-400'>ගුවන් ගමන්</td>
              <td className='border-r border-gray-400'>යැපීම් දීමනා</td>
              <td className='border-r border-gray-400'>පාඨමාලා ගාස්තු</td>
              <td className='border-r border-gray-400'>අතිරේක වියදම්</td>
              <td className='border-r border-gray-400'>වෙනත් පුද්ගලික වියදම්</td>
            </tr>
          </thead>
          <tbody>
            {
              applicationData.gosl_funds.map((row:any, i:number)=>(
                <tr key={i} className='border-b border-[#C4C6CF]'>
                  <td className='px-2 py-2 border-r border-gray-400'>{row.air_travel_amount}</td>
                  <td className='px-2 py-2 border-r border-gray-400'>{row.subsistence_amount}</td>
                  <td className='px-2 py-2 border-r border-gray-400'>{row.course_fees_amount}</td>
                  <td className='px-2 py-2 border-r border-gray-400'>{row.additional_expenses_amount}</td>
                  <td className='px-2 py-2 border-r border-gray-400'>{row.other_personal_expenses_amount}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>

    <div className="grid grid-cols-12 ">
      <div className="col-span-1 font-medium  pl-10">
        <p className='mb-2'>5:6</p>
        <p className='mb-2'>5:7</p>
        <p className='mb-2'>5:8</p>
        <p className='mb-2'>5:9</p>
        <p className='mb-2'>5:10</p>
        <p className='mb-2'>5:11</p>
      </div>

      <div className="col-span-5 font-medium ">
        <p className='mb-2'>විදේශ ණය / ව්‍යාපෘතිය යටතේ වන අරමුදලක් නම් ඒ පිළිබද විස්තර</p>
        <p className='mb-2'>පාඨමාලාව / පුහුණුව ආරම්භක දිනය</p>
        <p className='mb-2'>අවසාන දිනය</p>
        <p className='mb-2'>පිටත්වන දිනය සහ ආපසු පැමිණෙන දිනය</p>
        <p className='mb-2'>යන රටවල්</p>
        <p className='mb-2'>විදේශ ලිපිනය: දුරකතන, ෆැක්ස්, ඊමේල් අංක සහිතව</p>
      </div>

      <div className="col-span-6">
        <p className='mb-2'>{applicationData.foreign_loan_project_particulars_thereof}</p>
        <p className='mb-2'>{applicationData.commencement_date_of_trainig}</p>
        <p className='mb-2'>{applicationData.completion_date_of_trainig}</p>
        <p className='mb-2'>{applicationData.departure_date} , {applicationData.return_date}</p>
        <p className='mb-2'>{applicationData.country}</p>
        <p className='mb-2'>{applicationData.foreign_address}</p>
        <p className='mb-2'>{applicationData.foreign_phone}</p>
        <p className='mb-2'>{applicationData.foreign_fax}</p>
        <p className='mb-2'>{applicationData.foreign_email}</p>
      </div>
    </div>

    <div className="grid grid-cols-12 ">
      <div className="col-span-1 font-medium  pl-10">
        <p className='mb-2'>5:12</p>
      </div>

      <div className="col-span-5 font-medium ">
        <p className='mb-2'>පසුගිය නිල ගමනට අදාළ වාර්තාව ඉදිරිපත් කළේද?</p>
      </div>

      <div className="col-span-6">
        {
          applicationData.has_previous_trip_report_submitted == 1 ? <p className='mb-2'>ඔව්</p> : <p className='mb-2'>නැත</p>
        }
      </div>
    </div>
  </div>

  {/* Section 6*/}
  <div className=" mb-4 text-xs">
    <div className="grid grid-cols-12">
      <div className="col-span-1 font-medium  pl-10">
        <p className='mb-2'>6</p>
      </div>

      <div className="col-span-11 font-medium ">
        <p className='mb-2'>අයදුම්කරු පවත්නා වර්ෂයේදී සහ පසුගිය වර්ෂ 3 තුළ ගිය විදේශ ගමන් තොරතුරු</p>
      </div>
    </div>

    <div className="grid grid-cols-12">
      <div className="col-span-1 font-medium  pl-10">
        <p className='mb-2'></p>
      </div>

      <div className="col-span-11 ">
        <table className='w-full table border border-gray-400'>
          <thead>
            <tr className='border-b border-gray-400 text-xs text-center'>
              <td className='border-r border-gray-400'>වර්ෂය</td>
              <td className='border-r border-gray-400'>ගමනේ අරමුණු</td>
              <td className='border-r border-gray-400'>කාලය</td>
              <td className='border-r border-gray-400'>රට</td>
            </tr>
          </thead>
          <tbody>
            {
              applicationData.previous_travels.map((row:PreviousTravel, i:number)=>(
                <tr key={i} className='border-b border-[#C4C6CF]'>
                  <td className='px-2 py-2 border-r border-gray-400'>{row.year}</td>
                  <td className='px-2 py-2 border-r border-gray-400'>{row.purpose}</td>
                  <td className='px-2 py-2 border-r border-gray-400'>{row.period}</td>
                  <td className='px-2 py-2 border-r border-gray-400'>{row.country}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
    
  </div>

  {/* Section 6:1*/}
  <div className=" mb-4 text-xs">
    <div className="grid grid-cols-12">
      <div className="col-span-1 font-medium  pl-10">
        <p className='mb-2'>6:1</p>
      </div>

      <div className="col-span-5 font-medium ">
        <p className='mb-2'>මෙම කාලය තුළ අදාළ අමාත්‍යාංශයේ ගරු අමාත්‍යවරයා රටින් බැහැරව සිටින්නේද යන වග</p>
      </div>

      <div className="col-span-6">
        <p className='mb-2'>---</p>
      </div>
    </div>
  </div>
</div>
  )
}
