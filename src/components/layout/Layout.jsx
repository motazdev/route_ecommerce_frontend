import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Footer } from "./Footer";
import { Toaster } from "sonner";

export const Layout = () => {
  return (
    <div className="users-app bg-gray-100">
      <Toaster richColors expand={true} />

      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
