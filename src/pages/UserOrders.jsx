import React from "react";
import { useAuthData } from "../contexts/AuthDataProvider";
import * as Accordion from "@radix-ui/react-accordion";
import { Link } from "react-router-dom";

export const UserOrders = () => {
  const { orders } = useAuthData();
  return (
    <div>
      Recent Orders
      <Accordion.Root
        className=" flex my-4 flex-col gap-y-2 rounded-md "
        type="single"
        collapsible
      >
        {orders ? (
          orders.map((order) => (
            <Accordion.Item
              value={order._id}
              className="border-slate-300 group  border-[1px] pt-4 rounded-md"
            >
              <Accordion.Header className="flex  px-3">
                <Accordion.Trigger className=" group cursor-pointer flex-1 items-center justify-between bg-white outline-none">
                  <div className="rounded-md">
                    <div className="flex flex-row justify-between items-center">
                      <h1 className="font-semibold">
                        Order #:{" "}
                        <span className="text-gray-500 group-data-[state=open]:text-indigo-500">
                          {order._id}
                        </span>
                      </h1>
                      <h1>EGP {order.price}</h1>
                    </div>

                    <div className="flex justify-between mb-2 items-center mt-4">
                      <div className="text-left text-gray-500 text-sm">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <p className="bg-indigo-600 border-indigo-600 border-[1px] rounded-xl py-1 text-sm text-white px-2">
                        Placed
                      </p>
                    </div>
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="text-mauve11 pb-0 bg-gray-300/60 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]">
                <div className="py-[15px] px-5">
                  <div className="bg-white shadow-lg rounded-md flex justify-between flex-row py-3 px-3">
                    <div className="flex flex-col">
                      <p className="text-gray-400">Order Number</p>
                      <p className="text-slate-800 font-semibold">
                        # {order._id}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <div className=" text-gray-500 text-sm">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className=" text-gray-500 text-right text-sm">
                        {new Date(order.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pb-[15px] px-5">
                  <div className="bg-white shadow-lg rounded-md flex justify-between flex-col py-3 px-3">
                    <p className="text-lg text-slate-800 font-semibold">
                      Order Details
                    </p>
                    <div className="flex">
                      <p>
                        <span className="text-slate-800 text-sm">
                          Shipped To :{" "}
                        </span>{" "}
                        {order.address}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pb-[15px] px-5">
                  <div className="bg-white shadow-lg rounded-md flex justify-between flex-col py-3 px-3">
                    <p className="text-lg  text-slate-800 font-semibold">
                      Products
                    </p>
                    <div className="flex divide-y flex-col">
                      {order?.products.map((product) => (
                        <div
                          key={product._id}
                          className="product-cart w-full bg-white py-3 rounded-lg px-3 flex flex-row justify-between"
                        >
                          <div relative="path" className="flex prod-info">
                            <Link to={`/pview/${product.productId.slug}`}>
                              <img
                                width={100}
                                src={product.productId.defaultImage?.url}
                                alt=""
                              />
                            </Link>

                            <div className="prod_infos ml-4 py-4 flex flex-col">
                              <Link
                                to={`/pview/${product.productId.slug}`}
                                className="price text-sm"
                                relative="path"
                              >
                                {product.productId.name}
                              </Link>
                              <p className="category flex-1 text-sm text-gray-500">
                                {product.productId.category.name}
                              </p>
                            </div>
                          </div>
                          <div className="price-quantity-update items-end flex flex-col justify-between">
                            <p className="tracking-tight text-base pt-4">
                              EGP {product.totalPrice}
                            </p>
                            <p className="tracking-tight text-gray-400 text-sm">
                              {product.productId.finalPrice} x{" "}
                              {product.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))
        ) : (
          <div>no orders</div>
        )}
      </Accordion.Root>
    </div>
  );
};
