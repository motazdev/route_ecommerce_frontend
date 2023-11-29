import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tab } from "@headlessui/react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export const ImagesTab = ({ product }) => {
  let [categories] = useState({
    Recent: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
        image:
          "https://tailwindui.com/img/ecommerce-images/product-page-03-product-02.jpg",
      },
    ],
    Popular: [
      {
        id: 2,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
        image:
          "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      },
    ],
  });
  console.log(Object.values(categories).map((o) => console.log("o: ", o)));
  return (
    <div className="w-full pb-2 sm:pb-0">
      <Tab.Group>
        <Tab.Panels>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white px-3 flex justify-center",
              "ring-white ring-opacity-60 min-w-full max-w-lg ring-offset-2 ring-offset-blue-400 "
            )}
          >
            <div className="relative rounded-md p-3 ">
              <img
                src={product?.defaultImage.url}
                style={{ width: "auto", height: 600 }}
                alt=""
              />
            </div>
          </Tab.Panel>
          {product?.images.map((img, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white px-3 flex justify-center",
                "ring-white ring-opacity-60 min-w-full max-w-lg ring-offset-2 ring-offset-blue-400 "
              )}
            >
              <div key={img._id} className="relative rounded-md p-3 ">
                <img
                  src={img.url}
                  style={{ width: "auto", height: 600 }}
                  alt=""
                />
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
        <Tab.List className="flex justify-center space-x-1 rounded-xl  p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                " w-28 h-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow border-[1px] border-indigo-400"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            <img src={product?.defaultImage.url} alt="" />
          </Tab>
          {product?.images.map((image) => (
            <Tab
              key={image._id}
              className={({ selected }) =>
                classNames(
                  " w-28 h-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow border-[1px] border-indigo-400"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              <img src={image?.url} alt="" />
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
};
