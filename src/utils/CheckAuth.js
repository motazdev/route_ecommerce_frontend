import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

export default function CheckAuth() {
    const { auth } = useAuth();
    const location = useLocation();

    return auth?.accessToken ? (
        <Navigate to="/login" state={{ from: location }} replace />
    ) : (
        <Outlet />
    );
}
