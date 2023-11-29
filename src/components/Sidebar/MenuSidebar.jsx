import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { DropdownMenu } from "./DropdownMenu";
import { useData } from "../../contexts/DataProvider";
import { LayoutList } from "lucide-react";

export const MenuSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { categories } = useData();
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-64 max-w-lg">
                  <div className="flex h-full flex-col  bg-white shadow-xl ">
                    <div className="flex-1  px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
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
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setSidebarOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-8">
                        <div className="flow-root">
                          <div className="">
                            <div className="text-mauve12 text-[13px] leading-[18px] mt-2.5 ">
                              <div className="">
                                <div className="flex mt-3 flex-1 flex-col">
                                  <div className="">
                                    <nav className="flex-1">
                                      {/* <Link
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
                                        Categories
                                      </Link> */}
                                      {/* TEST */}
                                      <DropdownMenu
                                        icon={<LayoutList />}
                                        title="Categories"
                                        list={
                                          <ul className="rounded-lg flex flex-col ml-6 bg-mauve2 ">
                                            {categories &&
                                            categories?.length ? (
                                              categories.map((categ) => (
                                                <Link
                                                  to={`/category/${categ.slug}`}
                                                  key={categ._id}
                                                  className="py-3 hover:bg-gray-200 transition-all duration-200 px-2"
                                                >
                                                  <li key={categ._id}>
                                                    {categ.name}
                                                  </li>
                                                </Link>
                                              ))
                                            ) : (
                                              <p>
                                                No Categories at this moment...
                                              </p>
                                            )}
                                          </ul>
                                        }
                                      />
                                    </nav>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
