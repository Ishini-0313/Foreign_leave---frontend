import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async()=>{
    try{
      if(!username.trim()){
        alert("Username is required!");
        return;
      }
      if(!password.trim()){
        alert("Password is required!");
        return;
      }

      const response = await axios.post('http://127.0.0.1:8000/api/login',{
        username,password
      });

      alert(response.data.message);

      localStorage.setItem("token",response.data.token);
      // save user
      // localStorage.setItem("user", JSON.stringify(response.data.user));

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      console.log(response.data.user);

      navigate('/dashboard');
    }catch(error){
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(0deg, #FAF9FD 0%, #FAF9FD 100%), #FFF" }}>
      {/* Logo + Header */}
      <header className="bg-white border-b border-[#C4C6CF]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-2">
          <img
            src="./public/images.png" alt="Sri Lanka Emblem" className="w-14 h-10"
          />
          <span className="text-2xl font-semibold text-[#002046] leading-8 font-inter">
            Foreign Leave Management System
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md flex flex-col gap-4">
          {/* Card */}
          <div className="bg-white rounded-lg border border-[#C4C6CF] shadow-sm w-full">
            <div className="px-10 pt-10 pb-10 flex flex-col gap-0">
              {/*Heading */}
              <div className="flex flex-col items-center gap-2 mb-8">
                <div className="pt-2 flex flex-col items-center">
                  <h1 className="text-[32px] font-semibold text-[#1A1B1E] text-center leading-10 tracking-[-0.32px]">
                    Login
                  </h1>
                </div>
                <p className="text-base font-normal text-[#44474E] text-center leading-6">
                  Access the Southern Provincial Council Foreign Leave System
                </p>
              </div>

              {/* Username field */}
              <div className="flex flex-col gap-2 mb-6">
                <label className="text-sm font-medium text-[#44474E] leading-5 tracking-[0.14px]">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0ZM2 14H14V13.2C14 13.0167 13.9542 12.85 13.8625 12.7C13.7708 12.55 13.65 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5625 10.775 11.3375C9.85833 11.1125 8.93333 11 8 11C7.06667 11 6.14167 11.1125 5.225 11.3375C4.30833 11.5625 3.4 11.9 2.5 12.35C2.35 12.4333 2.22917 12.55 2.1375 12.7C2.04583 12.85 2 13.0167 2 13.2V14ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6Z" fill="#74777F"/>
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full h-12 pl-10 pr-4 border border-[#C4C6CF] rounded bg-white text-base text-[#1A1B1E] placeholder:text-[#6B7280] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="flex flex-col gap-2 mb-6">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-[#44474E] leading-5 tracking-[0.14px]">
                    Password
                  </label>
                  <button className="text-xs font-semibold text-[#002046] leading-4 hover:underline">
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 21C1.45 21 0.979167 20.8042 0.5875 20.4125C0.195833 20.0208 0 19.55 0 19V9C0 8.45 0.195833 7.97917 0.5875 7.5875C0.979167 7.19583 1.45 7 2 7H3V5C3 3.61667 3.4875 2.4375 4.4625 1.4625C5.4375 0.4875 6.61667 0 8 0C9.38333 0 10.5625 0.4875 11.5375 1.4625C12.5125 2.4375 13 3.61667 13 5V7H14C14.55 7 15.0208 7.19583 15.4125 7.5875C15.8042 7.97917 16 8.45 16 9V19C16 19.55 15.8042 20.0208 15.4125 20.4125C15.0208 20.8042 14.55 21 14 21H2ZM2 19H14V9H2V19ZM8 16C8.55 16 9.02083 15.8042 9.4125 15.4125C9.80417 15.0208 10 14.55 10 14C10 13.45 9.80417 12.9792 9.4125 12.5875C9.02083 12.1958 8.55 12 8 12C7.45 12 6.97917 12.1958 6.5875 12.5875C6.19583 12.9792 6 13.45 6 14C6 14.55 6.19583 15.0208 6.5875 15.4125C6.97917 15.8042 7.45 16 8 16ZM5 7H11V5C11 4.16667 10.7083 3.45833 10.125 2.875C9.54167 2.29167 8.83333 2 8 2C7.16667 2 6.45833 2.29167 5.875 2.875C5.29167 3.45833 5 4.16667 5 5V7ZM2 19V9V19Z" fill="#74777F"/>
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-12 pl-10 pr-12 border border-[#C4C6CF] rounded bg-white text-base text-[#1A1B1E] placeholder:text-[#6B7280] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#74777F] hover:text-[#44474E] transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 12C12.25 12 13.3125 11.5625 14.1875 10.6875C15.0625 9.8125 15.5 8.75 15.5 7.5C15.5 6.25 15.0625 5.1875 14.1875 4.3125C13.3125 3.4375 12.25 3 11 3C9.75 3 8.6875 3.4375 7.8125 4.3125C6.9375 5.1875 6.5 6.25 6.5 7.5C6.5 8.75 6.9375 9.8125 7.8125 10.6875C8.6875 11.5625 9.75 12 11 12ZM11 10.2C10.25 10.2 9.6125 9.9375 9.0875 9.4125C8.5625 8.8875 8.3 8.25 8.3 7.5C8.3 6.75 8.5625 6.1125 9.0875 5.5875C9.6125 5.0625 10.25 4.8 11 4.8C11.75 4.8 12.3875 5.0625 12.9125 5.5875C13.4375 6.1125 13.7 6.75 13.7 7.5C13.7 8.25 13.4375 8.8875 12.9125 9.4125C12.3875 9.9375 11.75 10.2 11 10.2ZM11 15C8.56667 15 6.35 14.3208 4.35 12.9625C2.35 11.6042 0.9 9.78333 0 7.5C0.9 5.21667 2.35 3.39583 4.35 2.0375C6.35 0.679167 8.56667 0 11 0C13.4333 0 15.65 0.679167 17.65 2.0375C19.65 3.39583 21.1 5.21667 22 7.5C21.1 9.78333 19.65 11.6042 17.65 12.9625C15.65 14.3208 13.4333 15 11 15ZM11 13C12.8833 13 14.6125 12.5042 16.1875 11.5125C17.7625 10.5208 18.9667 9.18333 19.8 7.5C18.9667 5.81667 17.7625 4.47917 16.1875 3.4875C14.6125 2.49583 12.8833 2 11 2C9.11667 2 7.3875 2.49583 5.8125 3.4875C4.2375 4.47917 3.03333 5.81667 2.2 7.5C3.03333 9.18333 4.2375 10.5208 5.8125 11.5125C7.3875 12.5042 9.11667 13 11 13Z" fill="#74777F"/>
                      </svg>
                    ) : (
                      <svg width="22" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 2L22 22M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8345 18.3765 17.2893 17.2893M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#74777F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.9 9.9C9.34524 10.4547 9 11.2132 9 12.05C9 13.7069 10.3431 15.05 12 15.05C12.8368 15.05 13.5953 14.7048 14.15 14.15" stroke="#74777F" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="button"
                onClick={handleLogin}
                className="w-full h-12 flex items-center justify-center gap-2 bg-[#002046] hover:bg-[#002d5c] text-white text-sm font-medium leading-5 tracking-[0.14px] rounded shadow-sm transition-colors mb-3"
              >
                Login to Dashboard
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.1458 7.5H0V5.83333H10.1458L5.47917 1.16667L6.66667 0L13.3333 6.66667L6.66667 13.3333L5.47917 12.1667L10.1458 7.5Z" fill="white"/>
                </svg>
              </button>

              {/* Register link */}
              <p className="text-center text-xs font-semibold leading-4 mb-6">
                <span className="text-[#44474E]">Create new account? </span>
                <Link to="/register" className="text-[#002046] hover:underline">
                  Register
                </Link>
              </p>

              {/* Divider + Footer note */}
              <div className="border-t border-[#C4C6CF] pt-6">
                <p className="text-xs font-semibold text-[#44474E] text-center leading-4">
                  Authorized Personnel Only.<br />
                  Contact IT Support for access issues.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy links */}
          <div className="flex items-center justify-center gap-4">
            <p className="text-xs font-semibold text-[#44474E] leading-4 hover:underline">
              Privacy Policy
            </p>
            <span className="text-[#C4C6CF] text-base leading-6">|</span>
            <p className="text-xs font-semibold text-[#44474E] leading-4 hover:underline">
              Security Standards
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#C4C6CF]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <p className="text-xs font-semibold text-[#44474E] leading-4">
            © 2024 Southern Provincial Government of Sri Lanka. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
