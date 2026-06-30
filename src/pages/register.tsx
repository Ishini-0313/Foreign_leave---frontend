import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../context/RegisterContext";

const steps = [
  { number: 1, label: "Personal Info" },
  { number: 2, label: "Official Info" },
  { number: 3, label: "Verify" },
];

export default function Register() {
  const [currentStep] = useState(1);

  const {formData, setFormData} = useRegister();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if(!formData.fullName.trim()){
      alert("Full name is required!");
      return;
    }

    if(!formData.nic.trim()){
      alert("NIC is required!");
      return;
    }

    if(!formData.mobile.trim()){
      alert("Phone number is required!");
      return;
    }

    if(!formData.email.trim()){
      alert("Email is required!");
      return;
    }

    navigate("/register_2");
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(0deg, #FAF9FD 0%, #FAF9FD 100%), #FFF",
      }}
    >
      {/* Header */}
      <header className="bg-white border-b border-[#C4C6CF]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-2">
          <img
            src="./public/images.png" alt="Sri Lanka Emblem" className="w-14 h-10"
          />
          <span className="text-xl font-bold text-[#002046] leading-7">
            Southern Provincial Government
          </span>
          {/* <button
            className="w-8 h-8 rounded-full border-2 border-[#002046] flex items-center justify-center text-[#002046] font-bold text-sm hover:bg-[#002046] hover:text-white transition-colors"
            aria-label="Help"
          >
            ?
          </button> */}
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center px-4 py-10">
        {/* Page title */}
        <div className="text-center mb-8">
          <h1 className="text-[28px] font-bold text-[#002046] leading-9 mb-1">
            User Registration
          </h1>
          <p className="text-sm text-[#44474E] leading-5">
            විදේශ නිවාඩු කළමනාකරණ පද්ධතිය - පරිශීලක ලියාපදිංචිය
          </p>
        </div>

        {/* Step indicator */}
        <div className="w-full max-w-175 mb-8">
          <div className="flex items-center justify-between relative">
            {/* Connector lines */}
            <div className="absolute top-5 left-0 right-0 flex items-center px-10 pointer-events-none">
              <div className="flex-1 h-px bg-[#C4C6CF]" />
              <div className="flex-1 h-px bg-[#C4C6CF]" />
            </div>

            {steps.map((step) => {
              const isActive = step.number === currentStep;
              const isDone = step.number < currentStep;
              return (
                <div
                  key={step.number}
                  className="flex flex-col items-center gap-2 z-10"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold leading-none border-2 transition-colors ${
                      isActive
                        ? "bg-[#002046] border-[#002046] text-white"
                        : isDone
                        ? "bg-[#002046] border-[#002046] text-white"
                        : "bg-[#F3F4F6] border-[#C4C6CF] text-[#6B7280]"
                    }`}
                  >
                    {step.number}
                  </div>
                  <span
                    className={`text-xs font-semibold leading-4 ${
                      isActive ? "text-[#002046]" : "text-[#6B7280]"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form card */}
        <div className="w-full max-w-175 bg-white rounded-lg border border-[#C4C6CF] shadow-sm mb-8">
          <div className="p-8">
            {/* Section header */}
            <h2 className="text-lg font-semibold text-[#002046] mb-4">
              පුද්ගලික තොරතුරු
            </h2>
            <hr className="border-[#C4C6CF] mb-6" />

            {/* Full Name */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-[#44474E] mb-2 leading-5">
                සම්පූර්ණ නම
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your name "
                className="w-full h-12 px-4 border border-[#C4C6CF] rounded bg-white text-sm text-[#1A1B1E] placeholder:text-[#9CA3AF] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
              />

            </div>

            {/* NIC + Mobile row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-medium text-[#44474E] mb-2 leading-5">
                  ජාතික හැදුනුම්පත් අංකය
                </label>
                <input
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  placeholder="e.g. 199012345678"
                  className="w-full h-12 px-4 border border-[#C4C6CF] rounded bg-white text-sm text-[#1A1B1E] placeholder:text-[#9CA3AF] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#44474E] mb-2 leading-5">
                  ජංගම දුරකතන අංකය
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="e.g. 0771234567"
                  className="w-full h-12 px-4 border border-[#C4C6CF] rounded bg-white text-sm text-[#1A1B1E] placeholder:text-[#9CA3AF] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
                />
              </div>
            </div>

            {/* Personal Email */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-[#44474E] mb-2 leading-5">
                පුද්ගලික විද්‍යුත් තැපෑල
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full h-12 px-4 border border-[#C4C6CF] rounded bg-white text-sm text-[#1A1B1E] placeholder:text-[#9CA3AF] outline-none focus:border-[#002046] focus:ring-1 focus:ring-[#002046] transition-colors"
              />
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="flex items-center gap-2 text-sm font-medium text-[#44474E] hover:text-[#002046] transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.828 7H16V9H3.828L9.192 14.364L7.778 15.778L0 8L7.778 0.222L9.192 1.636L3.828 7Z"
                    fill="currentColor"
                  />
                </svg>
                Back
              </Link>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 h-12 px-8 bg-[#002046] hover:bg-[#002d5c] text-white text-sm font-semibold rounded transition-colors"
              >
                Next
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.1458 7.5H0V5.83333H10.1458L5.47917 1.16667L6.66667 0L13.3333 6.66667L6.66667 13.3333L5.47917 12.1667L10.1458 7.5Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-4">
          {/* Secure SSL */}
          <div className="flex flex-col items-center gap-2 text-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L4 5V11C4 15.418 7.582 20 12 22C16.418 20 20 15.418 20 11V5L12 2Z"
                stroke="#002046"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M9 12L11 14L15 10"
                stroke="#002046"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <p className="text-sm font-bold text-[#1A1B1E] leading-5">
                Secure SSL
              </p>
              <p className="text-xs font-semibold text-[#44474E] leading-4">
                End-to-end encrypted data
              </p>
            </div>
          </div>

          {/* Official Gateway */}
          <div className="flex flex-col items-center gap-2 text-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L4 5V11C4 15.418 7.582 20 12 22C16.418 20 20 15.418 20 11V5L12 2Z"
                stroke="#002046"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="12" r="2" fill="#002046" />
            </svg>
            <div>
              <p className="text-sm font-bold text-[#1A1B1E] leading-5">
                Official Gateway
              </p>
              <p className="text-xs font-semibold text-[#44474E] leading-4">
                Authorized Govt. Access
              </p>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="flex flex-col items-center gap-2 text-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="#002046"
                strokeWidth="1.5"
              />
              <path
                d="M12 7V12L15 14"
                stroke="#002046"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <p className="text-sm font-bold text-[#1A1B1E] leading-5">
                24/7 Support
              </p>
              <p className="text-xs font-semibold text-[#44474E] leading-4">
                Help Desk available
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#C4C6CF]">
        <div className="max-w-zxl mx-auto px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-[#1A1B1E] leading-5 mb-0.5">
              Southern Provincial Government
            </p>
            <p className="text-xs font-semibold text-[#44474E] leading-4">
              © 2024 Southern Provincial Government of Sri Lanka. All Rights
              Reserved.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-xs font-semibold text-[#44474E] hover:text-[#002046] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs font-semibold text-[#44474E] hover:text-[#002046] transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/contact"
              className="text-xs font-semibold text-[#44474E] hover:text-[#002046] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
