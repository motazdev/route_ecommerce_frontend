import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Toaster } from "sonner";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { forgetCodeSchema } from "../../utils/ValidationSchema";
import { sendForgetPasswordCode } from "../../service/auth";

export const ForgetPassword = () => {
  const location = useLocation();
  console.log("location : ", location);
  const { email } = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const { setAuth, setPresist, auth, isAdmin } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(forgetCodeSchema),
  });

  const onSubmit = async (data) => {
    await sendForgetPasswordCode(data).then((resp) => {
      if (resp.success) {
        navigate("/resetpassword", {
          replace: true,
          state: { userEmail: data.email },
        });
      }
    });
  };
  return auth?.accessToken ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Toaster richColors />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <svg
          data-icon-name="bag-alt-1"
          data-style="line-color"
          icon_origin_id="17501"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          data-name="Line Color"
          id="bag-alt-1"
          className="mx-auto w-auto icon line-color"
          width="70"
          height="70"
        >
          <path
            style={{
              fill: "none",
              stroke: "rgb(140, 117, 252)",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 1,
            }}
            d="M12,17V13M8,17V13m8,4V13"
            id="secondary"
          ></path>
          <path
            style={{
              fill: "none",
              stroke: "rgb(55, 48, 163)",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 1,
            }}
            d="M18.15,21H5.85a1,1,0,0,1-1-.84L3,9H21L19.14,20.16A1,1,0,0,1,18.15,21ZM9,3,7,9m8-6,2,6"
            id="primary"
          ></path>
        </svg>

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-700">
          Recover Password
        </h2>
        <p className="text-gray-400 text-center text-sm">
          Enter your email and we'll send you a code to reset your password.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          method="post"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-slate-800"
            >
              Email address
            </label>

            <div className="mt-2">
              <input
                {...register("email", { required: true })}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="example@ex.com"
                required
                className="block w-full bg-slate-100 shadow-md shadow-slate-200 rounded-md border-0 py-1.5 text-slate-900 ring-0 ring-inset ring-gray-800 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.email && (
              <p className="mt-3 text-sm leading-6 text-rose-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            {isLoading ? (
              <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <svg
                  className="animate-spin mx-[10.7px] h-6 w-6 text-white"
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
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send Code
              </button>
            )}
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Try to login again ?{" "}
          <Link
            to="/login"
            relative="path"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
