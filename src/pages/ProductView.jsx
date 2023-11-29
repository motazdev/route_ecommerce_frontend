import React, { useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Instagram } from "lucide-react";
import { ImagesTab } from "../components/Product/ImagesTab";
import { Link, useLocation, useParams } from "react-router-dom";
import { useData } from "../contexts/DataProvider";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";
import axios from "../api/axios";
import { useAuthData } from "../contexts/AuthDataProvider";
import { isProductInCart } from "../service/cart.helpers";

export const ProductView = () => {
  const { productSlug } = useParams();
  const location = useLocation();
  const { setCart, cart } = useAuthData();
  const { products } = useData();
  const product = products?.filter((prod) => prod.slug === productSlug)[0];
  const { auth } = useAuth();
  const [countQ, setCountQ] = useState(1);
  console.log("product: ", product);
  const quantity = cart?.products?.filter(
    (prod) => prod.productId.slug === productSlug
  )[0];
  const updateCart = async (productId, quantity) => {
    const update = await axios
      .patch(
        "https://route-ecommerce-lemon.vercel.app/cart",
        {
          productId,
          quantity,
        },
        {
          headers: {
            token: `${process.env.REACT_APP_BEARER_KEY}${auth.userData.refreshToken}`,
          },
        }
      )
      .then((resp) => {
        // setCart(resp.data.cart);
        setCart((prev) => {
          return {
            ...prev,
            checkoutTotal: resp.data.cart.checkoutTotal,
            products: resp.data.cart.products,
          };
        });
      });
  };
  console.log("quantity: ", quantity);
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  const addCartItem = async (productId, quantity) => {
    setAddToCartLoading(true);
    console.log(
      "asfasfas >> ",
      `${process.env.REACT_APP_BEARER_KEY}${auth.userData.refreshToken}`
    );
    console.log("productId >> ", productId);
    console.log("quantity >> ", quantity);
    await axios
      .post(
        "https://route-ecommerce-lemon.vercel.app/cart",
        { productId, quantity },
        {
          headers: {
            token: `${process.env.REACT_APP_BEARER_KEY}${auth.userData.refreshToken}`,
          },
        }
      )
      .then((res) => {
        setCart(res.data.cart);
      })
      .finally(() => {
        setAddToCartLoading(true);
      });
  };
  return (
    <div className="lg:py-8 lg:max-w-7xl sm:py-24 sm:px-6 px-4 py-16 max-w-2xl mx-auto">
      <div className="lg:gap-x-8 bg-white rounded-md pt-2 lg:items-start lg:grid-cols-2 lg:grid">
        <div className="flex flex-col-reverse">
          <div className="lg:max-w-none sm:block max-w-2xl w-full hidden mx-auto">
            <ImagesTab product={product} />
          </div>
          <div className="w-full relative"></div>
        </div>
        <div className="lg:mt-0  sm:px-0 sm:mt-16 px-4 mt-10 ">
          <h1 className="-tracking-wide font-bold text-3xl ">
            {product?.name}
          </h1>
          <div className="mt-3">
            <h2 className="absolute w-[1px] h-[1px] -m-[1px] overflow-hidden clip whitespace-nowrap border-0">
              Product Information
            </h2>
            <p className="tracking-tight text-3xl">EGP {product?.finalPrice}</p>
          </div>

          <div className="mt-6 border-b-[1px] border-gray-200 pb-7">
            <h2 className="absolute w-[1px] h-[1px] -m-[1px] overflow-hidden clip whitespace-nowrap border-0">
              Description
            </h2>

            <div className="text-base ">
              <p>{product.description}</p>
            </div>
          </div>
          <div className="availableItems  pb-2 mt-3">
            <p className="text-gray-500 text-sm">
              Avaliable Items: {product.availableItems}
            </p>
          </div>
          <div className="choose-quantity mt-2">
            {/* <QuantityUpdateBtn product={product} /> */}
            <div className="updatebtn flex flex-row gap-0">
              {console.log("countQ : ", countQ)}
              <button
                disabled={countQ < product.availableItems ? false : true}
                to="/#"
                className=" disabled:cursor-not-allowed flex items-center justify-center rounded-bl-md rounded-tl-md border border-transparent bg-indigo-600 p-1 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                onClick={(e) => {
                  if (countQ < product.availableItems) {
                    setCountQ((prev) => prev + 1);
                    console.log("e event: ", countQ);
                  } else {
                    toast.error(`Only ${product.availableItems} is available`);
                  }
                }}
              >
                +
              </button>
              <input
                max={product.availableItems}
                disabled
                type="number"
                value={countQ}
                min={0}
                className="
                
                  block text-xs 
                  max-w-[56px] w-full 
                  border-0 py-1.5 text-gray-900 shadow-sm 
                  ring-1 ring-inset ring-gray-300 
                  placeholder:text-gray-400 focus:ring-2 
                  focus:ring-inset 
                  focus:ring-indigo-600 
                  sm:text-base sm:leading-6"
                onChange={(e) => {
                  setCountQ(e.target.value);
                }}
              />

              <button
                disabled={countQ === 1 ? true : false}
                to="/#"
                // disabled={isDisabled}
                className=" disabled:cursor-not-allowed flex items-center justify-center rounded-br-md rounded-tr-md border border-transparent bg-indigo-600 p-1 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                onClick={(e) => {
                  setCountQ((prev) => {
                    if (prev > 1) {
                      return prev - 1;
                    }
                  });
                }}
              >
                -
              </button>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center mt-10 relative border-gray-300 border-b-[1px] pb-6">
              {auth?.accessToken ? (
                <button
                  onClick={async (e) => {
                    try {
                      setAddToCartLoading(true);
                      await addCartItem(product._id, countQ).then(() => {
                        toast.dismiss();
                        toast.success(
                          "Product added to your cart successfully"
                        );
                      });
                      setAddToCartLoading(false);
                    } catch (error) {
                      toast.dismiss();
                      toast.error(error.message);
                      console.log("Errorr ::", error);
                      setAddToCartLoading(false);
                      toast.error(error.response.data.message);
                    }
                  }}
                  className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] sm:w-full font-medium text-base py-3 px-8 justify-center flex-1 max-w-xs flex items-center  hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-indigo-500  bg-indigo-600 rounded-md text-white transition duration-200 ease-linear"
                >
                  {!addToCartLoading ? (
                    "Add to cart"
                  ) : (
                    <svg
                      className="animate-spin h-6 w-6 text-white"
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
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                </button>
              ) : (
                <Link
                  to={"/login"}
                  className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] sm:w-full font-medium text-base py-3 px-8 justify-center flex-1 max-w-xs flex items-center  hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-indigo-500  bg-indigo-600 rounded-md text-white transition duration-200 ease-linear"
                >
                  Add to cart
                </Link>
              )}
              {auth?.accessToken && isProductInCart(product._id, cart) && (
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <div className="bg-white cursor-pointer rounded-full text-slate-600 absolute w-6 h-6 flex shadow-lg shadow-[#959595] justify-center left-[305px] -top-2">
                        {isProductInCart(product._id, cart).quantity}
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                        sideOffset={5}
                      >
                        In your cart
                        <Tooltip.Arrow className="fill-white" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              )}
            </div>
          </div>
          <section className="mt-12">
            <h3 className="mb-8">Share</h3>
            <ul className="flex flex-row gap-6">
              <li className="text-gray-500 hover:text-gray-600 cursor-pointer">
                <Link
                  to={`https://www.facebook.com/sharer/sharer.php?u=https://route-ecommerce-lemon.vercel.app/${location.pathname}`}
                  target="_blank"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </li>
              <li className="text-gray-500 hover:text-gray-600 cursor-pointer">
                <Link
                  to={`https://twitter.com/intent/tweet?text=https://route-ecommerce-lemon.vercel.app/${location.pathname}`}
                  target="_blank"
                >
                  <Instagram size={20} strokeWidth={1.5} />
                </Link>
              </li>
              <li className="text-gray-500 hover:text-gray-600 cursor-pointer">
                <Link
                  to={`https://twitter.com/intent/tweet?text=https://route-ecommerce-lemon.vercel.app/${location.pathname}`}
                  target="_blank"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
