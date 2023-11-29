import { Fragment, useEffect, useRef } from "react";
import { Disclosure, Menu, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
  UserIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import * as Form from "@radix-ui/react-form";
import { Dialog } from "@headlessui/react";

//import styles ?
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import useLogout from "../../hooks/useLogout.js";
import { CategoriesMenus } from "../Navbar/CategoriesMenus.jsx";
import { CartDrawer } from "./CartDrawer.jsx";
import { useAuthData } from "../../contexts/AuthDataProvider.js";
import SearchModal from "../Modals/SearchModal.jsx";
import { MenuSidebar } from "../Sidebar/MenuSidebar.jsx";
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  let menuRef = useRef();
  const [isShowing, setIsShowing] = useState(false);
  const { cart } = useAuthData();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setIsShowing(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const navigate = useNavigate();

  const { auth } = useAuth();

  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  const location = useLocation();
  let [isOpen, setIsOpen] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  function closeSidebar() {
    setSidebarOpen(false);
  }
  function openSidebar() {
    setSidebarOpen(true);
  }

  return (
    <Disclosure as="nav" className="border-b-[1px] bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="md:hidden">
                {/* Mobile menu button*/}
                <button
                  onClick={openSidebar}
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
              <div className=" flex flex-1">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <svg
                      data-icon-name="bag-alt-1"
                      data-style="line-color"
                      icon_origin_id="17501"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      data-name="Line Color"
                      id="bag-alt-1"
                      className="icon line-color"
                      width="40"
                      height="40"
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
                  </Link>
                </div>

                <div className="hidden sm:ml-6 md:block z-50">
                  <div className="flex space-x-4">
                    <CategoriesMenus />
                  </div>
                </div>
              </div>
              <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!auth.accessToken && (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link
                      to="/login"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Link
                      to="signup"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Create account
                    </Link>
                  </div>
                )}

                {/* Search icon */}

                <SearchModal />
                {/* User icon */}
                {auth.accessToken && (
                  <Menu as="div" className="relative">
                    <div>
                      <Menu.Button className="relative flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:shadow-lg">
                        <div className="flow-root">
                          <div className="group -mx-2 flex items-center px-2">
                            <UserIcon
                              className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />

                            <span className="sr-only">
                              items in cart, view bag
                            </span>
                          </div>
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Profile
                            </Link>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              onClick={signOut}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}

                <div
                  className="bg-gray-200 h-7 w-px mx-5"
                  aria-hidden="true"
                ></div>
                {/* Cart Button */}
                <Menu as="div" className="relative">
                  <div className=" flex items-center justify-center">
                    {!auth?.accessToken ? (
                      <Link to="/login" state={{ from: location }}>
                        {/* Cart */}
                        <div className="flow-root ">
                          <div className="group m-0 flex items-center">
                            <ShoppingBagIcon
                              className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                              {cart?.products?.length}
                            </span>
                            <span className="sr-only">
                              items in cart, view bag
                            </span>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <button onClick={openModal}>
                        {/* Cart */}
                        <div className="flow-root">
                          <div className="group m-0 flex items-center">
                            <ShoppingBagIcon
                              className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                              {cart?.products?.length}
                            </span>
                            <span className="sr-only">
                              items in cart, view bag
                            </span>
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                  <CartDrawer
                    isOpen={isOpen}
                    closeModal={closeModal}
                    setIsOpen={setIsOpen}
                  />
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="h-screen animate-fade-right transition-all duration-[1000ms] animate-once absolute w-72 top-0 bg-black sm:hidden">
            <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {open ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </Disclosure.Button>
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  as="a"
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
          <MenuSidebar
            closeSidebar={closeSidebar}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </>
      )}
    </Disclosure>
  );
}
