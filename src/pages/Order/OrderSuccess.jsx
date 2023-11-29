import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "../../api/axios";

export const OrderSuccess = () => {
  const [ssp, setSp] = useSearchParams();
  console.log("ssp : ", ssp.get("session_id"));
  const [customer, setCustomer] = useState(null);
  useEffect(() => {
    let isFetched = true;
    const fchh = async () => {
      if (isFetched) {
        const ress = await axios
          .get(
            `https://route-ecommerce-lemon.vercel.app/order/success?session_id=${ssp.get(
              "session_id"
            )}`
          )
          .then((response) => {
            setCustomer(response.data.customer);

            console.log("e : ", response);
          })
          .catch((err) => console.log("errirrr:: ", err));
      }
    };
    fchh();
    return () => {
      isFetched = false;
      fchh();
    };
  }, []);
  return (
    <div className="rounded-md max-w-2xl text-center m-auto items-center relative justify-between flex-col p-20">
      <div className="flex m-auto justify-center flex-col">
        <div className="m-auto">
          <svg
            className="m-auto"
            data-icon-name="check-circle"
            data-style="flat-color"
            icon_origin_id="20379"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            id="check-circle"
            className="icon flat-color"
            width="60"
            height="60"
          >
            <circle
              style={{
                fill: "white",
                stroke: "#6366f1",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "2px",
              }}
              r="9"
              cy="12"
              cx="12"
              id="primary"
            ></circle>
            <polyline
              style={{
                fill: "white",
                stroke: "#312e81",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "2px",
              }}
              points="8 12 11 15 16 10"
              data-name="primary"
              id="primary-2"
            ></polyline>
          </svg>
        </div>
        <div className="text-center">
          <h1 className="text-slate-800 text-2xl font-bold">
            Purchase Successfully!
          </h1>
          <p className="max-w-full text-gray-400 text-sm mt-2">
            Thanks for your order. You order will be processed as soon as
            possible. Make sure you make note of your order number which is
            <span className="text-slate-800 font-semibold text-sm">
              {" "}
              {customer?.id}
            </span>
            . You will be receving email shortly with invoice from your order.
          </p>
        </div>
        <div className="flex justify-between flex-col md:flex-row md:gap-0 gap-y-4 mt-10 items-center">
          <Link
            to="#_"
            className="relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium  hover:shadow-lg transition duration-300 ease-out bg-gray-200 rounded-md group"
          >
            <span className="absolute flex items-center justify-center w-full h-full text-slate-800 transition-all duration-300  ease">
              Continue Shopping
            </span>
            <span className="relative invisible">Continue Shopping</span>
          </Link>
          <Link
            to="#_"
            className="inline-flex items-center justify-center px-6 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            data-rounded="rounded-md"
            data-primary="blue-600"
            data-primary-reset="{}"
          >
            View Your Orders
          </Link>
        </div>
      </div>
    </div>
  );
};
