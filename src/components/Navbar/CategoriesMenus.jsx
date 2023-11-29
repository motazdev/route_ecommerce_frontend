import React, { useState } from "react";
import { forwardRef, useEffect } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import axios from "../../api/axios.js";
import { useData } from "../../contexts/DataProvider.js";
import { Link } from "react-router-dom";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export const CategoriesMenus = () => {
  const { categories } = useData();

  return (
    <>
      <NavigationMenu.Root className="">
        <NavigationMenu.List className="center  m-0 flex list-none rounded-[6px] p-1 ">
          {/* ITEM ONE */}
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="text-slate-900 hover:bg-gray-200 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Categories{" "}
              <CaretDownIcon
                className="text-slate-900 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                aria-hidden
              />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className=" absolute top-0 left-0  w-full sm:w-auto">
              <ul className=" m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-row sm:grid-cols-3">
                {categories && categories?.length ? (
                  categories.map((categ) => (
                    <ListItem
                      key={categ._id}
                      title={categ.name}
                      to={`/category/${categ.slug}`}
                    ></ListItem>
                  ))
                ) : (
                  <p>No Categories at this moment...</p>
                )}
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <Link
              className="text-slate-900 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
              to="/offers"
              relative="path"
            >
              Offers
            </Link>
          </NavigationMenu.Item>

          <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
            <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>
        <div className="perspective-[2000px] absolute left-0 flex w-full ">
          <NavigationMenu.Viewport className="drop-shadow-md data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
        </div>
      </NavigationMenu.Root>
    </>
  );
};

const ListItem = forwardRef(
  ({ className, children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <Link
          className={classNames(
            "focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-mauve3 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors",
            className
          )}
          {...props}
          ref={forwardedRef}
        >
          <div className="text-violet12 mb-[5px] font-medium leading-[1.2]">
            {title}
          </div>
          <p className="text-mauve11 leading-[1.4]">{children}</p>
        </Link>
      </NavigationMenu.Link>
    </li>
  )
);
