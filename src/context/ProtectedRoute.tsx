import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    allowedRoles: string[];
}

const ProtectedRoute = ({
    allowedRoles,
}: ProtectedRouteProps) => {
    const {
        user,
        isAuthenticated,
        loading,
    } = useAuth();

    // Wait until authentication is checked
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">
                    Loading...
                </p>
            </div>
        );
    }

    // User is not logged in
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    const roleName = user?.role?.role_name;

    // User doesn't have permission
    if (!roleName || !allowedRoles.includes(roleName)) {
        return (
            <Navigate
                to="/unauthorized"
                replace
            />
        );
    }

    // User is authorized
    return <Outlet />;
};

export default ProtectedRoute;