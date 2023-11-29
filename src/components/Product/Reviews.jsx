import React from "react";

export const Reviews = () => {
  return (
    <section className="reviews my-10 px-4 rounded-md bg-white">
      <div className="title pt-10 pb-5">
        <p>Recent reviews</p>
      </div>
      <div className="reviewsList border-t-[1px] border-gray-300 pb-10 mt-6">
        <div className="grid gap-x-8 grid-cols-12 pt-10 ">
          <div className="xl:grid xl:col-start-4 xl:col-span-9 lg:col-start-5 lg:col-span-8 xl:gap-x-8 xl:items-start xl:grid-cols-3">
            <div className="flex items-center xl:col-span-1">
              <div className="flex items-center text-yellow-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="shrink-0 text-indigo-500 w-5 h-5 block align-middle"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="shrink-0 text-indigo-500 w-5 h-5 block align-middle"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="shrink-0 text-indigo-500 w-5 h-5 block align-middle"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="shrink-0 text-indigo-500 w-5 h-5 block align-middle"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="shrink-0 text-indigo-500 w-5 h-5 block align-middle"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <p className="text-sm ml-3">
                5
                <span className="absolute w-[1px] h-[1px] -m-[1px] whitespace-nowrap border-0 overflow-hidden p-0 ">
                  {" "}
                  out of 5 stars
                </span>
              </p>
            </div>
            <div className="xl:mt-0 xl:col-span-2 lg:mt-6 mt-4">
              <h3 className="text-sm font-medium">
                Can't say enough good things
              </h3>
              <div className="mt-3">
                <p>
                  I was really pleased with the overall shopping experience. My
                  order even included a little personal, handwritten note, which
                  delighted me!
                </p>
              </div>
            </div>
          </div>
          <div className="flex xl:col-span-3 lg:items-start lg:flex-col lg:mt-0 lg:row-start-1 lg:col-span-4 text-sm items-center mt-6 ">
            <p className="font-medium">Risako M</p>
            <time className=" text-gray-500 lg:pl-0 lg:border-0 lg:mt-2 lg:ml-0 pl-4 ml-4 border-l-[1px]">
              May 16, 2021
            </time>
          </div>
        </div>
      </div>
    </section>
  );
};
