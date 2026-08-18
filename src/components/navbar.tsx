import {LayoutDashboard,FileText,FilePlusCorner,LogOut,Settings,Building2} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import ConfirmDialog from "./confirmDialog";
import { useEffect, useState } from "react";
import axios from "axios";

interface NavbarProps {
    user: any;
    sidebarOpen: boolean;
    setSidebarOpen: (value: boolean) => void;
}


export default function Navbar({user,sidebarOpen,setSidebarOpen}: NavbarProps) {
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [isOfficeAdmin, setIsOfficeAdmin] = useState<boolean>(false);
    const [adminOffices, setAdminOffices] = useState<any[]>([]);
    const navigate = useNavigate();

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };

    //Check whether logged user is an office admin
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }

        axios
            .get(
                "http://127.0.0.1:8000/api/my-admin-offices",
                axiosConfig
            )
            .then((response) => {
                setIsOfficeAdmin(
                    response.data?.is_admin === true
                );
                setAdminOffices(
                    Array.isArray(response.data?.offices)
                        ? response.data.offices
                        : []
                );
            })
            .catch((error) => {
                console.error(
                    "Failed to check office admin:",
                    error
                );
                setIsOfficeAdmin(false);
                setAdminOffices([]);
            });
    }, [user]);

    //Applicant navigation
    const applicantItems = [
        {
            label: "My Applications",
            icon: FileText,
            path: "/my-applications"
        },
        {
            label: "New Application",
            icon: FilePlusCorner,
            path: "/new-application"
        },
        {
            label: "Setting",
            icon: Settings,
            path: "/setting"
        }
    ];

    //Officer navigation
    const officerItems = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard"
        },
        {
            label: "My Applications",
            icon: FileText,
            path: "/my-applications"
        },
        {
            label: "New Application",
            icon: FilePlusCorner,
            path: "/new-application"
        },
        {
            label: "Setting",
            icon: Settings,
            path: "/setting"
        }
    ];

    //System Admin navigation
    const systemAdminItems = [
        {
            label: "Office Role Assignment",
            icon: Settings,
            path: "/admin/officer-assignments"
        },
        {
            label: "Setting",
            icon: Settings,
            path: "/setting"
        }
    ];

    //Admin(office) navigation
    const officeManagementItem = {
        label: "Office Management",
        icon: Building2,
        path: "/admin/officer-assignments"
    };


    
    //Select items based on main role
    let items: any[];

    if (user?.role?.role_name === "Applicant") {
        items = applicantItems;
    }
    else if (user?.role?.role_name === "System Admin") {
        items = systemAdminItems;
    }
    else {
        items = officerItems;
    }


    
    //Add Office Management for office admin
    if (isOfficeAdmin) {
        items = [
            ...items,
            officeManagementItem
        ];
    }

    //Logout
    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };


    return (

        <>

            {/* Mobile overlay */}

            {sidebarOpen && (

                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />

            )}


            {/* Sidebar */}

            <aside
                className={`
                    fixed lg:static
                    top-0 left-0 z-50
                    h-full w-64
                    border-r border-[#C4C6CF]
                    bg-[#1B365D]
                    overflow-y-auto
                    flex flex-col
                    transform transition-transform duration-300

                    ${
                        sidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full lg:translate-x-0"
                    }
                `}
            >

                {/* Logo */}

                <div className="px-4 pt-8 pb-10">

                    <div className="flex items-center gap-3">

                        <img
                            src="/Emblem_of_Sri_Lanka.svg"
                            alt="Government Seal"
                            className="w-10 rounded-sm shrink-0"
                        />

                        <div>

                            <p className="text-white font-bold text-sm leading-[17.5px] tracking-[0.14px]">

                                Southern Provincial Council

                            </p>

                            <p className="text-[#87A0CD] font-semibold text-[10px] leading-3.75 tracking-[0.5px] uppercase mt-0.5">

                                Government of Sri Lanka

                            </p>

                        </div>

                    </div>

                </div>


                {/* Navigation */}

                <nav className="flex flex-col gap-1 px-2 flex-1">

                    {items.map((item) => {

                        const Icon = item.icon;

                        return (

                            <NavLink
                                key={item.label}
                                to={item.path}

                                onClick={() => {

                                    setSidebarOpen(false);

                                }}

                                className={({ isActive }) =>
                                    `
                                    flex items-center gap-3
                                    px-4 py-3
                                    rounded-sm
                                    transition-colors

                                    ${
                                        isActive
                                            ? "bg-[#4381d7] text-white"
                                            : "text-white hover:bg-[#E8E7EC] hover:text-[#1B365D]"
                                    }
                                    `
                                }
                            >

                                <Icon size={20} />

                                <span className="font-medium text-sm leading-5 tracking-[0.14px]">

                                    {item.label}

                                </span>

                            </NavLink>

                        );

                    })}


                    {/* Logout */}

                    <div className="mt-auto mb-2 border-t border-[#35527d]">

                        <button
                            onClick={() => setShowConfirm(true)}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-white hover:bg-red-400 transition-colors"
                        >

                            <LogOut size={20} />

                            <span className="font-medium text-sm leading-5 tracking-[0.14px]">

                                Logout

                            </span>

                        </button>

                    </div>

                </nav>

            </aside>


            {/* Logout confirmation */}

            {showConfirm && (

                <ConfirmDialog

                    message="Are you sure you want to logout?"

                    onCancel={() =>
                        setShowConfirm(false)
                    }

                    onConfirm={() => {

                        handleLogout();

                        setShowConfirm(false);

                    }}

                />

            )}

        </>

    );

}