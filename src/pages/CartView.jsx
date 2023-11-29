import { Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { QuantityUpdateBtn } from "../components/ActionButtons/QuantityUpdateBtn";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import useAuth from "../hooks/useAuth";
import { useAuthData } from "../contexts/AuthDataProvider";
import { LoadingCircle } from "../components/layout/LoadingCircle";
import { applyCouponApi, createOrderApi } from "../api/order";

export const CartView = () => {
  const { cart } = useAuthData();
  const cartCount = cart?.products?.length;
  const { auth } = useAuth();
  const [isDisabled, setIsDisabled] = useState(false);
  const [orderProceed, setOrderProceed] = useState(false);
  const [cartLoading, setCartLoading] = useState(true);
  const [isCoupon, setIsCoupon] = useState({
    applied: false,
    discount: 0,
    coupon: null,
  });
  const applyCoupon = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    await applyCouponApi(
      formJson,
      `${process.env.REACT_APP_BEARER_KEY}${auth.userData.refreshToken}`
    )
      .then((resp) => {
        console.log(resp);

        setIsCoupon({
          applied: true,
          discount: resp.data.coupon.discount,
          coupon: resp.data.coupon.name,
        });

        toast.success(resp.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => setIsDisabled(false));
  };
  let [setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (cart?.products?.length > 0) {
      setCartLoading(false);
    }
  }, [cart]);

  const createOrder = async () => {
    setOrderProceed(true);
    await createOrderApi(
      isCoupon,
      auth.userData,
      `${process.env.REACT_APP_BEARER_KEY}${auth.userData.refreshToken}`
    )
      .then((resp) => {
        window.location.replace(resp.data.result);
      })
      .catch((err) => toast.error(err));
  };
  return (
    <div className="lg:py-8 lg:max-w-7xl sm:py-24 sm:px-6 px-4 py-16 max-w-2xl mx-auto">
      <div className="lg:gap-x-8 lg:items-start pt-6 lg:grid-cols-3 lg:grid">
        <div className="flex flex-col gap-5 col-span-2">
          {cartLoading ? (
            <div className="animate-flash bg-gradient-to-r from-gray-300 via-gray-200 to-gray-500 bg-[length:400%_100%] h-7 w-[12%] rounded-lg"></div>
          ) : (
            <div className="page-title  flex gap-2 items-center">
              <p>Cart</p>
              <p className="text-xs text-gray-400">
                ({cartCount} {cartCount > 1 ? "items" : "item"})
              </p>
            </div>
          )}

          <div className="lg:max-w-none sm:block max-w-2xl w-full hidden mx-auto">
            <div className="w-full pb-2 sm:pb-0 flex flex-col gap-4">
              {cartLoading && (
                <>
                  <div className="animate-flash bg-gradient-to-r from-gray-300 via-gray-200 to-gray-500 bg-[length:400%_100%] h-40 w-full rounded-lg"></div>
                  <div className="animate-flash bg-gradient-to-r from-gray-300 via-gray-200 to-gray-500 bg-[length:400%_100%] h-40 w-full rounded-lg"></div>
                  <div className="animate-flash bg-gradient-to-r from-gray-300 via-gray-200 to-gray-500 bg-[length:400%_100%] h-40 w-full rounded-lg"></div>
                  <div className="animate-flash bg-gradient-to-r from-gray-300 via-gray-200 to-gray-500 bg-[length:400%_100%] h-10 w-1/5 rounded-lg"></div>
                </>
              )}
              {!cartLoading && cart?.products?.length > 0 ? (
                cart.products.map((product) => (
                  <div
                    key={product.productId._id}
                    className={`${product.name} product-cart w-full bg-white py-3 rounded-lg px-6 flex flex-row justify-between`}
                  >
                    <div relative="path" className="flex prod-info">
                      <Link to={`/pview/${product.productId.slug}`}>
                        <img
                          width={100}
                          src={product.productId.defaultImage.url}
                          alt=""
                        />
                      </Link>

                      <div className="prod_infos ml-4 py-4 flex flex-col">
                        <Link
                          to={`/pview/${product.productId.slug}`}
                          className="price text-sm"
                          relative="path"
                        >
                          {product.productId.name}
                        </Link>
                        <p className="category flex-1 text-sm text-gray-500">
                          {product.productId.category.name}
                        </p>
                        <Trash2Icon size={15} className="flex-1 justify-end" />
                      </div>
                    </div>
                    <div className="price-quantity-update items-end flex flex-col justify-between">
                      <p className="tracking-tight text-base pt-4">
                        EGP {product.productId.finalPrice}
                      </p>
                      <p className="tracking-tight text-gray-400 text-sm">
                        {product.productId.finalPrice} x {product.quantity}
                      </p>
                      <QuantityUpdateBtn product={product} />
                    </div>
                  </div>
                ))
              ) : (
                <div>{!cartLoading && "your cart is empty"}</div>
              )}
            </div>
          </div>
          <div className="flex justify-start">
            <Link
              to="/"
              relative="path"
              className="inline-flex items-center justify-center text-sm px-4 py-2 font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <div className="lg:mt-0 sm:px-0 sm:mt-16 px-4 mt-10 col-span-1 sticky top-4">
          {cartLoading ? (
            <>
              <div className="animate-flash bg-gradient-to-r from-gray-300 via-gray-200 to-gray-500 bg-[length:400%_100%] h-7 w-2/5 rounded-lg"></div>
              <div className="animate-flash bg-gradient-to-r from-gray-300 via-gray-200 mt-4 px-4 py-3  to-gray-500 bg-[length:400%_100%] h-52 w-full rounded-lg"></div>
            </>
          ) : (
            <>
              <h2 className="font-medium text-lg">Order summary</h2>
              <div className="shadow-lg bg-white px-4 py-3 border-[1px] rounded-lg mt-4">
                <div className="mt-2">
                  <form
                    method="POST"
                    onSubmit={applyCoupon}
                    onReset={() => {
                      setIsCoupon((prev) => {
                        return { ...prev, applied: false };
                      });
                      toast("Coupon removed");
                    }}
                    className="flex items-center"
                  >
                    <input
                      type="text"
                      name="couponCode"
                      id="coupon_code"
                      placeholder="Coupon Code"
                      disabled={isCoupon.applied ? true : false}
                      className="block disabled:bg-gray-300 w-full rounded-tl-lg rounded-bl-lg border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {!isCoupon.applied ? (
                      <button
                        type="submit"
                        className="bg-indigo-600 font-semibold text-sm text-white rounded-tr-lg rounded-br-lg py-2 px-4"
                      >
                        {isDisabled ? (
                          <svg
                            className="animate-spin mx-[10.7px] h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        ) : (
                          "Apply"
                        )}
                      </button>
                    ) : (
                      <button
                        type="reset"
                        className="bg-indigo-600 cursor-pointer font-semibold text-sm text-white rounded-tr-lg rounded-br-lg py-2 px-2"
                      >
                        Remove
                      </button>
                    )}
                  </form>
                </div>
                <div className="calcs border-b-[1px] border-gray-300 pb-4 pt-2 text-sm flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 flex-1">Subtotal</p>
                    {/* {isCoupon.applied && (
                  <ToolTip
                    trigger={
                      <div className="icon cursor-pointer flex items-start mr-2 text-indigo-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <g fill="none">
                            <path
                              stroke="currentColor"
                              strokeWidth="1.5"
                              d="M14.005 4h-4.01c-3.78 0-5.67 0-6.845 1.172c-.81.806-1.061 1.951-1.14 3.817c-.015.37-.023.556.046.679c.07.123.345.278.897.586a1.999 1.999 0 0 1 0 3.492c-.552.309-.828.463-.897.586c-.069.123-.061.308-.045.678c.078 1.867.33 3.012 1.139 3.818C4.324 20 6.214 20 9.995 20h4.01c3.78 0 5.67 0 6.845-1.172c.81-.806 1.061-1.951 1.14-3.817c.015-.37.023-.556-.046-.679c-.07-.123-.345-.277-.897-.586a1.999 1.999 0 0 1 0-3.492c.552-.308.828-.463.897-.586c.069-.123.061-.308.045-.679c-.078-1.866-.33-3.01-1.139-3.817C19.676 4 17.786 4 14.005 4Z"
                            />
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeWidth="1.5"
                              d="m9 15l6-6"
                            />
                            <path
                              fill="currentColor"
                              d="M15.5 14.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-5-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z"
                            />
                          </g>
                        </svg>
                      </div>
                    }
                    tooltip={<div>{isCoupon.discount}% Discount</div>}
                  />
                )} */}

                    <p className="text-gray-500">
                      EGP{" "}
                      {isCoupon.applied
                        ? Number.parseFloat(
                            cart?.checkoutTotal -
                              (cart?.checkoutTotal * isCoupon.discount) / 100
                          ).toFixed(2)
                        : cart?.checkoutTotal}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-gray-600">Shipping</p>
                    <p className="text-indigo-500">Free</p>
                  </div>
                </div>
                <div className="total pt-2">
                  <div className="flex justify-between">
                    <p className="text-lg">Total</p>
                    <p>
                      EGP{" "}
                      {isCoupon.applied
                        ? Number.parseFloat(
                            cart?.checkoutTotal -
                              (cart?.checkoutTotal * isCoupon.discount) / 100
                          ).toFixed(2)
                        : cart?.checkoutTotal}
                    </p>
                  </div>
                </div>
                <div className="checkoutbtn pt-3">
                  <button
                    onClick={() => {
                      auth.userData.address && auth.userData.phone
                        ? createOrder()
                        : openModal();
                    }}
                    className="bg-indigo-600 w-full py-2 px-4 text-white flex justify-center rounded-md"
                  >
                    {orderProceed ? (
                      <LoadingCircle widthAndHeight={6} />
                    ) : (
                      "Checkout"
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
