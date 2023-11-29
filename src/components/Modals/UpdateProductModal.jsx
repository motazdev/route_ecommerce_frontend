import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { SelectMenu } from "../SelectOptions/SelectMenu";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useData } from "../../contexts/DataProvider";
import { toast } from "sonner";
import { Image } from "lucide-react";
import * as Progress from "@radix-ui/react-progress";

export const UpdateProductModal = ({
  open,
  closeM,
  productId,
  data,
  // products,
  brands,
  categories,
  subcategories,
}) => {
  const [categHandler, setCategHandler] = useState({});
  const [newData, setNewData] = useState({});
  const { products, setProducts } = useData();
  const [uploadedFile, setUploadedFile] = useState(false);
  const [uploadedSubFile, setUploadedSubFile] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  console.log("products :: : ", products);
  const [canUpdate, setCanUpdate] = useState(false);
  const { auth } = useAuth();
  const isOldValue = (oldVal, newVal) => {
    if (oldVal && oldVal.toString() === newVal.toString()) {
      setCanUpdate(false);
    } else {
      setCanUpdate(true);
    }
  };
  const handleFileChange = (e) => {
    console.log("filesss: ", e.target.files);
    const file = e.target.files[0];
    console.log("heyy");
    // Display the selected image
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedFile(event.target.result);
      };
      reader.readAsDataURL(file);
    }

    setUploadedFile(file);
  };

  const handleSubFileChange = (e) => {
    const file = e.target.files[0];

    // Display the selected image
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedSubFile(event.target.result);
      };
      reader.readAsDataURL(file);
    }

    setUploadedSubFile(file);
  };
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [prodId, setProdId] = useState(null);
  const updateProduct = (e) => {
    e.preventDefault();
    setLoadingUpdate(true);

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    formJson.category = newData.category;
    formJson.subcategory = newData.subcategory;
    formJson.brand = newData.brand;
    formJson.status = newData.status;
    console.log("FORM JSON: ", formJson);
    console.log("Form data: ", formData);
    // setNewData({
    //   name: newData.name || data[0]?.name,
    //   price: newData.price || data[0]?.price,
    //   // discount: newData.discount > 0 ? newData.discount : null,
    //   ...(newData.discount > 0 ||
    //     (!data[0].discount && { discount: newData.discount })),
    //   description: newData.description || data[0]?.description,
    //   brand: newData.brand || data[0]?.brand,
    //   category: newData.category || data[0]?.category,
    //   subcategory: newData.subcategory || data[0]?.subcategory,
    //   availableItems: newData.availableItems || data[0]?.availableItems,
    //   status: newData.status || data[0]?.status,
    // });
    if (formJson.defaultImage) {
      newData.defaultImage = formJson.defaultImage;
    }
    console.log("newData : >>> >>> >>> ", newData);

    axios
      .patch(
        `https://route-ecommerce-lemon.vercel.app/product/${productId}`,
        newData,
        {
          headers: {
            token: `${process.env.REACT_APP_BEARER_KEY}${auth?.userData.refreshToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        let updatedProducts = products.map((item) => {
          if (item._id === productId) {
            console.log("DATA FROM HERE", data[0]);
            return {
              ...item,
              name: newData.name || data[0]?.name,
              price: newData?.price || data[0]?.price,
              ...(newData.discount > 0 && { discount: newData.discount }),
              description: newData.description || data[0]?.description,
              brand: newData.brand || data[0]?.brand,
              category: newData.category || data[0]?.category,
              subcategory: newData.subcategory || data[0]?.subcategory,
              availableItems: newData.availableItems || data[0]?.availableItems,
              status: newData.status || data[0]?.status,
            }; //gets everything that was already in item, and updates "done"
          }
          return item; // else return unmodified item
        });
        console.log("updatedProducts : ", updatedProducts);
        setProducts(updatedProducts);
        setNewData(newData);
        console.log("update res : ", res);
        setLoadingUpdate(false);
        closeM();
        toast.success("Product Updated Successfully");
      });
  };

  console.log("Data: ", data);
  console.log("new Data: ", newData);
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeM}>
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
            <div
              id={productId}
              className="flex min-h-full items-center justify-center p-4 text-center"
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Update Product
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={updateProduct} action="post">
                      <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                          <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Product Information
                          </h2>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-5">
                              <label
                                htmlFor="first-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Product Name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  onChange={(e) => {
                                    isOldValue(data[0]?.name, e.target.value);
                                    setNewData({
                                      ...newData,
                                      name: e.target.value,
                                    });
                                  }}
                                  defaultValue={data[0]?.name}
                                  name="name"
                                  id="name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-1">
                              <label
                                htmlFor="last-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Quantity
                              </label>
                              <div className="mt-2">
                                <input
                                  onChange={(e) => {
                                    isOldValue(
                                      data[0]?.availableItems,
                                      e.target.value
                                    );
                                    setNewData({
                                      ...newData,
                                      availableItems: e.target.value,
                                    });
                                  }}
                                  defaultValue={data[0]?.availableItems}
                                  type="number"
                                  name="availableItems"
                                  id="availableItems"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="col-span-full">
                              <label
                                htmlFor="description"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Description
                              </label>
                              <div className="mt-2">
                                <textarea
                                  onChange={(e) => {
                                    isOldValue(
                                      data[0]?.description,
                                      e.target.value
                                    );
                                    setNewData({
                                      ...newData,
                                      description: e.target.value,
                                    });
                                  }}
                                  defaultValue={data[0]?.description}
                                  id="description"
                                  name="description"
                                  rows={3}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              <p className="mt-3 text-sm leading-6 text-gray-600">
                                Write a few sentences about the product.
                              </p>
                            </div>
                          </div>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2 sm:col-start-1">
                              <label
                                htmlFor="status"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Status
                              </label>
                              <div className="mt-2">
                                <select
                                  id="status"
                                  name="status"
                                  onChange={(e) => {
                                    isOldValue(
                                      data[0]?.status,
                                      e.target.value.toLowerCase()
                                    );
                                    setNewData({
                                      ...newData,
                                      status: e.target.value,
                                    });
                                  }}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                  <option>Published</option>
                                  <option>Inactive</option>
                                </select>
                              </div>
                            </div>
                            <div className="sm:col-span-2">
                              <label
                                htmlFor="status"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Price
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  onChange={(e) => {
                                    isOldValue(data[0]?.price, e.target.value);
                                    setNewData({
                                      ...newData,
                                      price: e.target.value,
                                    });
                                  }}
                                  defaultValue={data[0]?.price}
                                  name="price"
                                  id="price"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              <p className="mt-3 text-sm leading-6 text-gray-600">
                                Price With Discount : {data[0]?.finalPrice}
                              </p>
                            </div>
                            <div className="sm:col-span-2">
                              <label
                                htmlFor="status"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Discount
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  onChange={(e) => {
                                    isOldValue(
                                      data[0]?.discount,
                                      e.target.value
                                    );
                                    setNewData({
                                      ...newData,
                                      discount: e.target.value,
                                    });
                                  }}
                                  defaultValue={data[0]?.discount}
                                  name="discount"
                                  id="discount"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-2 sm:col-start-1">
                              <label
                                htmlFor="category"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Category
                              </label>
                              <div className="mt-2">
                                <select
                                  // onChange={handleChange}
                                  onChange={(e) => {
                                    isOldValue(
                                      data[0]?.category.name,
                                      e.target.value
                                    );
                                    setNewData({
                                      ...newData,
                                      category: categories.filter(
                                        (c) => c.name === e.target.value
                                      )[0]._id,
                                    });
                                  }}
                                  id="category"
                                  name="category"
                                  defaultValue={data[0]?.category.name}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                  {categories.map((category) => (
                                    <option
                                      key={category._id}
                                      value={category.name}
                                    >
                                      {category.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="subcategory"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                SubCategory
                              </label>
                              <div className="mt-2">
                                <select
                                  onChange={(e) => {
                                    console.log(
                                      "data[0]?.subcategory.name : ",
                                      data[0]?.subcategory.name
                                    );
                                    console.log(
                                      "e.target.value : ",
                                      e.target.value
                                    );
                                    isOldValue(
                                      data[0]?.subcategory.name,
                                      e.target.value
                                    );
                                    setNewData({
                                      ...newData,
                                      subcategory: subcategories.filter(
                                        (c) => c.name === e.target.value
                                      )[0]._id,
                                    });
                                  }}
                                  id="subcategory"
                                  name="subcategory"
                                  defaultValue={data[0]?.subcategory.name}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                  {categHandler?.subcategs
                                    ? categHandler.subcategs.map((sub) => (
                                        <option key={sub._id}>
                                          {sub.name}
                                        </option>
                                      ))
                                    : subcategories
                                        ?.filter(
                                          (sub) =>
                                            sub.categoryId.name ===
                                            data[0]?.category.name
                                        )
                                        .map((sub) => (
                                          <option key={sub._id}>
                                            {sub.name}
                                          </option>
                                        ))}
                                </select>
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="postal-code"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Brand
                              </label>
                              <div className="mt-2">
                                <select
                                  // onChange={handleChange}
                                  onChange={(e) => {
                                    isOldValue(
                                      data[0]?.brand.name,
                                      e.target.value
                                    );
                                    setNewData({
                                      ...newData,
                                      brand: brands.filter(
                                        (b) => b.name === e.target.value
                                      )[0]._id,
                                    });
                                  }}
                                  id="brand"
                                  name="brand"
                                  defaultValue={data[0]?.brand.name}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                  {brands?.map((brand) => (
                                    <option key={brand._id}>
                                      {brand.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="border-b border-gray-900/10 pb-12">
                          <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Images
                          </h2>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                              <label
                                htmlFor="photo"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Photo
                              </label>
                              <div className="mt-2 flex items-center gap-x-3">
                                {/* <UserCircleIcon
                                  className="h-12 w-12 text-gray-300"
                                  aria-hidden="true"
                                /> */}
                                <img
                                  src={data[0]?.defaultImage.url}
                                  className="w-14"
                                  alt=""
                                />
                                <label
                                  htmlFor="defaultImage"
                                  className="relative cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                  <span>Change</span>
                                  <input
                                    id="defaultImage"
                                    onChange={handleFileChange}
                                    name="defaultImage"
                                    type="file"
                                    className="sr-only"
                                  />
                                </label>
                                <div>
                                  {uploadedFile &&
                                    `${uploadedFile.name} - ${uploadedFile.type}`}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                              <label
                                htmlFor="photo"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Sub images
                              </label>
                              <div className="mt-2 flex items-center gap-x-3">
                                <Image
                                  className="h-12 w-12 text-gray-300"
                                  aria-hidden="true"
                                />

                                <label
                                  htmlFor="subImages"
                                  className="relative cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                  <span>Change</span>
                                  <input
                                    id="subImages"
                                    accept="image/*"
                                    onChange={handleSubFileChange}
                                    name="subImages"
                                    type="file"
                                    className="sr-only"
                                  />
                                </label>
                                <div>
                                  {uploadedSubFile &&
                                    `${uploadedSubFile.name} - ${uploadedSubFile.type}`}
                                </div>
                                {uploadedSubFile && (
                                  <img
                                    src={uploadedSubFile}
                                    alt="Selected Product"
                                    style={{
                                      maxWidth: "100px",
                                      maxHeight: "100px",
                                    }}
                                  />
                                )}
                                {!uploadProgress > 0 && (
                                  // <ProgressBar
                                  //   now={uploadProgress}
                                  //   label={`${uploadProgress}%`}
                                  // />
                                  <Progress.Root
                                    className="relative overflow-hidden bg-gray-300 rounded-full w-[300px] h-[25px]"
                                    style={{
                                      // Fix overflow clipping in Safari
                                      // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
                                      transform: "translateZ(0)",
                                    }}
                                    value={uploadProgress}
                                  >
                                    <Progress.Indicator
                                      className="bg-blue-500 w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
                                      style={{
                                        transform: `translateX(-${
                                          100 - uploadProgress
                                        }%)`,
                                      }}
                                    />
                                  </Progress.Root>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          type="button"
                          onClick={closeM}
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          // onClick={(e) => {
                          //   e.preventDefault();
                          //   updateProduct(data[0]?._id);
                          // }}
                          disabled={!canUpdate ? true : false}
                          className="rounded-md bg-indigo-600 disabled:bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          {loadingUpdate ? (
                            <svg
                              className="animate-spin h-5 w-5 text-white"
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
                          ) : (
                            "Save"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
