import { Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon, X } from "lucide-react";
import { Fragment, useState } from "react";
import { useData } from "../../contexts/DataProvider";
import { Link } from "react-router-dom";
import { useAuthData } from "../../contexts/AuthDataProvider";
import * as Tooltip from "@radix-ui/react-tooltip";
import { ToolTip } from "../layout/ToolTip";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { ScrollSection } from "../layout/ScrollSection";

export default function SearchModal() {
  let [isOpen, setIsOpen] = useState(false);
  let [searchQuery, setSearchQuery] = useState(false);
  let [isSearching, setIsSearching] = useState(false);
  const { searchProducts } = useData();
  const { setCart, isProductInCart, cart } = useAuthData();
  console.log("search query: ", searchQuery);
  const handleSearch = async (query) => {
    setIsSearching(true);
    const search = await searchProducts(query).then((resp) => {
      console.log("ss: ", resp);
      setSearchQuery(resp.data.results);
      setIsSearching(false);
    });
  };
  function closeModal() {
    setIsOpen(false);
    setSearchQuery(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="relative ml-4 cursor-pointer mr-4" onClick={openModal}>
        <div className="flow-root">
          <div className="group -mx-2 flex items-center px-2">
            <MagnifyingGlassIcon
              className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            <span className="sr-only">Search</span>
          </div>
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
            <div className="flex min-h-[20rem] max-h-[20rem] items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform fixed top-1/3 overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg px-4 py-2 font-medium leading-6 text-gray-900"
                  >
                    <div className="flex flex-row items-center">
                      <MagnifyingGlassIcon width={20} />
                      <input
                        type="text"
                        name="search"
                        onChange={(e) => handleSearch(e.target.value)}
                        className="border-0 flex-1 focus:ring-0 text-sm"
                      />
                      <X
                        size={20}
                        className="cursor-pointer"
                        onClick={closeModal}
                      />
                    </div>
                  </Dialog.Title>
                  <div className="modal-body">
                    {isSearching && (
                      <div className="min-w-7xl m-auto mb-6">
                        <div className="flex justify-center">
                          <span className="w-2 h-2 ml-2 rounded-full bg-gray-200 inline-block animate-flash"></span>
                          <span className="w-2 h-2 ml-2 rounded-full bg-gray-200 inline-block animate-flash [animation-delay:0.2s]"></span>
                          <span className="w-2 h-2 ml-2 rounded-full bg-gray-200 inline-block animate-flash [animation-delay:0.4s]"></span>
                        </div>
                        {/* <div className="animate-shimmer bg-gradient-to-r from-gray-200 via-gray-200 to-gray-300 mt-2 bg-[length:400%_100%] h-12 w-full rounded-lg"></div> */}
                        {/* <div className="animate-shimmer bg-gradient-to-r from-gray-200 via-gray-200 to-gray-300 mt-2 bg-[length:400%_100%] h-12 w-full rounded-lg"></div> */}
                        {/* <div className="animate-shimmer bg-gradient-to-r mb-2 from-gray-200 via-gray-200 to-gray-300 mt-2 bg-[length:400%_100%] h-12 w-full rounded-lg"></div> */}
                      </div>
                    )}
                    {searchQuery?.length > 0 ? (
                      <ScrollSection
                        viewport={
                          <ul className="divide-y divide-gray-100">
                            {searchQuery.map((product) => (
                              <Link
                                to={`/pview/${product.slug}`}
                                relative="path"
                                className="h-full block"
                                onClick={closeModal}
                                key={product._id}
                              >
                                <li
                                  key={product._id}
                                  className="flex justify-between gap-x-6 py-5 px-4  hover:bg-gray-200 transition-all duration-300"
                                >
                                  <div className="flex min-w-0 gap-x-4">
                                    <img
                                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                      src={product.defaultImage.url}
                                      alt=""
                                    />
                                    <div className="min-w-0 flex-auto">
                                      <p className="text-sm font-semibold leading-6 text-gray-900">
                                        {product.name}
                                      </p>
                                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                        {product.category.name}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="hidden shrink-0 sm:flex sm:flex-col justify-end sm:items-end">
                                    <p className="text-sm leading-6 text-gray-900">
                                      {/* {product.role} */}
                                      {isProductInCart(product._id, cart) && (
                                        <div className="relative">
                                          <ShoppingCartIcon size={16} />
                                          <div className="bg-indigo-600 w-3 h-3 text-[9px] leading-[13px] -top-2 left-2 absolute shadow-lg cursor-pointer rounded-full text-white flex justify-center ">
                                            {
                                              isProductInCart(product._id, cart)
                                                .quantity
                                            }
                                          </div>
                                        </div>
                                      )}
                                    </p>
                                    {product.availableItems > 0 ? (
                                      <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Available Items :{" "}
                                        {product.availableItems}
                                      </p>
                                    ) : (
                                      <div className="mt-1 flex items-center gap-x-1.5">
                                        <p className="text-xs leading-5 text-red-400">
                                          Not Available
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </li>
                              </Link>
                            ))}
                          </ul>
                        }
                      />
                    ) : (
                      <>
                        {searchQuery?.length === 0 && (
                          <div className="flex justify-center p-4">
                            No Products Found
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
