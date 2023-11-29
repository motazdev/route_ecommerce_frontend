import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";

export const Contact = () => {
  return (
    <div className="contact-page">
      <div className="grid grid-cols-1 py-20 w-3/5 m-auto divide-y-2">
        <div className="headline mb-4">
          <h1 className="text-5xl font-semibold">Contact</h1>
          <div className="headline-info">
            <p>Fell free to contact me for any question or concerns.</p>
          </div>
        </div>

        <div className="Features mb-4">
          <h3 className="text-xl font-bold mt-4">Contact Information</h3>
          <ul className="flex flex-col gap-1 list-disc ml-5 mt-3">
            <li className="">
              <p className="flex flex-row">
                <p>Email: </p>
                {"  "}
                <a
                  href="mailto:motazessamdev@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  motazessamdev@gmail.com
                </a>
              </p>
            </li>
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
        <div className="back-prev-buttons flex justify-between !border-t-0">
          <Link className=" " to="/about">
            <div className="flex flex-row hover:bg-indigo-100 rounded-md pl-3 pr-1 py-1 justify-center items-center transition-all duration-150">
              <ChevronLeft strokeWidth={1.5} />
              About
            </div>
          </Link>
          <Link className=" " to="/terms">
            <div className="flex flex-row hover:bg-indigo-100 rounded-md pl-3 pr-1 py-1 justify-center items-center transition-all duration-150">
              Terms & Conditions <ChevronRight strokeWidth={1.5} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
