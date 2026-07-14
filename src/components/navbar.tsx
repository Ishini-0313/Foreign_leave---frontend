import { LayoutDashboard, FileText, FilePlusCorner} from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface navbarProps{
    user: any;
    sidebarOpen: boolean;
    setSidebarOpen: (value: boolean) => void;
}

export default function Navbar({user, sidebarOpen, setSidebarOpen}:navbarProps) {
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
      }
    ];

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
      }
    ];

    const items = user?.role?.role_name === "Applicant"? applicantItems : officerItems;

    return(
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <aside className={`
                fixed lg:static
                top-0 left-0 z-50
                h-full w-64
                border-r border-[#C4C6CF]
                bg-[#F4F3F7]
                overflow-y-auto
                transform transition-transform duration-300
                ${
                sidebarOpen
                    ? "translate-x-0"
                    : "-translate-x-full lg:translate-x-0"
                }
            `}>
            <div className="px-4 pt-8 pb-10">
                <div className="flex items-center gap-3">
                <img
                    src="./public/images.png"
                    alt="Government Seal"
                    className="w-12 h-10 rounded-sm shrink-0"
                />
                <div>
                    <p className="text-[#002046] font-bold text-sm leading-[17.5px] tracking-[0.14px]">
                    Southern Provincial Council
                    </p>
                    <p className="text-[#44474E] font-semibold text-[10px] leading-3.75 tracking-[0.5px] uppercase mt-0.5">
                    Government of Sri Lanka
                    </p>
                </div>
                </div>
            </div>

            <nav className="flex flex-col gap-1 px-2 flex-1">
                {items.map((item) => (
                <NavLink
                    key={item.label}
                    to={item.path}
                    className={({isActive})=>`flex items-center gap-3 px-4 py-3 rounded-sm] transition-colors ${
                    isActive
                        ? "bg-[#1B365D] text-[#87A0CD]"
                        : "text-[#44474E] hover:bg-[#E8E7EC]"
                    }`}
                >
                    <item.icon size={20} />
                    <span className="font-medium text-sm leading-5 tracking-[0.14px]">
                    {item.label}
                    </span>
                </NavLink>
                ))}
            </nav>
            </aside>
        </>
    );
}
