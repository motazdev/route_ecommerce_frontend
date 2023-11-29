import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
export const About = () => {
  return (
    <div className="about-page">
      <div className="grid grid-cols-1 py-20 w-3/5 m-auto divide-y-2">
        <div className="headline mb-4">
          <h1 className="text-5xl font-semibold">About</h1>
          <div className="headline-info">
            <p>
              An open source E-Commerce store built with Nodejs
              <span className="text-xs">(API)</span> & Reactjs
            </p>
          </div>
        </div>
        <div className="StackInfo mb-4">
          <h3 className="text-xl font-bold mt-4">Tech Stack Used</h3>
          <ul className="flex flex-col gap-1 list-disc ml-5 mt-3">
            <li>Nodejs</li>
            <li>Reactjs</li>
            <li>Tailwindcss</li>
            <li className="underline">
              <a
                href="https://www.radix-ui.com/"
                target="_blank"
                rel="noreferrer"
              >
                Radix UI
              </a>
            </li>
            <li>Stripe</li>
          </ul>
        </div>
        <div className="Features mb-4">
          <h3 className="text-xl font-bold mt-4">Features & Todo's</h3>
          <ul className="flex flex-col gap-1 list-disc ml-5 mt-3">
            <li>✅ Search For Products</li>
            <li>✅ Validation with Joi</li>
            <li>✅ Products Filters </li>
            <li>✅ Orders page to track your own orders</li>
            <li>✅ Loading Skeleton</li>
            <li>✅ Stripe Checkout</li>
            <li>⌛ Wishlist</li>
            <li>⌛ Adding More Products Filters </li>
            <li>
              ⌛ Admin Dashboard (create products, categories, subcategories and
              full applicaiton management)
            </li>
            <li>⌛ Fixing Bugs & Full clean code</li>
          </ul>
        </div>
        <div className="Features mb-4">
          <h3 className="text-xl font-bold mt-4">About the Developer</h3>
          <p>Hi, I'm Motaz. MERN Stack Web Developer. Here is my socials </p>
          <ul className="flex flex-col gap-1 list-disc ml-5 mt-3">
            <li className="underline">
              <a
                href="https://github.com/motazdev"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li className="underline">
              <a
                href="https://www.linkedin.com/in/motazessamdev/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li className="underline">
              <a
                href="https://discordapp.com/users/487693055412142091"
                target="_blank"
                rel="noreferrer"
              >
                Discord
              </a>
            </li>
          </ul>
        </div>
        <div className="back-prev-buttons !border-t-0">
          <Link className="flex justify-end " to="/contact">
            <div className="flex flex-row hover:bg-indigo-100 rounded-md pl-3 pr-1 py-1 justify-center items-center transition-all duration-150">
              Contact <ChevronRight strokeWidth={1.5} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
