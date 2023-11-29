import React from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Navbar } from "../../components/AdminDashboard/Navbar.jsx";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
export const AdminLayout = () => {
  let location = useLocation();
  let currentLink = "";
  const crumbs = location.pathname
    .split("/")
    .filter((c) => c !== "")
    .map((title, i) => {
      currentLink += `/${title}`;

      return (
        <div className="crumb flex flex-row items-center text-gray-500" key={i}>
          <Link to={currentLink}>
            {title === "admin" ? (
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 mr-2"
              >
                <path
                  d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <p>
                {title
                  .replace("-", " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </p>
            )}
          </Link>
          {i !==
            location.pathname.split("/").filter((c) => c !== "").length - 1 && (
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          )}
        </div>
      );
    });

  return (
    <div className="admin-dashboard">
      <Toaster />
      <div className="flex flex-row">
        <Sidebar classes={"md:block hidden fixed"} />
        <div className="dashboard-content md:ml-64 w-full">
          <Navbar />
          <div className="md__content bg-gray-100 h-[100vh]">
            {currentLink.split("/").filter((c) => c !== "").length !== 1 && (
              <div className="BreadCrumb text-s p-5 flex text-gray-500 flex-row gap-2">
                {crumbs}
              </div>
            )}

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
