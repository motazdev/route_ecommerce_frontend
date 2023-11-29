import React from "react";
import { useData } from "../../contexts/DataProvider.js";
import { ProductThumbnail } from "../Product/ProductThumbnail.jsx";

export const LatestProductsSection = () => {
  const { products } = useData();
  return (
    <div className="md:max-w-4xl m-auto max-w-sm  px-2 sm:px-6 lg:px-8 lg:max-w-full pt-36 md:pt-52">
      <div className="prods-area mx-auto max-w-7xl lg:max-w-7xl  flex flex-col justify-between">
        <div className="section-title text-2xl">Latest Products</div>
        <div className="mt-2">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products?.map((product) => (
              <ProductThumbnail product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
