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
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import useLogout from "../../hooks/useLogout.js";
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfileNavbar() {
  const [showCartNum, setShowCartNum] = useState(false);
  let menuRef = useRef();
  const [isShowing, setIsShowing] = useState(false);
  //   const { cart } = useCar();
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
  const mobileMenuClickHandler = () => {
    document.body.classList.toggle("blury");
  };
  const { auth, presist } = useAuth();

  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  let [isSearchOpen, setIsSearchOpen] = useState(false);

  function closeSearchModal() {
    setIsSearchOpen(false);
  }

  function openSearchModal() {
    setIsSearchOpen(true);
  }
  const location = useLocation();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  let [searchParams, setSearchParams] = useSearchParams();

  function openModal() {
    setIsOpen(true);
  }
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:px-8 sm:px-6 fixed sm:gap-x-6 shadow-sm px-4 bg-white border-b-[1px] gap-x-4 items-center h-16 flex z-40 top-0 ">
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="lg:hidden p-2.5 -m-2.5"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          ></path>
        </svg>
      </button>
      <div aria-hidden="true" className="lg:hidden w-[1px] h-6"></div>
      <div className="flex lg:gap-x-6 self-stretch gap-x-4 flex-1">
        <div className="items-center lg:gap-x-6 gap-x-6 flex">
          <button className="p-2.5 -m-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              ></path>
            </svg>
          </button>
          <div className="hidden lg:block lg:h-6 lg:w-px "></div>
          <div>HEADLESSUI </div>
        </div>
      </div>
    </div>
  );
}
