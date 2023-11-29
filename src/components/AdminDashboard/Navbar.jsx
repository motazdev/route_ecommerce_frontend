import { Fragment, useEffect, useRef } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, useCycle } from "framer-motion";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import useLogout from "../../hooks/useLogout.js";
import { CategoriesMenus } from "../Navbar/CategoriesMenus.jsx";
import { BellIcon } from "@radix-ui/react-icons";
import { Sidebar } from "../Sidebar/Sidebar.jsx";

import { useAnimate } from "framer-motion";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Navbar() {
  // const { isOpen, toggleOpen } = useSidebar();
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);

  const [sideShow, setSideShow] = useState(false);
  let menuRef = useRef();
  const [isShowing, setIsShowing] = useState(false);

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
  // console.log("auth > ", auth);

  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  const [scope, animate] = useAnimate();

  const onBtnClick = () => {
    if (sideShow) {
      animate([[".sidebar-handel", { marginLeft: 54 }, { duration: 0.4 }]]);
      console.log("side show ; ", sideShow);
      setSideShow(false);
    } else {
      animate([[".sidebar-handel", { marginLeft: 0 }, { duration: 0.4 }]]);
      console.log("side show ; ", sideShow);
      setSideShow(true);
    }
  };

  return (
    <Disclosure as="nav" className="border-b-[1px]">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="md:hidden">
                {/* Mobile menu button*/}

                <motion.div
                  initial={false}
                  animate={isOpen ? "open" : "closed"}
                  ref={containerRef}
                >
                  <button
                    onClick={() => toggleOpen()}
                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400  hover:text-white "
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    <svg width="23" height="23" viewBox="0 0 23 23">
                      <Path
                        variants={{
                          closed: { d: "M 2 2.5 L 20 2.5" },
                          open: { d: "M 3 16.5 L 17 2.5" },
                        }}
                      />
                      <Path
                        d="M 2 9.423 L 20 9.423"
                        variants={{
                          closed: { opacity: 1 },
                          open: { opacity: 0 },
                        }}
                        transition={{ duration: 0.1 }}
                      />
                      <Path
                        variants={{
                          closed: { d: "M 2 16.346 L 20 16.346" },
                          open: { d: "M 3 2.5 L 17 16.346" },
                        }}
                      />
                    </svg>
                  </button>
                </motion.div>
              </div>
              {/* <div className=" flex-1 lg:ml-8 flex items-center justify-center sm:items-stretch sm:justify-start"> */}
              <div className=" flex flex-1">
                <div className="flex flex-shrink-0 items-center">
                  <div onClick={onBtnClick} className="ssss">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                </div>

                <div className="hidden sm:ml-6 sm:block z-50">
                  <div className="flex space-x-4">
                    <CategoriesMenus />
                  </div>
                </div>
              </div>
              <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Notification Button */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button>
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open Notification </span>
                      <BellIcon
                        className="w-5 h-5 mt-2 text-slate-800"
                        aria-hidden="true"
                      />
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
                          <a
                            href="/"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* Profile dropdown */}
                {!auth?.accessToken ? (
                  <Link
                    to="/login"
                    className="ml-6 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Login
                  </Link>
                ) : (
                  // {/* Profile Menu */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          src={auth?.userData?.profilePic.url}
                          alt=""
                        />
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
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
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
          {/* <div ref={scope}>
            <div className="sidebar-mobile">
              <Sidebar classes={"sidebar-handel md:hidden block"} />
            </div>
          </div> */}

          <motion.div
            initial={false}
            animate={isOpen ? "open" : "closed"}
            ref={containerRef}
            className="absolute"
          >
            <motion.div
              variants={{
                closed: { marginLeft: "-256px" },
                open: { marginLeft: 0 },
              }}
            >
              <Sidebar
                classes={"md:hidden absolute"}
                variants={{
                  closed: { marginLeft: "-256px" },
                  open: { marginLeft: 0 },
                }}
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </Disclosure>
  );
}
const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);
