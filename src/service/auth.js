import { toast } from "sonner";
import axios from "../api/axios";

export const signUpUser = async (data) => {
  try {
    const res = await axios.post(
      "https://route-ecommerce-lemon.vercel.app/auth/register",
      {
        userName: data.username,
        email: data.email,
        address: data.address,
        password: data.password,
        confirmPassword: data.password,
        gender: data.gender,
      }
    );
  } catch (error) {
    console.log("error: ", error);
    console.log(error.response.data.message);
  }
};

export const signInUser = async (data) => {
  try {
    const res = await axios.post(
      "https://route-ecommerce-lemon.vercel.app/auth/login",
      {
        email: data.email,
        password: data.password,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log("rESSS:", res);
    return res.data;
  } catch (error) {
    toast.error("error: ", error);
    toast.error(error.response.data.message);
    error.errors = error.response.data;
    return error;
  }
};

export const sendForgetPasswordCode = async (data) => {
  try {
    const res = await axios.patch(
      "https://route-ecommerce-lemon.vercel.app/auth/forgetCode",
      {
        email: data.email,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log("rESSS:", res);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    error.errors = error.response.data;
    return error;
  }
};

export const resetPassword = async (data) => {
  try {
    const res = await axios.patch(
      "https://route-ecommerce-lemon.vercel.app/auth/resetPassword",
      {
        forgetCode: data.code,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
      {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      }
    );
    console.log("rESSS:", res);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    error.errors = error.response.data;
    return error;
  }
};

export const changePassword = async (data, auth) => {
  try {
    const res = await axios.patch(
      "https://route-ecommerce-lemon.vercel.app/auth/changePassword",
      {
        currentPassword: data.currentPassword,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
      {
        headers: {
          ssssssss: "SAfasfasf",
          "Content-Type": "application/json",
          token: `${process.env.REACT_APP_BEARER_KEY}${auth?.userData.refreshToken}`,
        },
      }
    );
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    console.log("from apiiiiii");
    toast.error(error.response.data.message);
    error.errors = error.response.data;
    return error;
  }
};
