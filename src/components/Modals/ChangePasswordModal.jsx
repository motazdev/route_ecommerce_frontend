import { Dialog, Transition } from "@headlessui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { changePasswordSchema } from "../../utils/ValidationSchema";
import { Eye, EyeOff, X } from "lucide-react";
import { changePassword } from "../../service/auth";
import useAuth from "../../hooks/useAuth";
import { toast } from "sonner";

export const ChangePasswordModal = ({ isOpen, closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
  });

  const { auth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(changePasswordSchema),
  });
  const onSubmit = async (data) => {
    setIsLoading(true);
    await changePassword(data, auth)
      .then((d) => {
        console.log("Dd: ", d);
        // if (!d.errors) {

        // }
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <div className="flex border-b-[1px] border-gray-200 pb-2 flex-row justify-between items-center">
                    Change Password
                    <X
                      className="cursor-pointer"
                      onClick={closeModal}
                      size={17}
                    />
                  </div>
                </Dialog.Title>
                <div className="mt-2">
                  <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                    method="post"
                  >
                    <div>
                      <label
                        htmlFor="currentPassword"
                        className="block text-sm font-medium leading-6 text-slate-800"
                      >
                        Current Password
                      </label>

                      <div className="mt-2 relative block">
                        <input
                          {...register("currentPassword", { required: true })}
                          id="currentPassword"
                          name="currentPassword"
                          type={showPassword.current ? "text" : "password"}
                          placeholder="**********"
                          required
                          className="block w-full placeholder:text-gray-400 bg-slate-100 shadow-md shadow-slate-200 rounded-md border-0 py-1.5 text-slate-900 ring-0 ring-inset ring-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <span
                          className="absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer"
                          onClick={() =>
                            setShowPassword({
                              ...showPassword,
                              current: !showPassword.current,
                            })
                          }
                        >
                          {!showPassword.current ? (
                            <EyeOff size={15} />
                          ) : (
                            <Eye size={15} />
                          )}
                        </span>
                      </div>
                      {errors.currentPassword && (
                        <p className="mt-3 text-sm leading-6 text-rose-500">
                          {errors.currentPassword.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-slate-800"
                      >
                        New Password
                      </label>

                      <div className="mt-2 relative block">
                        <input
                          {...register("password", { required: true })}
                          id="password"
                          name="password"
                          type={showPassword.new ? "text" : "password"}
                          placeholder="**********"
                          required
                          className="block w-full placeholder:text-gray-400 bg-slate-100 shadow-md shadow-slate-200 rounded-md border-0 py-1.5 text-slate-900 ring-0 ring-inset ring-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <span
                          className="absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer"
                          onClick={() =>
                            setShowPassword({
                              ...showPassword,
                              new: !showPassword.new,
                            })
                          }
                        >
                          {!showPassword.new ? (
                            <EyeOff size={15} />
                          ) : (
                            <Eye size={15} />
                          )}
                        </span>
                      </div>
                      {errors.password && (
                        <p className="mt-3 text-sm leading-6 text-rose-500">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium leading-6 text-slate-800"
                      >
                        Confirm New Password
                      </label>

                      <div className="mt-2 relative block">
                        <input
                          {...register("confirmPassword", { required: true })}
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword.new ? "text" : "password"}
                          placeholder="**********"
                          required
                          className="block w-full placeholder:text-gray-400 bg-slate-100 shadow-md shadow-slate-200 rounded-md border-0 py-1.5 text-slate-900 ring-0 ring-inset ring-gray-800  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <span
                          className="absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer"
                          onClick={() =>
                            setShowPassword({
                              ...showPassword,
                              new: !showPassword.new,
                            })
                          }
                        >
                          {!showPassword.new ? (
                            <EyeOff size={15} />
                          ) : (
                            <Eye size={15} />
                          )}
                        </span>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-3 text-sm leading-6 text-rose-500">
                          {errors.confirmPassword.message}
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
                          Change Password
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
