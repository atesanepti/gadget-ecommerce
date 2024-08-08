import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import {
  removeFromCart,
  addToCart,
} from "../../redux/features/cart/cartSlice.js";

const Carts = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.carts);
  console.log("cart", cart);
  const { cartItems } = cart;

  const deleteFromCartHandler = (item) => {
    dispath(removeFromCart(item._id));
  };

  const reAddInCartHandler = (item, quantity) => {
    dispath(addToCart({ ...item, quantity }));
  };

  return (
    <div className="w-full md:w-4/5 mx-auto text-white py-10">
      <h4 className="text-xl font-bold ">Cart Items </h4>
      {cartItems.length == 0 && (
        <span className="text-gray-400 text-sm text-center block my-6">
          No cart found
        </span>
      )}

      {cartItems.length != 0 && (
        <div className="mt-10 w-full md:w-[80%] mx-auto flex flex-col gap-4">
          {cartItems.map((item) => (
            <div className="flex w-full items-center    " key={item._id}>
              <div className="w-[80px] md:w-[100px] aspect-[4/3">
                <img
                  src={item.image}
                  alt="product"
                  className="w-full h-full rounded-sm"
                />
              </div>

              <div className="flex-1 px-4 flex items-center justify-between">
                <div>
                  <Link
                    to={`/productDetails/${item._id}`}
                    className="text-xs md:text-sm !line-clamp-1 md:!line-clamp-2 text-pink-600 font-medium block "
                  >
                    {item.name}
                  </Link>
                  <div className="flex gap-5 md:gap-0 md:flex-col">
                    <span className="text-xs md:text-sm text-gray-300  font-medium block ">
                      {item.brand}
                    </span>
                    <span className="text-sm  md:text-base  font-bold block ">
                      ${item.price}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <select
                    className="bg-[#19191b] text-white text-sm block p-1 md:p-2 rounded-sm w-[3rem] md:w-[6rem]"
                    value={item.quantity}
                    onChange={(e) => {
                      reAddInCartHandler(item, Number(e.target.value));
                    }}
                  >
                    {[...Array(item.stock)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>

                  <FaTrash
                    className="text-sm  md:text-base cursor-pointer text-red-600 "
                    onClick={() => deleteFromCartHandler(item)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length != 0 && (
        <div className="mt-10">
          <h4 className="text-lg font-semibold mb-2">
            {cartItems.length == 1 ? "Item" : "Items"} ({cartItems.length})
          </h4>
          <div className="w-[300px] mx-auto md:mx-0 md:w-[500px]">
            <div className="flex items-center justify-between w-full">
              <span className="text-xs md:text-sm font-medium text-gray-300">
                Shipping :{" "}
              </span>
              <span className="text-xs md:text-sm text-gray-300 font-medium">
                ${cart.shippingPrice}{" "}
              </span>
            </div>
            <div className="flex items-center justify-between w-full">
              <span className="text-xs md:text-sm font-medium text-gray-300">
                Tax :{" "}
              </span>
              <span className="text-xs md:text-sm text-gray-300 font-medium">
                ${cart.taxPrice}{" "}
              </span>
            </div>
            <div className="flex items-center justify-between w-full">
              <span className="text-xs md:text-sm font-medium text-gray-300">
                Item Price :{" "}
              </span>
              <span className="text-xs md:text-sm text-gray-300 font-medium">
                $
                {cartItems
                  .reduce((acc, item) => {
                    return acc + Number(item.price) * Number(item.quantity);
                  }, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between w-full border-t border-t-gray-400 mt-5">
              <span className="text-xs md:text-sm font-medium">
                Total Price :{" "}
              </span>
              <span className="text-sm md:text-lg font-bold">
                ${cart.totalPrice}{" "}
              </span>
            </div>
            <button
              onClick={() => navigate("/shipping")}
              className="font-medium mt-3 w-full bg-pink-600 text-white text-xs md:text-sm cursor-pointer py-2  rounded-2xl"
            >
              Prossed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carts;
