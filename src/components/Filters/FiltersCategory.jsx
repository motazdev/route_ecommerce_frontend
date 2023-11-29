import { Dialog, Transition } from "@headlessui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import { FilterIcon } from "lucide-react";
import React, { Fragment, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { priceFilterSchema } from "../../utils/ValidationSchema";

export const FiltersCategory = ({
  productsOfCategory,
  setFilteredProducts,
  subcategoriesOfCategory,
  setIsFilter,
  filteredProducts,
  isFilter,
  getProducts,
  setLoadingProducts,
}) => {
  let [isOpen, setIsOpen] = useState(false);
  let [isSubCategsFilter, setIsSubCategsFilter] = useState(false);
  let [minMaxPrice, setMinMaxPrice] = useState({ min: 0, max: 0 });
  // Login Form Handler
  const userRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(priceFilterSchema),
  });
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const [params, setParams] = useSearchParams();

  const filterPrice = (min, max) => {
    productsOfCategory = productsOfCategory.filter(
      (prod) => prod.finalPrice <= max && prod.finalPrice >= min
    );

    setFilteredProducts(productsOfCategory);
    setIsFilter(true);
  };
  const [val, setVal] = useState(null);
  const handelSubCategChange = (value) => {
    productsOfCategory = productsOfCategory.filter(
      (prod) => prod.subcategory.name === value
    );
    setFilteredProducts(productsOfCategory);
    setVal(value);
    setIsSubCategsFilter(true);
  };
  const navigate = useNavigate();
  const handleFilterParams = (min, max) => {
    navigate({ search: `?min=${min}&max=${max}` });
  };

  const onFilterSubmit = async (data) => {
    console.log(data);
    handleFilterParams(minMaxPrice.min, minMaxPrice.max);
    filterPrice(minMaxPrice.min, minMaxPrice.max);
    closeModal();
  };
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="subcategs-filters flex items-center gap-4">
        <select
          onChange={(e) => handelSubCategChange(e.target.value)}
          value={val ? val : "Find in..."}
          className=" cursor-pointer block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          <option disabled hidden>
            Find in...
          </option>
          {subcategoriesOfCategory?.map((subcateg) => (
            <option key={subcateg._id}>{subcateg.name}</option>
          ))}
        </select>
        {isSubCategsFilter && (
          <div
            className=" cursor-pointer text-xs text-gray-500"
            onClick={() => {
              setFilteredProducts(filteredProducts);
              setIsSubCategsFilter(false);
              setVal("Find in...");
            }}
          >
            Reset
          </div>
        )}
      </div>
      <div className="all-filters flex gap-4 items-center">
        {isFilter && (
          <div
            className=" cursor-pointer text-xs text-gray-500"
            onClick={() => {
              if (params.get("min") || params.get("max")) {
                params.delete("min");
                params.delete("max");
                setParams(params);
              }
              getProducts();
              setLoadingProducts(true);
              setIsFilter(false);
            }}
          >
            Reset
          </div>
        )}

        <div
          onClick={openModal}
          className="flex items-center space-x-1 cursor-pointer bg-indigo-600 border-gray-200 border rounded-full p-2 px-6 text-white"
        >
          <FilterIcon width={15} />
          <div className="text-xs font-medium">Filters</div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Price Filter
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onFilterSubmit)} method="post">
                    <div className="mt-2">
                      <div className="price-filter justify-center flex items-center">
                        <div className="input-filter flex flex-row items-center">
                          <div className="flex flex-row items-center">
                            <label
                              htmlFor="min"
                              className="block text-sm mx-4 font-medium leading-6 text-gray-900"
                            >
                              Min
                            </label>
                            <div className="mt-0">
                              <input
                                ref={userRef}
                                {...register("min", { required: true })}
                                onChange={(e) =>
                                  setMinMaxPrice({
                                    ...minMaxPrice,
                                    min: e.target.value,
                                  })
                                }
                                type="number"
                                name="min"
                                placeholder="Min"
                                id="min"
                                className="block text-xs max-w-[80px] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row items-center">
                            <label
                              htmlFor="max"
                              className="block text-sm mx-4 font-medium leading-6 text-gray-900"
                            >
                              Max
                            </label>
                            <div className="mt-0">
                              <input
                                {...register("max", { required: true })}
                                onChange={(e) =>
                                  setMinMaxPrice({
                                    ...minMaxPrice,
                                    max: e.target.value,
                                  })
                                }
                                type="number"
                                name="max"
                                placeholder="Max"
                                id="max"
                                className="block text-xs max-w-[80px] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {errors.min && (
                      <p className="mt-3 text-sm leading-6 text-rose-500">
                        {errors.min.message}
                      </p>
                    )}
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        // onClick={(e) => {
                        //   handleFilterParams(minMaxPrice.min, minMaxPrice.max);
                        //   filterPrice(minMaxPrice.min, minMaxPrice.max);
                        //   closeModal();
                        // }}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
