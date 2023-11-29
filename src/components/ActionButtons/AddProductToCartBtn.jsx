import React, { useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { toast } from "sonner";
import { useAuthData } from "../../contexts/AuthDataProvider";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
export const AddProductToCartBtn = ({ product }) => {
  const { setCart, addProductToCart } = useAuthData();

  const addCartItem = async (productId, quantity) => {
    setAddToCartLoading(true);

    await addProductToCart(productId, quantity)
      .then((res) => {
        setCart(res.data.cart);
      })
      .catch((err) => console.log("eirr: ", err))
      .finally(() => {
        setAddToCartLoading(false);
      });
  };
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            disabled={addToCartLoading}
            onClick={async () => {
              try {
                if (auth.userData) {
                  toast("loading...");
                  await addCartItem(product._id, 1).then(() => {
                    toast.dismiss();
                    toast.success("Product added to your cart successfully");
                  });
                  setAddToCartLoading(false);
                } else {
                  navigate("/login");
                }
              } catch (error) {
                toast.dismiss();
                setAddToCartLoading(false);
                toast.error(error?.response?.data?.message);
              }
            }}
            className="mr-10 z-[3] cursor-pointer text-blue-400 rounded-full hover:scale-[1.2] transition-all duration-300 bg-white py-1 px-1 shadow-lg mb-3 absolute top-3 left-3"
          >
            <svg
              className=""
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
            >
              <path
                stroke="#000"
                strokeLinecap="round"
                d="M1 5h3.83c.548 0 4.378 9.692 4.925 9.692h10.398c.547 0 2.736-7.754 2.189-7.754h-3.284M13.321 5v5.385M16 7.692h-5.357"
              />
              <ellipse
                cx="11.714"
                cy="17.923"
                fill="#000"
                rx="1.071"
                ry="1.077"
              />
              <ellipse
                cx="18.143"
                cy="17.923"
                fill="#000"
                rx="1.071"
                ry="1.077"
              />
            </svg>
          </button>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            className=" z-[99] data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-indigo-600 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[12px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
            sideOffset={5}
          >
            Add to cart
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
