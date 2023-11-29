import axios from "./axios";

export const createOrderApi = async (isCoupon, userData, token) => {
  const response = await axios.post(
    "https://route-ecommerce-lemon.vercel.app/order",
    {
      address: userData.address,
      phone: userData.phone,
      payment: "visa",
      ...(isCoupon.applied && { coupon: isCoupon.coupon }),
    },
    {
      headers: {
        token,
      },
    }
  );
  return response;
};

export const applyCouponApi = async (formJson, token) => {
  const response = axios.post(
    "https://route-ecommerce-lemon.vercel.app/coupon/check",
    { code: formJson.couponCode },
    {
      headers: {
        token,
      },
    }
  );
  return response;
};
