import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import PhoneInput from "react-phone-number-input/input";
import { LoadingCircle } from "../layout/LoadingCircle";
import axios from "../../api/axios";
import { updateUserInfoApi } from "../../api/user";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuth";

export const UpdateUserInfo = () => {
  const { auth } = useAuth();

  const [updateInfoLoading, setUpdateInfoLoading] = useState(false);

  const [value, setValue] = useState();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  const updateUserInfo = async (e) => {
    e.preventDefault();
    setUpdateInfoLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    await updateUserInfoApi(
      formJson,
      `${process.env.REACT_APP_BEARER_KEY}${auth.userData.refreshToken}`
    )
      .then((resp) => {
        toast.success(resp.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => setUpdateInfoLoading(false));
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
                <form action="post" onSubmit={updateUserInfo}>
                  <Dialog.Title
                    as="h3"
                    className="text-lg  font-medium leading-6 text-gray-900"
                  >
                    Please update your information to proceed
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="border-b border-gray-900/10 pb-12">
                      {/* <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Personal Information
                      </h2> */}
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        This will be your default address & phone number
                      </p>

                      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="street-address"
                              id="street-address"
                              autoComplete="street-address"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3 sm:col-start-1">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="city"
                              id="city"
                              autoComplete="address-level2"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="region"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Phone
                          </label>
                          <div className="mt-2">
                            <PhoneInput
                              country="EG"
                              international
                              countrycallingcodeeditable="false"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              value={value}
                              name="phone"
                              id="phone"
                              withCountryCallingCode={true}
                              defaultCountry="EG"
                              onChange={setValue}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent transition-all duration-200  bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      {updateInfoLoading ? (
                        <LoadingCircle widthAndHeight={5} />
                      ) : (
                        "Confirm & Proceed to checkout"
                      )}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent border-blue-300 transition-all duration-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
