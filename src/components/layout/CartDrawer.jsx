import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ShoppingCart, Trash } from "lucide-react";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "sonner";
import { useAuthData } from "../../contexts/AuthDataProvider";
import { LoadingCircle } from "../layout/LoadingCircle";
import { QuantityUpdateBtn } from "../ActionButtons/QuantityUpdateBtn";

export const CartDrawer = ({ setIsOpen, isOpen, closeModal }) => {
  const { cart, setCart, updateProductInCart, deleteProductFromCart } =
    useAuthData();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();

  const updateCart = async (productId, quantity) => {
    await updateProductInCart(productId, quantity).then((resp) => {
      setCart((prev) => {
        return {
          ...prev,
          checkoutTotal: resp.data.cart.checkoutTotal,
          products: resp.data.cart.products,
        };
      });
    });
  };

  const deleteCartItem = async (productId) => {
    setIsLoading({ productId: productId });
    setIsDisabled(true);

    await deleteProductFromCart(productId)
      .then((res) => {
        setCart((prev) => {
          return {
            ...prev,
            products: res.data.cart.products,
            checkoutTotal: res.data.cart.checkoutTotal,
          };
        });
      })
      .catch((err) => console.log("Err: ", err))
      .finally(() => {
        setIsDisabled(false);
        setIsLoading(false);
      });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {cart?.products?.length > 0 ? (
                        <div className="mt-8">
                          <div className="flow-root">
                            <ul className="-my-6 divide-y divide-gray-200">
                              {cart?.products?.map((product) => (
                                <li
                                  key={product.productId._id}
                                  className="flex py-6"
                                >
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.productId.defaultImage?.url}
                                      alt={product.productId?.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link to={product.productId.slug}>
                                            {product.productId.name}
                                          </Link>
                                        </h3>
                                        <p className="ml-4">
                                          {product.productId.finalPrice *
                                            product.quantity}
                                        </p>
                                      </div>
                                      <div className="flex items-center justify-between flex-row">
                                        <p className="mt-1 text-sm text-gray-500">
                                          {product.productId.category?.name}
                                        </p>
                                        <p className="text-xs">
                                          {product.productId.finalPrice} x{" "}
                                          {product.quantity}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <QuantityUpdateBtn product={product} />

                                      <div className="flex">
                                        <button
                                          onClick={() => {
                                            try {
                                              deleteCartItem(
                                                product.productId._id,
                                                auth
                                              );
                                            } catch (err) {
                                              toast.error(
                                                err.response.data.message
                                              );
                                            }
                                          }}
                                          type="button"
                                          disabled={isDisabled}
                                          className="font-medium text-indigo-600 hover:text-indigo-500 disabled:cursor-wait"
                                        >
                                          {isLoading.productId ===
                                          product.productId._id ? (
                                            <LoadingCircle
                                              color="rgb(79 70 229)"
                                              widthAndHeight={5}
                                            />
                                          ) : (
                                            <Trash size={18} />
                                          )}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-8 flex flex-col items-center justify-center h-[calc(100%-5.8rem)]">
                          <div className="flex flex-col justify-center text-[#a5a5a5] text-center items-center gap-2">
                            <ShoppingCart size={80} color="#c9c9c9" />
                            <div className="md_content">
                              <p>You don't have items in your cart</p>
                              <small>Add items to your cart to checkout</small>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {cart?.products?.length > 0 && (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>EGP {cart?.checkoutTotal}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <Link
                            to="/cart"
                            relative="path"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{" "}
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setIsOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
