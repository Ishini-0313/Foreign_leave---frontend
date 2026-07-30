import axios from "axios";
import { useState } from "react";

export default function ForgotPassword() {
    const [email,setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = async(e:any)=>{
        e.preventDefault();
        setMessage("");
        setError("");
        try{
            const response = await axios.post(
                "http://127.0.0.1:8000/api/forgot-password",{email:email}
            );
            console.log("Response:", response.data);
            setMessage(response.data.message);
        }catch(error:any){
            console.error("Forgot password error:", error);
            setError(error.response?.data?.message || "Error sending reset email");
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">ForgotPassword</h2>
            <p className="text-center text-gray-600 mb-6">
                    Enter your email address and we’ll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
                    <input id="email" type='email' placeholder='Enter your email' value={email} required onChange={(e)=>setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                </div>
                <button type="submit" className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition">Send Reset Link</button>
            </form>
            {message && (
                    <p className="text-center text-green-500 mt-4">{message}</p>
            )}
            {error && (
                    <p className="text-center text-red-500 mt-4">{error}</p>
            )}
            <p className="text-center text-gray-500 mt-6">
                    Remembered your password?{" "}
                    <a href='/' className="text-blue-500 font-semibold hover:underline">
                        Login
                    </a>
            </p>
        </div>
    </div>
  )
}