import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  useFetchOrderByIdQuery,
  useUpdateDeliveryMutation,
  useFetchOrderClientIdQuery,
} from "../../redux/api/ordeApiSlice.js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import Loader from "./../../components/Loader";
import { Link } from "react-router-dom";

const Order = () => {
  const { orderId } = useParams();
  const {
    data: orders,
    refetch,
    isLoading: orderLoading,
    error: orderError,
  } = useFetchOrderByIdQuery(orderId);
  console.log("order", orderError);
  const [updateDeliveryApiCall, { isLoading, loadingDelivery }] =
    useUpdateDeliveryMutation();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { data: paypal, isLoading: loadingPaypal } =
    useFetchOrderClientIdQuery();

  useState(() => {
    if (!loadingPaypal) {
      const loadingPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            clientId: paypal.config.client,
            currency: "USD",
          },
        });

        paypalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };
      if (orders && !orders.isPaid) {
        if (!window.paypal) {
          loadingPaypalScript();
        }
      }
    }
  }, [loadingPaypal, orders]);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: orders.totalPrice } }],
      })
      .then((orderId) => {
        return orderId;
      });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details });
        refetch();
      } catch (error) {
        alert(error.message);
        console.error(error);
      }
    });
  };

  const onError = (error) => {
    alert(error.message);
    console.error(error);
  };
  return (
    <div className="w-full md:w-[90%] mx-auto py-5">
      {orderLoading && <Loader />}

      {!orderLoading && orders && (
        <div className="flex flex-col lg:flex-row gap-5 text-white">
          <div className="w-full md:w-[70%] overflow-auto">
            <div className="max-h-[20rem] w-full mim-w-[500px]">
              <table className="w-full table-auto border border-gray-600">
                <thead>
                  <tr className="border-b border-b-gray-600">
                    <td className="p-2 text-left uppercase text-xs md:text-sm font-medium">
                      Image
                    </td>
                    <td className="p-2 text-left uppercase text-xs md:text-sm font-medium">
                      Product
                    </td>
                    <td className="p-2 text-left uppercase text-xs md:text-sm font-medium">
                      Quantity
                    </td>
                    <td className="p-2 text-left uppercase text-xs md:text-sm font-medium">
                      Price
                    </td>
                    <td className="p-2 text-left uppercase text-xs md:text-sm font-medium">
                      Total
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {orders.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2 text-left ">
                        <img
                          src={item.image}
                          className="w-[100px] aspect-[4/3]"
                        />
                      </td>
                      <td className="p-2 text-left uppercase  text-xs md:text-sm font-medium">
                        <Link
                          className="line-clamp-1 md:line-clamp-2"
                          to={`/productDetails/${item.product}`}
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td className="p-2 text-left uppercase text-xs md:text-sm font-medium">
                        {item.quantity}
                      </td>
                      <td className="p-2 text-left uppercase text-xs md:text-sm font-medium">
                        ${item.price}
                      </td>
                      <td className="p-2 text-left uppercase text-xs md:text-sm font-medium">
                        ${item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="w-full md:w-[30%] flex flex-col gap-10">
            <div className="w-full">
              <h4 className="text-base md:text-lg mb-3 text-white font-medium">
                Shipping
              </h4>
              <ul className="flex flex-col gap-2">
                <li className="flex gap-1">
                  <span className="text-xs md:text-sm text-pink-600 font-medium">
                    Order{" "}
                  </span>
                  <span className="text-xs md:text-sm ">{orders._id}</span>
                </li>
                <li className="flex gap-1">
                  <span className="text-xs md:text-sm text-pink-600 font-medium">
                    Name{" "}
                  </span>
                  <span className="text-xs md:text-sm ">
                    {userInfo.username}
                  </span>
                </li>
                <li className="flex gap-1">
                  <span className="text-xs md:ext-sm text-pink-600 font-medium">
                    Email{" "}
                  </span>
                  <span className="text-xs md:text-sm ">{userInfo.email}</span>
                </li>
                <li className="flex gap-1">
                  <span className="text-xs md:text-sm text-pink-600 font-medium">
                    Address{" "}
                  </span>
                  <span className="text-sm ">
                    {orders.shippingAddress.address},
                    {orders.shippingAddress.city},
                    {orders.shippingAddress.postalCode},
                    {orders.shippingAddress.country}
                  </span>
                </li>
                <li className="flex gap-1">
                  <span className="text-xs md:text-sm text-pink-600 font-medium">
                    Method{" "}
                  </span>
                  <span className="text-xs md:text-sm capitalize">
                    {orders.paymentMethod}
                  </span>
                </li>
              </ul>
              {orders.isPaid ? (
                <div className="bg-[#2cdd3b3a] text-green-500 text-xs md:text-sm px-4 py-2 my-2">
                  Paid
                </div>
              ) : (
                <div className="bg-[#3097f817] text-blue-400 px-4 py-2 text-xs md:text-sm font-semibold my-2">
                  Not Paid
                </div>
              )}
            </div>

            <div className="w-full">
              <h4 className="text-base mb-2 md:text-lg text-white font-medium">
                Order Summary
              </h4>
              <ul className="flex flex-col gap-2">
                <li className="flex gap-1 justify-between">
                  <span className="text-xs md:text-sm  font-medium">
                    Items{" "}
                  </span>
                  <span className="text-xs md:text-sm font-medium">
                    ${orders.itemsPrice}
                  </span>
                </li>
                <li className="flex gap-1 justify-between">
                  <span className="text-xs md:text-sm  font-medium">
                    Shipping
                  </span>
                  <span className="text-xs md:text-sm font-medium">
                    ${orders.shippingPrice}
                  </span>
                </li>
                <li className="flex gap-1 justify-between">
                  <span className="text-xs md:text-sm  font-medium">Tax </span>
                  <span className="text-xs md:text-sm font-medium">
                    ${orders.taxPrice}
                  </span>
                </li>
                <li className="flex gap-1 justify-between">
                  <span className="text-xs md:text-sm  font-medium">
                    Total{" "}
                  </span>
                  <span className="text-xs md:text-sm  font-medium">
                    ${orders.totalPrice}
                  </span>
                </li>
              </ul>

              {!orders.isPaid && (
                <div>
                  {loadingPaypal && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div className="mt-4">
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
