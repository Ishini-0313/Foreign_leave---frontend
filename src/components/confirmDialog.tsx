import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({
    message,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-lg shadow-xl p-6 w-96 text-center">

                <AlertTriangle
                    className="mx-auto text-yellow-500 mb-4"
                    size={50}
                />

                <h2 className="text-xl font-semibold mb-3">
                    Confirm Action
                </h2>

                <p className="text-gray-600 mb-6">
                    {message}
                </p>


                <div className="flex justify-center gap-4">

                    <button
                        onClick={onCancel}
                        className="px-5 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>


                    <button
                        onClick={onConfirm}
                        className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Yes
                    </button>

                </div>

            </div>

        </div>
    );
}