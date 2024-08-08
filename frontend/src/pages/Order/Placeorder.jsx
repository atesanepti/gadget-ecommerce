import { useEffect, useState } from "react";
import OrderProgress from "../../components/OrderProgress.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from "../../redux/api/ordeApiSlice.js";
import { clearCart } from "../../redux/features/cart/cartSlice.js";
import { CiCircleInfo } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { addAction } from "../../redux/features/notice/naticSlice.js";
import { ERROR, SUCCESS } from "../../redux/constants.js";
import Button from "../../components/Button.jsx";
const Placeorder = () => {
  const [info, setInfo] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createOrderApiCall, { isLoading }] = useCreateOrderMutation();
  const cart = useSelector((state) => state.carts);

  const error = (value) => {
    dispatch(addAction({ variant: ERROR, value }));
  };
  const success = (value) => {
    dispatch(addAction({ variant: SUCCESS, value }));
  };

  const orderHandler = async (productId) => {
    const payload = {
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      taxPrice: cart.taxPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.totalPrice,
    };

    try {
      const res = await createOrderApiCall(payload).unwrap();
      if (res.error) {
        return error(res.error);
      }

      navigate(`/order/${res._id}`);
      dispatch(clearCart());
      success("Order placed");
    } catch (err) {
      error(err.data.message);
    }
  };

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress.address, navigate]);

  return (
    <div className="w-full md:w-4/5 mx-auto text-white py-5">
      {cart.cartItems.length !== 0 &&
      cart.shippingAddress &&
      cart.paymentMethod ? (
        <div className="w-full md:w-[50%] mx-auto py-5">
          <OrderProgress step1 step2 step3 />
        </div>
      ) : cart.cartItems.length !== 0 ? (
        <div className="w-[50%] mx-auto py-5">
          <OrderProgress step1 />
        </div>
      ) : null}

      <div className="w-full">
        {cart.cartItems.length == 0 && (
          <span className="text-gray-500 text-sm block text-center my-4">
            Cart is empty
          </span>
        )}
        {cart.cartItems.length !== 0 &&
          !cart.shippingAddress &&
          cart.paymentMethod &&
          info && (
            <div className="w-full py-2 px-4 bg-[#346fee34]  flex gap-2 relative rounded-md mb-3">
              <CiCircleInfo className="text-sm text-blue-600" />
              <span className="text-xs text-gray-100">
                Please add shipping address and payment method -{" "}
                <Link to="/shipping" className="font-semibold ">
                  Shipping
                </Link>
              </span>
              <IoMdClose
                onClick={() => setInfo(false)}
                className="text-white text-base cursor-pointer absolute top-[7px] right-4"
              />
            </div>
          )}

        {cart.cartItems.length !== 0 && (
          <div className="overflow-auto">
            <div className="w-full mx-auto max-h-[20rem] min-w-[520px] ">
              <table className="table-auto w-full  ">
                <thead>
                  <tr>
                    <th className="hidden md:table text-xs md:text-sm font-medium text-left uppercase">
                      Image
                    </th>
                    <th className="text-xs md:text-sm font-medium text-left uppercase">
                      Product
                    </th>
                    <th className="text-xs md:text-sm font-medium text-left uppercase">
                      Quantity
                    </th>
                    <th className="text-xs md:text-sm font-medium text-left uppercase">
                      Price
                    </th>
                    <th className="text-xs md:text-sm font-medium text-left uppercase">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.cartItems?.map((item, index) => (
                    <tr key={index}>
                      <td className="hidden md:table text-xs md:text-sm text-left">
                        <img
                          src={item.image}
                          className="w-[70px] md:w-[100px] aspect-[4/3]"
                        />
                      </td>
                      <td className="text-xs md:text-sm text-left">
                        {item.name}
                      </td>
                      <td className="text-xs md:text-sm text-left">
                        {item.quantity}
                      </td>
                      <td className="text-xs md:text-sm text-left">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="text-xs md:text-sm text-left">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {cart.cartItems.length !== 0 && (
        <div className="mt-9 md:mt-11">
          <h4 className="text-base md:text-lg text-white font-medium">
            Order Summary
          </h4>
          <div className="bg-[#151515] p-3 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-5 md:gap-8 justify-between">
            <ul className="flex-1 flex flex-col gap-1">
              <li className="flex justify-between ">
                <span className="text-xs md:text-xs text-white font-medium">
                  Item Price :{" "}
                </span>
                <span className="text-xs md:text-xs text-white font-medium">
                  ${cart.itemsPrice}
                </span>
              </li>
              <li className="flex justify-between ">
                <span className="text-xs md:text-xs text-white font-medium">
                  Shipping Price :{" "}
                </span>
                <span className="text-xs md:text-xs text-white font-medium">
                  ${cart.shippingPrice}
                </span>
              </li>
              <li className="flex justify-between ">
                <span className="text-xs md:text-xs text-white font-medium">
                  Tax :{" "}
                </span>
                <span className="text-xs md:text-xs text-white font-medium">
                  ${cart.taxPrice}
                </span>
              </li>
              <li className="flex justify-between ">
                <span className="text-xs md:text-xs text-white font-medium">
                  Total :{" "}
                </span>
                <span className="text-xs md:text-xs text-white font-medium">
                  ${cart.totalPrice}
                </span>
              </li>
            </ul>
            <div className="flex-1">
              <h4 className="text-sm md:text-base font-medium text-white">
                Shipping Address
              </h4>
              <span className="text-xs md:text-sm ">
                Address :{" "}
                <span className="text-gray-400">
                  {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.postalCode} ,
                  {cart.shippingAddress.country}
                </span>
              </span>
            </div>
            <div className="flex-1">
              <h4 className="text-sm md:text-base font-medium text-white">
                Paymetn Method
              </h4>
              <span className="text-xs md:text-sm ">
                Method :{" "}
                <span className="text-gray-400 capitalize">
                  {cart.paymentMethod}
                </span>
              </span>
            </div>
          </div>
          <Button
            isLoading={isLoading}
            type="button"
            style="w-full mt-3"
            onClick={orderHandler}
          >
            Place Order
          </Button>
        </div>
      )}
    </div>
  );
};

export default Placeorder;
