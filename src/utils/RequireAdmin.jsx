import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

export default function RequireAdmin() {
  const { auth } = useAuth();
  const location = useLocation();
  console.log("AUTH auth to require admin > ", auth);
  return auth?.accessToken && auth?.userData.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
