import axios from "./axios";

export const getProductsByCategoryApi = async (id, page, pricemn, pricemx) => {
  const response = axios.get(
    `https://route-ecommerce-lemon.vercel.app/product?category=${id}${
      page ? `&page=${page}` : ``
    }&limit=12${pricemn ? `&pricemn=${pricemn}` : ``}${
      pricemx ? `&pricemx=${pricemx}` : ``
    }`
  );
  return response;
};
