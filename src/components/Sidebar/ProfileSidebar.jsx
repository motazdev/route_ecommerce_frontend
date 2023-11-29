import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import useAuth from "../../hooks/useAuth";
import { Link, NavLink } from "react-router-dom";
import {
  List,
  ListTodo,
  Repeat,
  Repeat2,
  ShoppingCart,
  User2,
} from "lucide-react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export const ProfileSidebar = () => {
  const { auth } = useAuth();

  return (
    <div className="lg:flex-col lg:w-72 lg:flex lg:z-10 overflow-hidden lg:fixed hidden">
      <div className="  bg-white flex-col flex-grow flex rounded-md pt-20">
        <div className="items-center flex px-5">
          <svg
            data-icon-name="bag-alt-1"
            data-style="line-color"
            icon_origin_id="17501"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Line Color"
            id="bag-alt-1"
            className="icon line-color"
            width="70"
            height="70"
          >
            <path
              style={{
                fill: "none",
                stroke: "rgb(140, 117, 252)",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 1,
              }}
              d="M12,17V13M8,17V13m8,4V13"
              id="secondary"
            ></path>
            <path
              style={{
                fill: "none",
                stroke: "rgb(55, 48, 163)",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 1,
              }}
              d="M18.15,21H5.85a1,1,0,0,1-1-.84L3,9H21L19.14,20.16A1,1,0,0,1,18.15,21ZM9,3,7,9m8-6,2,6"
              id="primary"
            ></path>
          </svg>
        </div>
        <nav className="flex-col flex-1 flex">
          <ScrollArea.Root className="w-full h-[calc(100vh_-_20px)] rounded-md overflow-hidden bg-white">
            <ScrollArea.Viewport className="w-full h-full rounded">
              <div className=" px-5">
                <div className="text-mauve12 text-[13px] leading-[18px] mt-2.5 ">
                  <div className="">
                    <div className="flex mt-3 flex-1 flex-col">
                      <div className="">
                        <nav className="flex-1">
                          <NavLink
                            to="/profile"
                            className={({ isActive, isPending }) =>
                              classNames(
                                isActive
                                  ? "text-indigo-500 border-l-indigo-500 focus:border-l-4 border-l-4"
                                  : "text-gray-600 hover:border-l-indigo-500 hover:text-indigo-500 hover:border-l-4 transition-all duration-100 ease-in-out",
                                "flex cursor-pointer items-center py-2 px-4 text-sm font-medium outline-none transition-all duration-100 ease-in-out "
                              )
                            }
                          >
                            <User2 className="mr-4 h-5 w-5 align-middle" />
                            Profile
                          </NavLink>

                          <NavLink
                            to="/wishlist"
                            className={({ isActive, isPending }) =>
                              classNames(
                                isActive
                                  ? "text-indigo-500 border-l-indigo-500 focus:border-l-4 border-l-4"
                                  : "text-gray-600 hover:border-l-indigo-500 hover:text-indigo-500 hover:border-l-4 transition-all duration-100 ease-in-out",
                                "flex cursor-pointer items-center py-2 px-4 text-sm font-medium outline-none transition-all duration-100 ease-in-out "
                              )
                            }
                          >
                            <List className="mr-4 h-5 w-5 align-middle" />
                            Wishlist
                            <span className="ml-auto rounded-full bg-indigo-500 px-2 text-xs text-white">
                              6
                            </span>
                          </NavLink>
                          <NavLink
                            to="/orders"
                            className={({ isActive, isPending }) =>
                              classNames(
                                isActive
                                  ? "text-indigo-500 border-l-indigo-500 focus:border-l-4 border-l-4"
                                  : "text-gray-600 hover:border-l-indigo-500 hover:text-indigo-500 hover:border-l-4 transition-all duration-100 ease-in-out",
                                "flex cursor-pointer items-center py-2 px-4 text-sm font-medium outline-none transition-all duration-100 ease-in-out "
                              )
                            }
                          >
                            <ListTodo className="mr-4 h-5 w-5 align-middle" />
                            Orders
                          </NavLink>
                          <NavLink
                            to="/returns"
                            className={({ isActive, isPending }) =>
                              classNames(
                                isActive
                                  ? "text-indigo-500 border-l-indigo-500 focus:border-l-4 border-l-4"
                                  : "text-gray-600 hover:border-l-indigo-500 hover:text-indigo-500 hover:border-l-4 transition-all duration-100 ease-in-out",
                                "flex cursor-pointer items-center py-2 px-4 text-sm font-medium outline-none transition-all duration-100 ease-in-out "
                              )
                            }
                          >
                            <Repeat2 className="mr-4 h-5 w-5 align-middle" />
                            Returns
                          </NavLink>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar
              className="flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
              orientation="horizontal"
            >
              <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className="bg-blackA8" />
          </ScrollArea.Root>
        </nav>
      </div>
    </div>
  );
};
