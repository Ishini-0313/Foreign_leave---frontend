import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Topbar from "../components/topbar";

export default function Setting() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [role, setRole] =useState("");
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // get logged user
    useEffect(()=>{
        const storedUser = localStorage.getItem("user");
        if(!storedUser){
            navigate("/");
            return;
        }
        console.log("stored user" +storedUser);
        setUser(JSON.parse(storedUser));
    }, []);

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/profile",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            setProfile(res.data);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

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

    return (
        <div className="flex h-screen bg-[#FAF9FD] font-[Inter,sans-serif] overflow-hidden relative">
            {/* Sidebar */}
            {/* Mobile Overlay */}
            <Navbar
                user={user}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                />

            {/* Main Area */}
            <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
                {/* Top Header */}
                <Topbar
                    user={user}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto bg-[#FAF9FD]">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 pt-6 md:pt-10 pb-6 ">
                        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
                            <h3 className=" font-bold text-[#002046] mb-8">Change Profile Details</h3>
                            <div className="grid md:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <label>නම</label>
                                    <input className="w-full p-3 rounded border border-gray-300" value={profile?.full_name} onChange={(e)=>setProfile({...profile, full_name:e.target.value})}/>

                                </div>
                                <div>
                                    <label>පුද්ගලික විද්‍යුත් තැපෑල</label>
                                    <input  className="w-full p-3 rounded border border-gray-300" value={profile?.email} onChange={(e)=>setProfile({...profile, email:e.target.value})}/>
                                </div>
                                <div >
                                    <label>ජංගම දුරකතන අංකය</label>
                                    <input  className="w-full p-3 rounded border border-gray-300" value={profile?.phone} onChange={(e)=>setProfile({...profile, Phone:e.target.value})}/>
                                </div>
                                <div>
                                    <label>තනතුර</label>
                                    <input  className="w-full p-3 rounded border border-gray-300" value={profile?.designation} onChange={(e)=>setProfile({...profile, designation:e.target.value})}/>
                                </div>
                                {/* <div>
                                    <label>ආයතනය</label>
                                    <input  className="w-full p-3 rounded border border-gray-300" value={profile?.office?.name} onChange={(e)=>setProfile({...profile, office.name:e.target.value})}/>
                                </div> */}
                                {/* <div>
                                    <label>Role</label>
                                    <input disabled className=" w-full p-3 rounded bg-blue-100" value={profile?.role?.role_name}/>
                                </div> */}
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button className="border border-[#002046]  text-[#002046] hover:bg-[#002046] hover:text-white px-8 py-3 rounded"
                                    onClick={()=>navigate('/setting')}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="border-t border-[#C4C6CF] bg-white mt-2">
                        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
                            <p className="text-[#44474E] font-semibold text-xs leading-4">
                                © 2024 Southern Provincial Government of Sri Lanka. All Rights Reserved.
                            </p>
                            <nav className="flex items-center gap-6">
                                <a href="#" className="text-[#44474E] font-semibold text-xs leading-4 hover:text-[#002046] transition-colors">
                                    Privacy Policy
                                </a>
                                <a href="#" className="text-[#44474E] font-semibold text-xs leading-4 hover:text-[#002046] transition-colors">
                                    Terms of Service
                                </a>
                                <a href="#" className="text-[#44474E] font-semibold text-xs leading-4 hover:text-[#002046] transition-colors">
                                    Contact Support
                                </a>
                            </nav>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
}
