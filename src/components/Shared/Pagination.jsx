import React from "react";
import { Link } from "react-router-dom";

export const Pagination = ({
  productsCount,
  pagination,
  page,
  allProductsCount,
}) => {
  // Number 12 will change as the business requirments !
  const start = page ? (page - 1) * 12 + 1 : 1;
  const end = page
    ? Math.min(page * 12, allProductsCount)
    : productsCount > 12
    ? 12
    : productsCount;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Link
          href="/#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </Link>
        <Link
          href="/#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{`${start} - ${end}`}</span>{" "}
            of <span className="font-medium">{allProductsCount}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {pagination}
          </nav>
        </div>
      </div>
    </div>
  );
};
