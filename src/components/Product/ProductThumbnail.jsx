import React from "react";
import { Link } from "react-router-dom";
import { AddProductToCartBtn } from "../ActionButtons/AddProductToCartBtn";

export const ProductThumbnail = ({ product }) => {
  return (
    <div
      key={product._id}
      className="group relative rounded-md py-4 px-4 bg-white"
    >
      <div className=" relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
        <img
          src={product.defaultImage.url}
          alt={product.description}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full z-[2]"
        />
        <AddProductToCartBtn product={product} />
      </div>
      <div className="mt-4 flex justify-between">
        <div className="flex flex-1 flex-col">
          <h3 className="text-sm text-gray-700">
            <Link to={`/pview/${product.slug}`} relative="path">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
        </div>
        <div className="text-sm  font-medium text-gray-900">
          <p className="flex-1">EGP {product.finalPrice}</p>
        </div>
      </div>
      {product.discount > 0 && (
        <div className="flex flex-col text-xs  font-medium text-gray-900 gap-2 items-end">
          <div className="flex gap-2 flex-row items-center">
            <p className="line-through ">{product.price}</p>
            <p className="text-xs text-indigo-500">
              {product.discount && product.discount + "% Discount"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
