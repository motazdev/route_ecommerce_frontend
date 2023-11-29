import React from "react";

export const Returns = () => {
  return (
    <div className="returnspage h-[calc(100vh-128px)] w-full">
      <div className=" items-center absolute m-auto text-center top-1/3 flex w-full flex-col">
        <svg
          data-icon-name="file-reload"
          data-style="flat-color"
          icon_origin_id="18452"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          data-name="Flat Color"
          id="file-reload"
          className="icon flat-color"
          width="100"
          height="100"
        >
          <path
            style={{ fill: "rgb(140, 117, 252)" }}
            d="M21,10a1,1,0,0,0-1,1v1.27A5.49,5.49,0,1,0,20.78,20a1,1,0,1,0-1.56-1.26A3.45,3.45,0,0,1,16.5,20a3.5,3.5,0,1,1,2.44-6H17a1,1,0,0,0,0,2h4a1,1,0,0,0,1-1V11A1,1,0,0,0,21,10Z"
            id="secondary"
          ></path>
          <path
            style={{ fill: "rgb(55, 48, 163)" }}
            d="M10,16.5A6.51,6.51,0,0,1,16.5,10a6.69,6.69,0,0,1,1.5.18V7.41A2,2,0,0,0,17.41,6L14,2.59A2,2,0,0,0,12.59,2H4A2,2,0,0,0,2,4V19a2,2,0,0,0,2,2h7.83A6.49,6.49,0,0,1,10,16.5Z"
            id="primary"
          ></path>
        </svg>
        <p className="mt-4 text-gray-500 ">
          We have found that you have no returns requests
        </p>
      </div>
    </div>
  );
};
