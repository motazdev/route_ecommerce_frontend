import React from "react";
import { DropdownMenu } from "./DropdownMenu.jsx";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { MenuItem } from "./MenuItem.jsx";
import { Link } from "react-router-dom";

export const Sidebar = ({ classes }) => {
  return (
    <div className={` sidebar ${classes} z-50`}>
      <div className="h-screen w-64 pb-10">
        <div className="flex h-screen flex-grow flex-col rounded-br-lg rounded-tr-lg bg-white shadow-md">
          <div className="flex mt-10 items-center px-4 shadow-[0px_20px_18px_0px_#00000014] h-[100px] z-50">
            <img
              className="h-12 w-auto max-w-full align-middle"
              src="/images/R-Wx_NHvZBci3KLrgXhp1.png"
              alt=""
            />
            <div className="flex ml-3 flex-col">
              <h3 className="font-medium">Sarah Carter</h3>
              <p className="text-xs text-gray-500">Sr. Engineer</p>
            </div>
          </div>
          <ScrollArea.Root className="w-full h-[calc(100vh_-_20px)] rounded overflow-hidden  bg-white">
            <ScrollArea.Viewport className="w-full h-full rounded">
              <div className=" px-5">
                <div className="text-mauve12 text-[13px] leading-[18px] mt-2.5 ">
                  <div className="">
                    <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">
                      Analytics
                    </span>

                    <div className="flex mt-3 flex-1 flex-col">
                      <div className="">
                        <nav className="flex-1">
                          <Link
                            to="/admin"
                            className="flex cursor-pointer items-center border-l-4 border-l-indigo-500 py-2 px-4 text-sm font-medium text-indigo-500 outline-none transition-all duration-100 ease-in-out focus:border-l-4"
                          >
                            <svg
                              className="mr-4 h-5 w-5 align-middle"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                className=""
                              ></path>
                            </svg>
                            Dashboard
                          </Link>

                          <Link
                            to="/admin/products"
                            className="flex cursor-pointer items-center border-l-indigo-500 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-indigo-500 hover:text-indigo-500 focus:border-l-4"
                          >
                            <svg
                              className="mr-4 h-5 w-5 align-middle"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                              />
                            </svg>
                            Messages
                            <span className="ml-auto rounded-full bg-indigo-500 px-2 text-xs text-white">
                              6
                            </span>
                          </Link>
                          {/* TEST */}
                          <DropdownMenu
                            icon={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                              </svg>
                            }
                            title="Analytics"
                            list={
                              <ul className="rounded-lg bg-mauve2 py-1">
                                <li className="flex m-2 cursor-pointer border-l-indigo-500 py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-indigo-500">
                                  <span className="mr-5">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                      />
                                    </svg>
                                  </span>
                                  Revenue
                                </li>
                                <li className="flex m-2 cursor-pointer border-l-indigo-500 py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-indigo-500">
                                  <span className="mr-5">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                      />
                                    </svg>
                                  </span>
                                  Refunds
                                </li>
                              </ul>
                            }
                          />
                        </nav>

                        <div className="menu-section">
                          <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">
                            Product Mangement
                          </span>

                          <nav className="flex-1">
                            <MenuItem
                              title="Products"
                              link="products"
                              icon={
                                <svg
                                  className="mr-4 h-5 w-5 align-middle"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                    className=""
                                  ></path>
                                </svg>
                              }
                            />
                            <MenuItem
                              title="Orders"
                              link="orders"
                              icon={
                                <svg
                                  className="mr-4 h-5 w-5 align-middle"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                  />
                                </svg>
                              }
                            />

                            <MenuItem
                              title="Suppliers"
                              link="suppliers"
                              icon={
                                <svg
                                  className="mr-4 h-5 w-5 align-middle"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                  />
                                </svg>
                              }
                            />
                          </nav>
                        </div>

                        <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">
                          Content Management
                        </span>

                        <nav className="flex-1">
                          <a
                            href="/#"
                            className="flex cursor-pointer items-center border-l-indigo-500 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-indigo-500 hover:text-indigo-500 focus:border-l-4"
                          >
                            <svg
                              className="mr-4 h-5 w-5 align-middle"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                              />
                            </svg>
                            Blogs
                          </a>
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
        </div>
      </div>
    </div>
  );
};
