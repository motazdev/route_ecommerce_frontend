import axios from "./axios";

export const updateCart = async (productId, quantity, token) => {
  const response = await axios.patch(
    "https://route-ecommerce-lemon.vercel.app/cart",
    {
      productId,
      quantity,
    },
    {
      headers: {
        token,
      },
    }
  );

  return response;
};

export const deleteCartProduct = async (productId, token) => {
  const response = await axios.patch(
    `https://route-ecommerce-lemon.vercel.app/cart/${productId}`,
    {
      productId,
    },
    {
      headers: {
        token,
      },
    }
  );

  return response;
};

export const addCartProduct = async (productId, quantity, token) => {
  const response = await axios.post(
    `https://route-ecommerce-lemon.vercel.app/cart`,
    { productId, quantity },
    {
      headers: {
        token,
      },
    }
  );

  return response;
};
