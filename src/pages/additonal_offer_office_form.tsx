import { useEffect, useState } from 'react'
import Navbar from '../components/navbar';
import Topbar from '../components/topbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ChevronRight() {
  return (
    <svg width="5" height="7" viewBox="0 0 5 7" fill="none">
      <path d="M2.68333 3.5L0 0.816667L0.816667 0L4.31667 3.5L0.816667 7L0 6.18333L2.68333 3.5Z" fill="#44474E" />
    </svg>
  );
}

export default function additonalOfferOfficeForm() {
    const {id} = useParams();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [applicationData, setApplicationData]= useState<any>(null);

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
        <Navbar
                user={user}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />

        <div className='flex flex-col flex-1 min-w-0 h-full overflow-hidden'>
            <Topbar
                user={user}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <main className="flex-1 px-4 sm:px-6 py-6 space-y-8 overflow-y-auto">
                <div>
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 mb-3">
                    <span className="text-[#44474E] text-xs font-semibold leading-4">Home</span>
                    <ChevronRight />
                    <span className="text-[#44474E] text-xs font-semibold leading-4">Leave Request</span>
                    <ChevronRight />
                    <span className="text-[#44474E] text-xs font-semibold leading-4">{applicationData?.application_no}</span>
                    <ChevronRight />
                    <span className="text-[#002046] text-xs font-semibold leading-4">Uploaded Documents</span>
                    </nav>
                </div>

                <div className="space-y-4 ">
                    <div>
                        <p>මු.අ.චක්‍රලේඛ 01/2015/01 හි 03 අ කොටස අනුව සහ 2023.03.20 දිනැති සංශෝධනය අනුව හිමිවිය යුතු දීමනාව</p>
                        <p>(ඇ.එ.ජ.ඩො. 25 බැගින් උපරිම දින 15ක් දක්වා)</p>
                        <p>ඇ.එ.ජ.ඩො. 25 * දින ....... = ඇ.එ.ජ.ඩො. ........</p>
                    </div>

                    <div>
                        <p>මු.අ.චක්‍රලේඛ 01/2015/01 හි 03 ආ කොටස අනුව සහ 2023.03.20 දිනැති සංශෝධනය අනුව හිමිවිය යුතු දීමනාව</p>
                        <p>(ඇ.එ.ජ.ඩො. 40 බැගින් උපරිම දින 10ක් දක්වා)</p>
                        <p>ඇ.එ.ජ.ඩො. 40 * දින ....... = ඇ.එ.ජ.ඩො. ........</p>
                    </div>

                    <div>
                        <p>මු.අ.චක්‍රලේඛ 01/2015/01 හි 04 ඉ කොටස අනුව සහ 2023.03.20 දිනැති සංශෝධනය අනුව හිමිවිය යුතු දීමනාව</p>
                        <p>(ඇ.එ.ජ.ඩො. 25 බැගින් උපරිම දින 10ක් දක්වා)</p>
                        <p>ඇ.එ.ජ.ඩො. 25 * දින ....... = ඇ.එ.ජ.ඩො. ........</p>
                    </div>
                </div>
            </main>
        </div>
      </div>
  )
}
