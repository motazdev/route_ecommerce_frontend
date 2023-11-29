import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SentConfirmEmail() {
  const [counter, setCounter] = useState(3);
  const navigate = useNavigate();
  useEffect(() => {
    counter >= 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter < 0) {
      navigate("/login", { replace: true });
    }
  }, [counter, navigate]);
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {/* <div className="bg-white lg:px-8 sm:px-6 pt-36 px-4 max-w-7xl mx-auto"> */}
      {/* <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8"> */}
      <svg
        data-icon-name="bag-alt-1"
        data-style="line-color"
        icon_origin_id="17501"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        data-name="Line Color"
        id="bag-alt-1"
        className="mx-auto w-auto icon line-color"
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
      <div className="max-w-7xl mt-10 mx-auto ">
        <div className="relative isolate overflow-hidden bg-gray-200 px-6 py-12 md:py-16 lg:py-24 shadow-2xl rounded-3xl sm:px-16 lg:flex lg:gap-x-20 lg:px-24 ">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="flex-col text-center lg:mx-0 lg:flex-auto flex justify-center">
            <h2 className="md:text-3xl text-xl font-bold tracking-tight text-slate-800">
              A confirmation link has been sent to your email
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-800">
              Please review your email
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <p className="text-slate-600">
                you will be redircted to login page after {counter} seconds...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
