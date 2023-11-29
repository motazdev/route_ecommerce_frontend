import useAuth from "../hooks/useAuth.js";
import { useState } from "react";
import { ChangePasswordModal } from "../components/Modals/ChangePasswordModal.jsx";

export default function Profile() {
  const { auth } = useAuth();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div>
      <ChangePasswordModal isOpen={isOpen} closeModal={closeModal} />

      <div className="px-4 sm:px-0">
        <h3 className="text-2xl font-semibold leading-7 text-gray-900">
          Profile
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Edit your details, view your information and change your password
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Username
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                value={auth?.userData.userName}
                disabled
                className="border-0 bg-gray-200  rounded-md py-2 text-sm"
              />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Password
            </dt>
            <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div className="space-y-6">
                <button
                  onClick={openModal}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Change Password
                </button>
              </div>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {auth?.userData?.email}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {auth?.userData.address}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
