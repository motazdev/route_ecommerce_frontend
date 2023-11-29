import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function NavbarHandler({ children }) {
  let location = useLocation();
  const [showNav, setShowNav] = useState(null);
  useEffect(() => {
    if (
      location.pathname === "/register" ||
      location.pathname === "/login" ||
      location.pathname === "/confirm-email" ||
      location.pathname === "/admin/new" ||
      location.pathname === "/admin"
    ) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [location.pathname]);

  return <div>{showNav && children}</div>;
}
