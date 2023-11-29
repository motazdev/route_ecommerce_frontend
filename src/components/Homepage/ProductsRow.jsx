import React from "react";
import { ProductThumbnail } from "../Product/ProductThumbnail.jsx";

export const ProductsRow = ({ products }) => {
  return (
    <div className="bg-white mt-2 px-6">
      <div className="mx-auto max-w-2xl lg:max-w-7xl ">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <ProductThumbnail product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
};
