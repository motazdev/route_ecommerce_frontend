// import axios from "../api/axios.js";
import axios from "axios";
import useAuth from "./useAuth.js";

const useRefreshToken = () => {
  const { setAuth, presist } = useAuth();
  const refresh = async () => {
    await axios
      .get("https://route-ecommerce-lemon.vercel.app/auth/refresh", {
        withCredentials: true,
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((d) => {
        if (presist) {
          setAuth((prev) => {
            return {
              ...prev,
              userData: d?.data.userData,
              accessToken: d?.data.accessToken,
            };
          });
        }
        return d?.data.accessToken;
      })
      .catch((err) => console.log("Refreshtoken Error: ", err));
  };
  return refresh;
};

export default useRefreshToken;
