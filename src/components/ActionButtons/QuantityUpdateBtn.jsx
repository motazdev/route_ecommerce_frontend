import React, { useState } from "react";
import { toast } from "sonner";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useData } from "../../contexts/DataProvider";
import { useAuthData } from "../../contexts/AuthDataProvider";

export const QuantityUpdateBtn = ({ product }) => {
  const [countQ, setCountQ] = useState(product.quantity);
  const { cart, setCart } = useAuthData();
  const [isDisabled, setIsDisabled] = useState(false);
  const { auth } = useAuth();
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
  return (
    <div className="updatebtn flex flex-row gap-0">
      <button
        disabled={isDisabled ? true : false}
        to="/#"
        className=" disabled:cursor-not-allowed flex items-center justify-center rounded-bl-md rounded-tl-md border border-transparent bg-indigo-600 p-1 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        onClick={async () => {
          setIsDisabled(true);
          try {
            await updateCart(
              product.productId._id,
              Number(product.quantity + 1)
            );
            setCountQ(product.quantity + 1);
            setIsDisabled(false);
          } catch (err) {
            toast.error(err.response.data.message);
            setIsDisabled(false);
          }
        }}
      >
        +
      </button>
      {isDisabled ? (
        <div className="pt-1 h-[36px] px-4">
          <svg
            className="animate-spin h-6 w-6 text-gray-400"
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
        </div>
      ) : (
        <input
          max={product.availableItems}
          disabled
          type="number"
          value={product.quantity}
          min={0}
          className="
          pl-5 pr-0
        block text-xs 
        max-w-[56px] w-full 
        border-0 py-1.5 text-gray-900 shadow-sm 
        ring-1 ring-inset ring-gray-300 
        placeholder:text-gray-400 focus:ring-2 
        focus:ring-inset 
        focus:ring-indigo-600 
        sm:text-base sm:leading-6"
          // onChange={(e) => {
          //   setCountQ(e.target.value);
          // }}

          onChange={async (e) => {
            setIsDisabled(true);
            try {
              await updateCart(product.productId._id, Number(e.target.value));
              setIsDisabled(false);
            } catch (err) {
              e.target.value = e.target.value - 1;
              toast.error(err.response.data.message);
              setIsDisabled(false);
            }
          }}
        />
      )}

      <button
        disabled={isDisabled || product.quantity === 1 ? true : false}
        className=" disabled:cursor-not-allowed flex items-center justify-center rounded-br-md rounded-tr-md border border-transparent bg-indigo-600 p-1 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        onClick={async () => {
          setIsDisabled(true);
          try {
            await updateCart(
              product.productId._id,
              Number(product.quantity - 1)
            );
            setIsDisabled(false);
          } catch (err) {
            toast.error(err.response.data.message);
            setIsDisabled(false);
          }
        }}
      >
        -
      </button>
    </div>
  );
};
