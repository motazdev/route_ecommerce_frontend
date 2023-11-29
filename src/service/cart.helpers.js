import axios from "../api/axios";

export const isProductInCart = (id, cart) => {
  console.log("Asfasf");
  console.log("id");
  console.log("cart: ", cart);
  if (cart?.products?.length) {
    console.log("cart YESSSSSSSSSSSSSSSSSSSSS: ", cart);

    const check = cart.products.find((product) => product.productId._id === id);
    console.log("checkk : ", check);
    return check;
  }
  return false;
};

const updateProductInCart = async (productId, quantity, auth) => {
  const update = await axios.patch(
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
  );
  return update;
  // .then((resp) => {
  //   setCart((prev) => {
  //     return {
  //       ...prev,
  //       checkoutTotal: resp.data.cart.checkoutTotal,
  //       products: resp.data.cart.products,
  //     };
  //   });
  // });
};
