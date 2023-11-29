import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { ProfileSidebar } from "../Sidebar/ProfileSidebar";
import Navbar from "./Navbar";
import { Toaster } from "sonner";
import { ProfileFooter } from "../Footers/ProfileFooter";
import { List, Repeat2, User2 } from "lucide-react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export const ProfileLayout = () => {
  return (
    <>
      <div className="profile-page bg-gray-200 flex min-h-[calc(100vh-64px)]">
        <ProfileSidebar />
        <div className="lg:ml-72 flex flex-1">
          <main className="pb-4 flex flex-col flex-1 justify-between ">
            <Navbar />
            <div className="flex flex-col flex-1">
              <div className="lg:px-8 mt-8 sm:px-6 px-2 flex-auto">
                <div className=" rounded-xl overflow-hidden relative">
                  {/* Mobile Sidebar */}
                  <div className="lg:px-8 sm:px-6 pt-2 px-4 bg-white mb-2 flex justify-center lg:hidden items-center">
                    <div className="max-w-7xl mx-auto">
                      <div>
                        <div className="sm:block">
                          <div className="border-b-[1px]">
                            <nav className="flex gap-x-4 -mb-px">
                              <NavLink
                                to="/profile"
                                className={({ isActive, isPending }) =>
                                  classNames(
                                    isActive
                                      ? "text-indigo-500 border-b-2 border-solid border-indigo-500"
                                      : "",
                                    "font-medium  text-sm py-4 px-1 border-transparent border-b-2 items-center inline-flex"
                                  )
                                }
                              >
                                <User2 className="w-5 h-5 mr-2 -ml-0.5" />
                                <span>Profile</span>
                              </NavLink>
                              <NavLink
                                to="/wishlist"
                                className={({ isActive, isPending }) =>
                                  classNames(
                                    isActive
                                      ? "text-indigo-500 border-b-2 border-solid border-indigo-500"
                                      : "",
                                    "font-medium  text-sm py-4 px-1 border-transparent border-b-2 items-center inline-flex"
                                  )
                                }
                              >
                                <List className="w-5 h-5 mr-2 -ml-0.5" />

                                <span>Wishlist</span>
                              </NavLink>
                              <NavLink
                                to="/returns"
                                className={({ isActive, isPending }) =>
                                  classNames(
                                    isActive
                                      ? "text-indigo-500 border-b-2 border-solid border-indigo-500"
                                      : "",
                                    "font-medium  text-sm py-4 px-1 border-transparent border-b-2 items-center inline-flex"
                                  )
                                }
                              >
                                <Repeat2 className="w-5 h-5 mr-2 -ml-0.5" />

                                <span>Returns</span>
                              </NavLink>
                            </nav>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white py-4 px-4">
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <Toaster richColors />
      </div>
      <ProfileFooter />
    </>
  );
};
