import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CategoriesMenus } from "../Navbar/CategoriesMenus";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Dresses", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Denim", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Significant Other", href: "#" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export const Navbar2 = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-b border-gray-200">
        <div className="flex h-16 items-center">
          <button
            type="button"
            className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
            onClick={() => setOpen(true)}
          >
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Logo */}
          <div className="ml-4 flex lg:ml-0">
            <a href="#">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>

          {/* Flyout menus */}
          <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
            <div className="flex h-full space-x-8">
              {/* {navigation.categories.map((category) => (
                <Popover key={category.name} className="flex">
                  {({ open }) => (
                    <>
                      <div className="relative flex">
                        <Popover.Button
                          className={classNames(
                            open
                              ? "border-indigo-600 text-indigo-600"
                              : "border-transparent text-gray-700 hover:text-gray-800",
                            "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                          )}
                        >
                          {category.name}
                        </Popover.Button>
                      </div>
                    </>
                  )}
                </Popover>
              ))} */}
              {/* <CategoriesMenus /> */}
              <NavigationMenu.Root className="relative z-[55]">
                <NavigationMenu.List className="center shadow-blackA7 m-0 flex list-none rounded-[6px] bg-white p-1 shadow-[0_2px_10px]">
                  <NavigationMenu.Item>
                    <NavigationMenu.Trigger className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                      Learn{" "}
                      <CaretDownIcon
                        className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                        aria-hidden
                      />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto">
                      <ul className="one m-0 grid list-none gap-x-[10px] bg-white p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
                        <li className="row-span-3 grid">
                          <NavigationMenu.Link asChild>
                            <a
                              className="focus:shadow-violet7 from-purple9 to-indigo9 flex
                    h-full w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px]"
                              href="/"
                            >
                              <svg
                                aria-hidden
                                width="38"
                                height="38"
                                viewBox="0 0 25 25"
                                fill="white"
                              >
                                <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
                                <path d="M12 0H4V8H12V0Z"></path>
                                <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
                              </svg>
                              <div className="mt-4 mb-[7px] text-[18px] font-medium leading-[1.2] text-white">
                                Radix Primitives
                              </div>
                              <p className="text-mauve4 text-[14px] leading-[1.3]">
                                Unstyled, accessible components for React.
                              </p>
                            </a>
                          </NavigationMenu.Link>
                        </li>
                      </ul>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                  <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
                    <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
                  </NavigationMenu.Indicator>
                </NavigationMenu.List>

                <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
                  <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
                </div>
              </NavigationMenu.Root>
              {navigation.pages.map((page) => (
                <a
                  key={page.name}
                  href={page.href}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  {page.name}
                </a>
              ))}
            </div>
          </Popover.Group>

          <div className="ml-auto flex items-center">
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
              <a
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Sign in
              </a>
              <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
              <a
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Create account
              </a>
            </div>

            {/* Search */}
            <div className="flex lg:ml-6">
              <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Search</span>
                <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>

            {/* Cart */}
            <div className="ml-4 flow-root lg:ml-6">
              <a href="#" className="group -m-2 flex items-center p-2">
                <ShoppingBagIcon
                  className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                  0
                </span>
                <span className="sr-only">items in cart, view bag</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
