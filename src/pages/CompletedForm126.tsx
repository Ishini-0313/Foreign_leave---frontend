import axios from "axios";
import { Download, FileText, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CompletedForm126() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPdf = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/applications/${id}/completed-form-126`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`,
                        },
                        responseType: "blob",
                    }
                );

                const blob = new Blob(
                    [response.data],
                    { type: "application/pdf" }
                );
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
            } catch (err) {
                console.error(err);
                setError("Unable to load the completed Form 16.");
            } finally {
                setLoading(false);
            }
        };

        loadPdf();

        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [id]);


    const downloadPdf = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/applications/${id}/completed-form-126/download`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`,
                    },
                    responseType: "blob",
                }
            );

            const blob = new Blob(
                [response.data],
                { type: "application/pdf" }
            );

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `Form_126_${id}.pdf`;
            document.body.appendChild(link);

            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            alert("Failed to download Form 126.");
        }
    };


    return (
        <div className="flex flex-col h-screen bg-[#FAF9FD]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-white border-b">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 rounded-md hover:bg-gray-100"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div className="flex items-center gap-2">
                            <FileText
                                className="text-[#002046]"
                                size={24}
                        />
                        <div>
                            <h2 className="text-lg font-semibold text-[#002046]">
                                Completed Form 16
                            </h2>
                            <p className="text-sm text-gray-500">
                                Approved application
                            </p>
                        </div>
                    </div>
                </div>

                {pdfUrl && (
                    <button
                        onClick={downloadPdf}
                        className="flex items-center gap-2 px-4 py-2 bg-[#002046] text-white rounded-md hover:bg-[#001530]"
                    >
                        <Download size={18} />
                        Download PDF
                    </button>
                )}
            </div>


            {/* PDF */}
            <div className="flex-1 bg-gray-100">
                {loading && (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">
                            Loading completed Form 16...
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-red-500">
                            {error}
                        </p>
                    </div>
                )}

                {!loading && !error && pdfUrl && (
                    <iframe
                        src={pdfUrl}
                        title="Completed Form 16"
                        className="w-full h-full border-0"
                    />
                )}
            </div>
        </div>
    );
}
