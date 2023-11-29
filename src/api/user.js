import axios from "./axios";

export const updateUserInfoApi = async (formJson, token) => {
  const response = await axios.patch(
    "https://route-ecommerce-lemon.vercel.app/auth/updateinfo",
    {
      address: `${formJson["street-address"]}-${formJson["city"]}`,
      phone: formJson["phone"].replace(/\s/g, ""),
    },
    {
      headers: {
        token,
      },
    }
  );
};
