import React, { useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "../../utils/ValidationSchema.js";
import useAuth from "../../hooks/useAuth.js";
import { signInUser } from "../../service/auth.js";
import { Toaster } from "sonner";
import { Eye, EyeOff } from "lucide-react";
export const Login = () => {
  const { setAuth, setPresist, auth, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const userRef = useRef(null);

  // Login Form Handler
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    await signInUser(data).then((res) => {
      if (!res.errors) {
        const accessToken = res?.token;
        if (res.authUserState.role === "admin") {
          isAdmin(true);
        } else {
          isAdmin(false);
        }
        setPresist(data.remeberMe);
        localStorage.setItem("presist", data.remeberMe);

        setAuth({ userData: res.authUserState, accessToken });
        navigate(from, { replace: true });
      }
    });
    setIsLoading(false);
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
          Sign in to your account
        </h2>
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
                ref={userRef}
                {...register("email", { required: true })}
                id="email"
                onChange={(e) => setEmail(e.target.value)}
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
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-slate-800"
              >
                Password
              </label>

              <div className="text-sm">
                <Link
                  to="/forgetpassword"
                  state={{ email }}
                  relative="path"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2 relative block">
              <input
                id="password"
                {...register("password", { required: true })}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="*******"
                autoComplete="current-password"
                required
                className="block w-full bg-slate-100 shadow-md shadow-slate-200 rounded-md border-0 py-1.5 text-slate-900 ring-0 ring-inset ring-gray-800 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </span>
            </div>
            {errors.password && (
              <p className="mt-3 text-sm leading-6 text-rose-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <div className="mt-2 flex justify-start items-center">
              <input
                id="remeberMe"
                {...register("remeberMe", { required: true })}
                type="checkbox"
                value=""
                name="remeberMe"
                // onChange={togglePresist}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm justify-start items-center font-medium text-gray-900 dark:text-gray-300"
              >
                Remeber Me
              </label>
            </div>
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
                Login
              </button>
            )}
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          New member?{" "}
          <Link
            to="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
