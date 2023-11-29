import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios.js";
import useAuth from "../hooks/useAuth.js";

const AuthDataContext = createContext(null);

const AuthDataProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState(null);
  const { auth } = useAuth();
  const deleteProductFromCart = async (productId) => {
    console.log("prd id: ", productId);
    const response = await axios.delete(
      `https://route-ecommerce-lemon.vercel.app/cart/${productId}`,
      {
        headers: {
          token: `${process.env.REACT_APP_BEARER_KEY}${auth?.userData?.refreshToken}`,
        },
      }
    );
    return response;
  };

  const isProductInCart = (id, cart) => {
    if (cart?.products?.length) {
      const check = cart.products.find(
        (product) => product.productId._id === id
      );
      return check;
    }
    return false;
  };

  const addProductToCart = async (productId, quantity) => {
    const response = await axios.post(
      `https://route-ecommerce-lemon.vercel.app/cart`,
      { productId, quantity },
      {
        headers: {
          token: `${process.env.REACT_APP_BEARER_KEY}${auth?.userData?.refreshToken}`,
        },
      }
    );
    return response;
  };

  useEffect(() => {
    console.log("authhhhshhshshsh:::", auth);
    const fetchData = async () => {
      const cartResponse = await axios
        .get("/cart", {
          headers: {
            token: `${process.env.REACT_APP_BEARER_KEY}${auth?.userData?.refreshToken}`,
          },
        })
        .then((resp) => {
          console.log("asffasfsssss");
          console.log("asffasfsssss, ", resp.data.cart);
          setCart(resp.data.cart);
        })
        .catch((err) => console.log("No User Exist To Get Cart ", err));
      const ordersData = await axios
        .get("/order/orders", {
          headers: {
            token: `${process.env.REACT_APP_BEARER_KEY}${auth?.userData?.refreshToken}`,
          },
        })
        .then((resp) => setOrders(resp.data.orders))
        .catch((err) => console.log("No User Exist To Get Orders ", err));
      // const authData = await axios
      //   .get("/auth/refresh", { withCredentials: true })
      //   .then(async (authResponse) => {
      //     const cartResponse = await axios
      //       .get("/cart", {
      //         headers: {
      //           token: `${process.env.REACT_APP_BEARER_KEY}${authResponse.data?.userData?.refreshToken}`,
      //         },
      //       })
      //       .then((resp) => {
      //         console.log("asffasfsssss");
      //         console.log("asffasfsssss, ", resp.data.cart);
      //         setCart(resp.data.cart);
      //       });

      //     const ordersData = await axios
      //       .get("/order/orders", {
      //         headers: {
      //           token: `${process.env.REACT_APP_BEARER_KEY}${authResponse.data?.userData?.refreshToken}`,
      //         },
      //       })
      //       .then((resp) => setOrders(resp.data.orders));
      //   })
      //   .catch((err) => console.log("err from auth data provider > ", err));
    };
    fetchData();
  }, []);
  return (
    <AuthDataContext.Provider
      value={{
        cart,
        orders,
        setCart,
        deleteProductFromCart,
        addProductToCart,
        isProductInCart,
      }}
    >
      {children}
    </AuthDataContext.Provider>
  );
};

const useAuthData = () => {
  const context = useContext(AuthDataContext);
  if (!context) {
    throw new Error("AuthDataContext is not defined");
  }

  return context;
};

export { AuthDataProvider, useAuthData };
