import React from "react";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
export const Terms = () => {
  return (
    <div className="terms-conds-page">
      <div className="grid grid-cols-1 py-20 w-3/5 m-auto divide-y-2">
        <div className="headline mb-4">
          <h1 className="text-5xl font-semibold">Terms & Conditions</h1>
        </div>

        <div className="Features mb-4">
          <p className="text-md  mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
            dicta ea voluptatum perspiciatis, beatae harum numquam asperiores
            itaque aliquid repellendus. Totam quis fugiat deserunt quam quidem
            corrupti? Ducimus, eos esse.
          </p>
        </div>
        <div className="back-prev-buttons flex justify-between !border-t-0">
          <Link className=" " to="/contact">
            <div className="flex flex-row hover:bg-indigo-100 rounded-md pl-3 pr-1 py-1 justify-center items-center transition-all duration-150">
              <ChevronLeft strokeWidth={1.5} />
              Contact
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
