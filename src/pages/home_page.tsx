import { useState } from "react";
import { Link } from "react-router-dom";
import {Menu,X,FileText,SearchCheck,UploadCloud,CheckCircle2,ShieldCheck,ArrowRight,Phone,Mail,MapPin,Clock,ChevronRight,} from "lucide-react";

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: FileText,
      title: "Submit Applications",
      description:"Submit your foreign leave application through a simple online application form.",
    },
    {
      icon: SearchCheck,
      title: "Track Application Status",
      description:"Check the current status and progress of your foreign leave application at any time.",
    },
    {
      icon: UploadCloud,
      title: "Upload Documents",
      description:"Upload the required supporting documents securely according to your leave category.",
    },
    {
      icon: CheckCircle2,
      title: "Online Approval",
      description:"Applications are reviewed and processed through the relevant approval workflow.",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Login",
      description:"Sign in using your assigned username and password.",
    },
    {
      number: "02",
      title: "Submit Application",
      description:"Complete the application form and upload required documents.",
    },
    {
      number: "03",
      title: "Application Review",
      description:"Responsible officers review and process your application.",
    },
    {
      number: "04",
      title: "Final Approval",
      description:"The application is processed through the relevant approval workflow.",
    },
  ];

  const requiredDocuments = [
    "Invitation letter",
    "Service confirmation",
    "Passport copy",
    "Flight details",
    "Request letter",
    "Duty cover letter",
    "Disciplinary clearance",
  ];

  return (
    <div className="min-h-screen bg-[#FAF9FD] text-[#002046]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          {/* Logo and System Name */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl  text-white ">
              <img src="./public/images.png"/>
              {/* <ShieldCheck size={28} /> */}
            </div>

            <div>
              <h1 className="text-sm font-bold leading-tight text-[#002046] sm:text-base">
                Foreign Leave
                <br />
                Management System
              </h1>

              <p className="text-xs text-slate-500">
                Southern Provincial Council
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            <a
              href="#home"
              className="text-sm font-semibold text-[#002046] transition hover:text-blue-600"
            >
              Home
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              About
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              How It Works
            </a>

            <a
              href="#instructions"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Instructions
            </a>

            <a
              href="#contact"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Contact
            </a>

            <Link
              to="/login"
              className="rounded-lg bg-[#002046] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#00366f]"
            >
              Login
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-[#002046] transition hover:bg-slate-100 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
            <div className="flex flex-col gap-4">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-[#002046]"
              >
                Home
              </a>

              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-600"
              >
                About
              </a>

              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-600"
              >
                How It Works
              </a>

              <a
                href="#instructions"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-600"
              >
                Instructions
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-600"
              >
                Contact
              </a>

              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-fit rounded-lg bg-[#002046] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Login
              </Link>
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="relative overflow-hidden bg-gradient-to-br from-[#002046] via-[#00366f] to-[#00558f]"
        >
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-blue-300/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
            {/* Hero Text */}
            <div className="text-white">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium text-blue-100">
                <ShieldCheck size={16} />
                Southern Provincial Council
              </div>

              <h2 className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Foreign Leave
                <span className="block text-blue-200">
                  Management System
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-blue-100 sm:text-lg">
                A centralized digital platform for submitting, processing,
                tracking, and approving foreign leave applications within the
                Southern Provincial Council.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-[#002046] shadow-lg transition hover:bg-blue-50"
                >
                  Login to System
                  <ArrowRight size={18} />
                </Link>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  How It Works
                  <ChevronRight size={18} />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-5 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} />
                  Online Applications
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} />
                  Application Tracking
                </div>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="relative mx-auto w-full max-w-lg">
              <div className="rounded-3xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur">
                <div className="rounded-2xl bg-white p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        Foreign Leave System
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-[#002046]">
                        Application Overview
                      </h3>
                    </div>

                    <div className="rounded-xl bg-blue-100 p-3 text-[#002046]">
                      <FileText size={24} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-blue-50 p-4">
                      <p className="text-xs text-slate-500">Applications</p>
                      <p className="mt-2 text-2xl font-bold text-[#002046]">
                        24
                      </p>
                    </div>

                    <div className="rounded-xl bg-emerald-50 p-4">
                      <p className="text-xs text-slate-500">Approved</p>
                      <p className="mt-2 text-2xl font-bold text-emerald-700">
                        18
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-[#002046]">
                        Application Progress
                      </p>

                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                        In Progress
                      </span>
                    </div>

                    <div className="mt-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                          <CheckCircle2 size={17} />
                        </div>

                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-700">
                            Application Submitted
                          </p>
                          <p className="text-xs text-slate-500">
                            Completed
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-[#002046]">
                          <SearchCheck size={17} />
                        </div>

                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-700">
                            Officer Review
                          </p>
                          <p className="text-xs text-slate-500">
                            Current step
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                          <CheckCircle2 size={17} />
                        </div>

                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-400">
                            Final Approval
                          </p>
                          <p className="text-xs text-slate-400">
                            Pending
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-emerald-100 p-2 text-emerald-700">
                    <CheckCircle2 size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Digital Processing
                    </p>
                    <p className="text-sm font-bold text-[#002046]">
                      Faster & Organized
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              About the System
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-[#002046] sm:text-4xl">
              A Smarter Way to Manage Foreign Leave
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              The Foreign Leave Management System helps employees and
              government officers manage foreign leave applications through a
              centralized digital platform. It improves transparency,
              simplifies document handling, and allows users to track the
              progress of applications.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-[#002046]">
                    <Icon size={25} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#002046]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="bg-white py-20"
        >
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                Process
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-[#002046] sm:text-4xl">
                How the System Works
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Follow these simple steps to submit and process your foreign
                leave application.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <div key={step.number} className="relative">
                  <div className="h-full rounded-2xl border border-slate-200 bg-[#FAF9FD] p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-4xl font-extrabold text-blue-200">
                        {step.number}
                      </span>

                      {index !== processSteps.length - 1 && (
                        <ArrowRight
                          size={22}
                          className="hidden text-blue-400 lg:block"
                        />
                      )}
                    </div>

                    <h3 className="mt-6 text-lg font-bold text-[#002046]">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instructions and Documents */}
        <section
          id="instructions"
          className="mx-auto max-w-7xl px-5 py-20 lg:px-8"
        >
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Instructions */}
            <div className="rounded-3xl bg-[#002046] p-8 text-white shadow-xl">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-200">
                Before You Apply
              </p>

              <h2 className="mt-3 text-3xl font-extrabold">
                Important Instructions
              </h2>

              <p className="mt-5 leading-8 text-blue-100">
                Please ensure that the following information is ready before
                submitting your application.
              </p>

              <ul className="mt-7 space-y-4">
                <li className="flex gap-3">
                  <CheckCircle2
                    size={21}
                    className="mt-1 shrink-0 text-blue-200"
                  />
                  <span className="text-sm leading-7 text-blue-100">
                    Make sure your personal and service details are correct.
                  </span>
                </li>

                <li className="flex gap-3">
                  <CheckCircle2
                    size={21}
                    className="mt-1 shrink-0 text-blue-200"
                  />
                  <span className="text-sm leading-7 text-blue-100">
                    Select the correct foreign leave category.
                  </span>
                </li>

                <li className="flex gap-3">
                  <CheckCircle2
                    size={21}
                    className="mt-1 shrink-0 text-blue-200"
                  />
                  <span className="text-sm leading-7 text-blue-100">
                    Prepare all required supporting documents.
                  </span>
                </li>

                <li className="flex gap-3">
                  <CheckCircle2
                    size={21}
                    className="mt-1 shrink-0 text-blue-200"
                  />
                  <span className="text-sm leading-7 text-blue-100">
                    Upload clear and readable documents.
                  </span>
                </li>

                <li className="flex gap-3">
                  <CheckCircle2
                    size={21}
                    className="mt-1 shrink-0 text-blue-200"
                  />
                  <span className="text-sm leading-7 text-blue-100">
                    Review the application before clicking Submit.
                  </span>
                </li>
              </ul>

              <Link
                to="/login"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#002046] transition hover:bg-blue-50"
              >
                Start Application
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Required Documents */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                Preparation Checklist
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-[#002046]">
                Required Documents
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Prepare the relevant documents before starting your
                application. Required documents may differ according to the
                selected leave category.
              </p>

              <div className="mt-7 space-y-3">
                {requiredDocuments.map((document) => (
                  <div
                    key={document}
                    className="flex items-center gap-3 rounded-xl bg-[#FAF9FD] px-4 py-3"
                  >
                    <CheckCircle2
                      size={19}
                      className="shrink-0 text-emerald-600"
                    />

                    <span className="text-sm font-medium text-slate-700">
                      {document}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-xs leading-6 text-slate-500">
                Note: The exact documents required will be displayed
                according to the selected application category.
              </p>
            </div>
          </div>
        </section>

        {/* Notice Section */}
        <section className="bg-blue-50 py-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-blue-700">
                <Clock size={18} />
                Important Notice
              </div>

              <h3 className="mt-2 text-xl font-bold text-[#002046]">
                Check all required information before submitting your
                application.
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                Incomplete applications may be returned for corrections.
              </p>
            </div>

            <Link
              to="/login"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#002046] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#00366f]"
            >
              Login Now
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="mx-auto max-w-7xl px-5 py-20 lg:px-8"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Contact Us
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-[#002046] sm:text-4xl">
              Need Assistance?
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Contact the relevant office for assistance with foreign leave
              applications and system-related issues.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-[#002046]">
                <MapPin size={23} />
              </div>

              <h3 className="mt-4 font-bold text-[#002046]">
                Office Address
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                SH Dahanayake Mw, Galle
                <br />
                Sri Lanka
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-[#002046]">
                <Phone size={23} />
              </div>

              <h3 className="mt-4 font-bold text-[#002046]">
                Telephone
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                (+94) 091 4119011
                <br />
                Please contact the relevant office
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-[#002046]">
                <Mail size={23} />
              </div>

              <h3 className="mt-4 font-bold text-[#002046]">
                Email
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                chiefsec1@sltnet.lk
                <br />
                Available during office hours
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#00152f] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3 lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <ShieldCheck size={25} />
              </div>

              <div>
                <h3 className="font-bold">
                  Foreign Leave Management System
                </h3>

                <p className="text-xs text-blue-200">
                  Southern Provincial Council
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-7 text-blue-200">
              A centralized platform for managing foreign leave applications
              and approval processes.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Quick Links</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-blue-200">
              <a href="#home" className="transition hover:text-white">
                Home
              </a>

              <a href="#about" className="transition hover:text-white">
                About
              </a>

              <a
                href="#how-it-works"
                className="transition hover:text-white"
              >
                How It Works
              </a>

              <a
                href="#instructions"
                className="transition hover:text-white"
              >
                Instructions
              </a>

              <Link
                to="/login"
                className="transition hover:text-white"
              >
                Login
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold">System Information</h3>

            <div className="mt-4 space-y-3 text-sm text-blue-200">
              <p>Online Foreign Leave Application System</p>
              <p>Role-based application processing</p>
              <p>Application tracking and approval</p>
              <p>Version 1.0</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-center text-xs text-blue-200 sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-8">
            <p>
              © 2026 Southern Provincial Council. All rights reserved.
            </p>

            <p>Foreign Leave Management System</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;