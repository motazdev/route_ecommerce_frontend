import React, { useEffect, useState } from "react";
import { useData } from "../contexts/DataProvider";
import { ProductThumbnail } from "../components/Product/ProductThumbnail";
import { Pagination } from "../components/Shared/Pagination";
import ReactPaginate from "react-paginate";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProductsByCategoryApi } from "../api/products";
import { LoadingProductsSkeleton } from "../components/layout/LoadingProductsSkeleton";
import { FiltersCategory } from "../components/Filters/FiltersCategory";

export const Offers = () => {
  const { products } = useData();
  const offers = products.filter((product) => product.discount);

  const [params, setParams] = useSearchParams();
  const page = params.get("page");
  // Category Data
  const availableCategories = offers.map((product) => product.category.name);
  const offersCategories = [...new Set(availableCategories)];

  const [updateFilterData, setUpdateFilterData] = useState(offers);
  const [loadingProducts, setLoadingProducts] = useState(true);
  let [isFilter, setIsFilter] = useState(false);

  const min = params.get("min");
  const max = params.get("max");
  useEffect(() => {
    if (offers.length) {
      setLoadingProducts(false);
    }
    if (min && max) {
      setUpdateFilterData(
        offers.filter(
          (prod) => prod.finalPrice <= max || prod.filterPrice >= min
        )
      );
      setIsFilter(true);
    } else {
      setUpdateFilterData(offers);
    }
  }, [max, min, offers]);

  const navigate = useNavigate();
  const handlePageClick = (e) => {
    navigate(`?page=${e.selected + 1}`);
  };
  const pageCount = Math.ceil(
    products.filter((product) => product.discount).length / 12
  );

  return (
    <div className="categories-list-from-slug pt-8 px-10">
      <div className="flex flex-col">
        {offers?.length === 0 ? (
          <div className="flex justify-center mt-8">No Products To Show</div>
        ) : (
          <div className="filter-area bg-white my-4 rounded-md p-4">
            <FiltersCategory
              setUpdateFilterData={setUpdateFilterData}
              updateFilterData={updateFilterData}
              productsOfCategory={offers}
              subcategoriesOfCategory={offersCategories?.subcategory}
              setIsFilter={setIsFilter}
              isFilter={isFilter}
            />
          </div>
        )}
        <div className="products-list py-8 mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loadingProducts && <LoadingProductsSkeleton />}
          {!loadingProducts &&
            updateFilterData?.length > 0 &&
            updateFilterData.map((product) => (
              <ProductThumbnail product={product} key={product._id} />
            ))}
        </div>

        <Pagination
          pagination={
            <ReactPaginate
              breakLabel="..."
              className="flex  items-center justify-between  border-gray-200  bg-white px-4 py-3 sm:px-6"
              nextLabel={
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              }
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel={
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              }
              renderOnZeroPageCount={null}
              nextClassName="px-2 bg-indigo-500 h-full flex justify-content-center items-center rounded-r-md text-white"
              previousClassName="px-2 bg-indigo-500 h-full flex justify-content-center items-center rounded-l-md mx-0 text-white"
              pageLinkClassName="px-4 py-2"
              disabledClassName="bg-white border-gray-100 border-2 !text-gray-300"
              breakClassName="relative px-4 py-2 inline-flex items-center  text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-100 focus:z-20 focus:outline-offset-0"
              activeClassName="relative rounded-sm z-10 transition-all duration-200 inline-flex items-center bg-indigo-600  text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              pageClassName="relative border-gray-100 ring-1 inline-flex hover:bg-opacity-120  transition-all duration-200 items-center  text-sm font-semibold text-gray-900 ring-inset ring-gray-100 rounded-sm focus:z-20 focus:outline-offset-0"
            />
          }
          productsCount={offers.length}
          page={page}
        />
      </div>
    </div>
  );
};
