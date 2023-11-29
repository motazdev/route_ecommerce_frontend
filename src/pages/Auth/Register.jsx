import joi from "joi";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../../utils/ValidationSchema.js";
import { joiResolver } from "@hookform/resolvers/joi";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { signUpUser } from "../../service/auth.js";
export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(registerSchema),
  });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setIsLoading(true);
    await signUpUser(data).then(() => setIsLoading(false));
    navigate("/confirm-email", { replace: true });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
          Create new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="post"
          className="space-y-6"
        >
          {/* username */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-slate-800"
              >
                Username
              </label>
              <div className="text-xs">
                {errors.username && (
                  <span className="text-rose-600 font-semibold">
                    {errors.username.message}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-2">
              <input
                {...register("username", { required: true })}
                id="username"
                name="username"
                type="text"
                placeholder="example_"
                className="block w-full bg-slate-100 shadow-md shadow-slate-200 rounded-md border-0 py-1.5 text-slate-900 ring-0 ring-inset ring-gray-800 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* Email */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-slate-800"
              >
                Email
              </label>
              <div className="text-xs">
                {errors.email && (
                  <span className="text-rose-600 font-semibold">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-2">
              <input
                {...register("email", { required: true })}
                id="email"
                name="email"
                type="email"
                placeholder="example@ex.com"
                autoComplete="email"
                className="block w-full bg-slate-100 shadow-md shadow-slate-200 rounded-md border-0 py-1.5 text-slate-900 ring-0 ring-inset ring-gray-800 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-slate-800"
              >
                Password
              </label>
              <div className="text-xs">
                {errors.password && (
                  <span className="text-rose-600 font-semibold">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-2 relative block">
              <input
                {...register("password", { required: true })}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="*******"
                autoComplete="current-password"
                className="block w-full bg-slate-100 shadow-md shadow-slate-200 rounded-md border-0 py-1.5 text-slate-900 ring-0 ring-inset ring-gray-800 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z"
                      fill="white"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
                      fill="white"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="cpassword"
                className="block text-sm font-medium leading-6 text-slate-800"
              >
                Confirm Password
              </label>
              <div className="text-xs">
                {errors.cpassword && (
                  <span className="text-rose-600 font-semibold">
                    {errors.cpassword.message}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-2 relative block">
              <input
                {...register("cpassword", { required: true })}
                id="cpassword"
                name="cpassword"
                type={showPassword ? "text" : "password"}
                placeholder="*******"
                autoComplete="current-password"
                className="block w-full bg-slate-100 shadow-md shadow-slate-200 rounded-md border-0 py-1.5 text-slate-900 ring-0 ring-inset ring-gray-800 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />

              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z"
                      fill="white"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
                      fill="white"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </span>
            </div>
          </div>
          {/* Address */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-slate-800"
              >
                Address
              </label>
            </div>
            <div className="mt-2">
              <input
                {...register("address", { required: true })}
                id="address"
                name="address"
                type="text"
                placeholder="32, My Street, Kingston, New York"
                autoComplete="current-password"
                className="block w-full bg-slate-100 shadow-md shadow-slate-200 rounded-md border-0 py-1.5 text-slate-900 ring-0 ring-inset ring-gray-800 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* Gender */}
          <div className="flex flex-row items-center">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-slate-800"
              >
                Gender
              </label>
            </div>
            <div className="ml-3">
              <ul className="flex flex-wrap items-center justify-center text-gray-900 dark:text-white">
                <div className="flex items-center">
                  <input
                    id="male"
                    {...register("gender", { required: true })}
                    type="radio"
                    value="male"
                    name="gender"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="male"
                    className="ml-2 mr-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Male
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="female"
                    {...register("gender", { required: true })}
                    type="radio"
                    value="female"
                    name="gender"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="female"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Female
                  </label>
                </div>
              </ul>
            </div>
          </div>
          <div className="flex justify-start text-xs">
            {errors.gender && (
              <span className="text-rose-600 font-semibold">
                {errors.gender.message}
              </span>
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
                Register
              </button>
            )}
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
