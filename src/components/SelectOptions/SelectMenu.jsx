import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { CheckIcon } from "@radix-ui/react-icons";
import { MenuItem } from "../Sidebar/MenuItem";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export const SelectMenu = ({ title, menuData }) => {
  const [choosenItem, setChoosenItem] = useState(null);

  return (
    <Menu as="div" className="relative ml-3">
      <Menu.Button className="flex peer w-full group py-1 px-3 gap-6 flex-row justify-between items-center bg-gray-200  text-sm font-medium text-slate-600 transition-all duration-100 ease-in-out rounded-md">
        <p>{choosenItem ? choosenItem : title}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className=" ml-auto h-4 text-gray-600 transition peer-checked:rotate-180 ease-[cubic-bezier(0.87,_0,_0.13,_1)]  duration-300 group-data-[headlessui-state='open']:rotate-180 peer-hover:text-indigo-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Menu.Button>
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
          {menuData.categories.map((category) => {
            if (category._id === menuData.data[0].category) {
              return (
                <Menu.Item key={category._id}>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "text-sm cursor-pointer px-4 text-gray-700 flex flex-row items-center justify-between"
                      )}
                    >
                      <p
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block py-2 text-sm cursor-pointer text-gray-700"
                        )}
                      >
                        {category.name}
                      </p>
                      <CheckIcon width={15} />
                    </div>
                  )}
                </Menu.Item>
              );
            } else {
              return (
                <Menu.Item key={category._id}>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "text-sm cursor-pointer px-4 text-gray-700 flex flex-row justify-between"
                      )}
                    >
                      <p
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block py-2 text-sm cursor-pointer text-gray-700"
                        )}
                      >
                        {category.name}
                      </p>
                    </div>
                  )}
                </Menu.Item>
              );
            }

            // {category._id === menuData.data[0].category ? (
            //   <div className="w-full flex flex-row justify-between">
            //     <p>{category.name}</p>
            //     <CheckIcon />
            //   </div>
            // ) : (
            //   category.name
            // )}
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
