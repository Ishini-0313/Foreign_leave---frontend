import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FileSpreadsheet, Download } from "lucide-react";
import Topbar from "../components/topbar";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

export default function AnnualReport() {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
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

    const handleGenerate = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://127.0.0.1:8000/api/reports/annual-foreign-leave",
                {
                    params: {
                        year: year
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    responseType: "blob"
                }
            );

            const blob = new Blob(
                [response.data],
                {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                }
            );

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;

            link.download =
                `Foreign_Leave_Annual_Report_${year}.xlsx`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

            toast.success(
                `${year} annual report generated successfully.`
            );

        } catch (error: any) {

            console.error(error);

            toast.error(
                "Failed to generate annual report."
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-[#FAF9FD] font-[Inter,sans-serif] overflow-hidden relative">
            <Navbar
                user={user}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
                <Topbar
                    user={user}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="flex-1 px-4 sm:px-6 py-6 space-y-8 overflow-y-auto">
                    <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                    <FileSpreadsheet size={28}  className="text-[#002046]"/>
                    <div>
                        <h1 className="text-xl font-semibold text-[#002046]">
                            Annual Foreign Leave Report
                        </h1>
                        <p className="text-sm text-gray-500">
                            Generate annual foreign leave records
                        </p>
                    </div>
                </div>

                <div className="max-w-sm">
                    <label className="block text-sm font-medium mb-2">
                        Select Year
                    </label>
                    <select
                        value={year}
                        onChange={(e) =>
                            setYear(Number(e.target.value))
                        }
                        className="w-full border rounded-lg px-4 py-3"
                    >
                        {Array.from(
                            { length: currentYear - 2019 },
                            (_, index) => currentYear - index
                        ).map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="mt-5 w-full flex items-center justify-center gap-2 bg-[#002046]  text-white  px-5  py-3  rounded-lg hover:bg-[#00366f] disabled:opacity-50">
                        <Download size={18} />
                        {loading ? "Generating..." : "Generate Excel"}
                    </button>
                </div>
            </div>
        </div>
                </main>

            </div>
        </div>
        
    );
}