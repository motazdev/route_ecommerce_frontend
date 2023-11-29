import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useData } from "../contexts/DataProvider";
import { FiltersCategory } from "../components/Filters/FiltersCategory";
import { ProductThumbnail } from "../components/Product/ProductThumbnail";
import { Pagination } from "../components/Shared/Pagination";
import { getProductsByCategoryApi } from "../api/products";
import ReactPaginate from "react-paginate";
import { useLocation } from "react-router-dom";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export const Category = () => {
  const { categorySlug } = useParams();
  const { products, categories } = useData();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const min = Number(queryParams.get("min"));
  const max = Number(queryParams.get("max"));
  const page = Number(queryParams.get("page"));
  let [isFilter, setIsFilter] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const productsOfCategory = products.filter(
    (product) => product.category.slug === categorySlug
  );
  const [pageCount, setPageCount] = useState(
    Math.ceil(productsOfCategory.length / 12)
  );

  const [filteredProducts, setFilteredProducts] = useState(productsOfCategory);
  const [productsCount, setProductsCount] = useState(productsOfCategory.length);

  const category = categories.find(
    (category) => category.slug === categorySlug
  );
  const getFilteredProducts = async () => {
    await getProductsByCategoryApi(category._id, page, min, max).then(
      (resp) => {
        setFilteredProducts(resp.data.products);
        setProductsCount(resp.data.products.length);
        setPageCount(Math.ceil(resp.data.count / 12));
        setLoadingProducts(false);
      }
    );
  };
  const getProducts = async () => {
    await getProductsByCategoryApi(category._id, page).then((resp) => {
      setFilteredProducts(resp.data.products);
      setProductsCount(resp.data.products.length);

      setLoadingProducts(false);
    });
  };
  useEffect(() => {
    setLoadingProducts(true);

    if (min && max) {
      setIsFilter(true);

      getFilteredProducts();

      setLoadingProducts(false);
    } else {
      getProducts();
      if (page) {
        window.scrollTo({ top: 100, left: 0, behavior: "smooth" });
      }
    }
    if (page) {
      window.scrollTo({ top: 100, left: 0, behavior: "smooth" });
    }
    setProductsCount(filteredProducts.length);
  }, [page, category._id, location.search]);

  const navigate = useNavigate();
  const handlePageClick = (e) => {
    navigate(`?page=${e.selected + 1}`);
  };
  return (
    <div className="categories-list-from-slug pt-8 px-10">
      <div className="flex flex-col">
        {filteredProducts?.length === 0 ? (
          <div className="flex justify-center mt-8">No Products To Show</div>
        ) : (
          <div className="filter-area bg-white my-4 rounded-md p-4">
            <FiltersCategory
              setFilteredProducts={setFilteredProducts}
              filteredProducts={filteredProducts}
              productsOfCategory={productsOfCategory}
              subcategoriesOfCategory={category.subcategory}
              setIsFilter={setIsFilter}
              isFilter={isFilter}
              getProducts={getProducts}
              setLoadingProducts={setLoadingProducts}
            />
          </div>
        )}
        <div className="products-list py-8 mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loadingProducts && (
            <>
              <div className="animate-flash bg-gradient-to-r from-gray-300 via-gray-200 to-gray-500 bg-[length:400%_100%] h-96 w-full rounded-lg"></div>
              <div className="animate-flash bg-gradient-to-r from-gray-300 via-gray-200 to-gray-500 bg-[length:400%_100%] h-96 w-full rounded-lg"></div>
              <div className="animate-flash bg-gradient-to-r from-gray-300 via-gray-200 to-gray-500 bg-[length:400%_100%] h-96 w-full rounded-lg"></div>
              <div className="animate-flash bg-gradient-to-r from-gray-300 via-gray-200 to-gray-500 bg-[length:400%_100%] h-96 w-full rounded-lg"></div>
              <div className="animate-flash bg-gradient-to-r from-gray-300 via-gray-200 to-gray-500 bg-[length:400%_100%] h-96 w-full rounded-lg"></div>
              <div className="animate-flash bg-gradient-to-r from-gray-300 via-gray-200 to-gray-500 bg-[length:400%_100%] h-96 w-full rounded-lg"></div>
              <div className="animate-flash bg-gradient-to-r from-gray-300 via-gray-200 to-gray-500 bg-[length:400%_100%] h-96 w-full rounded-lg"></div>
              <div className="animate-flash bg-gradient-to-r from-gray-300 via-gray-200 to-gray-500 bg-[length:400%_100%] h-96 w-full rounded-lg"></div>
              <div className="animate-flash bg-gradient-to-r from-gray-300 via-gray-200 to-gray-500 bg-[length:400%_100%] h-96 w-full rounded-lg"></div>
              <div className="animate-flash bg-gradient-to-r from-gray-300 via-gray-200 to-gray-500 bg-[length:400%_100%] h-96 w-full rounded-lg"></div>
              <div className="animate-flash bg-gradient-to-r from-gray-300 via-gray-200 to-gray-500 bg-[length:400%_100%] h-96 w-full rounded-lg"></div>
              <div className="animate-flash bg-gradient-to-r from-gray-300 via-gray-200 to-gray-500 bg-[length:400%_100%] h-96 w-full rounded-lg"></div>
            </>
          )}
          {!loadingProducts &&
            filteredProducts?.length > 0 &&
            filteredProducts.map((product) => (
              <ProductThumbnail product={product} key={product._id} />
            ))}
        </div>
        {filteredProducts?.length > 0 && (
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
                forcePage={page ? page - 1 : 0}
                nextClassName="px-2 bg-indigo-500 h-full flex justify-content-center items-center rounded-r-md text-white"
                previousClassName="px-2 bg-indigo-500 h-full flex justify-content-center items-center rounded-l-md mx-0 text-white"
                pageLinkClassName="px-4 py-2"
                disabledClassName="bg-white border-gray-100 border-2 !text-gray-300"
                breakClassName="relative px-4 py-2 inline-flex items-center  text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-100 focus:z-20 focus:outline-offset-0"
                activeClassName="relative rounded-sm z-10 transition-all duration-200 inline-flex items-center bg-indigo-600  text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                pageClassName="relative border-gray-100 ring-1 inline-flex hover:bg-opacity-120  transition-all duration-200 items-center  text-sm font-semibold text-gray-900 ring-inset ring-gray-100 rounded-sm focus:z-20 focus:outline-offset-0"
              />
            }
            productsCount={productsCount}
            page={page}
            allProductsCount={productsOfCategory.length}
          />
        )}
      </div>
    </div>
  );
};
