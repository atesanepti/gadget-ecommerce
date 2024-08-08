import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  savePaymentMethod,
  saveShippingAddress,
} from "../../redux/features/cart/cartSlice.js";
import { useNavigate } from "react-router";
import OrderProgress from "./../../components/OrderProgress.jsx";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.carts);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress.address]);

  const handleNavigateToPlaceholder = () => {
    dispatch(savePaymentMethod(paymentMethod));
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/placeorder");
  };

  return (
    <div className="w-full md:w-4/5 h-screen flex flex-col gap-10 items-center  mx-auto text-white py-5">
      <div>
        <OrderProgress step1 step2 />
      </div>

      <div className="w-[350px] md:w-[400px] p-3 md:p-5 ">
        <h4 className="text-base font-medium mb-3">Shipping</h4>
        <div className="w-full">
          <div className="mb-2">
            <label htmlFor="address" className="text-xs text-gray-100">
              Address
            </label>
            <input
              type="text"
              className="text-gray-100 border-gray-600 text-sm focus:outline block w-full border rounded bg-transparent px-3 py-2"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="city" className="text-xs text-gray-100">
              City
            </label>
            <input
              type="text"
              className="focus:outline block w-full border border-gray-600 rounded bg-transparent px-3 py-2"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="post_code" className="text-xs text-gray-100">
              Post Code
            </label>
            <input
              type="text"
              className="focus:outline block w-full border rounded border-gray-600 bg-transparent px-3 py-2"
              id="post_code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="country" className="text-xs text-gray-100">
              Country
            </label>
            <input
              type="text"
              className="focus:outline block w-full border border-gray-600 rounded bg-transparent px-3 py-2"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <span className="text-base text-gray-400 font-semibold">
              Select Payment Method
            </span>
            <br />
            <div className="flex item-center mt-3 gap-1">
              <input
                type="radio"
                id="payment"
                name="payment"
                value={paymentMethod}
                checked={paymentMethod == "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="payment" className="text-xs ">
                Paypal Or Credite Card
              </label>
            </div>
          </div>

          <button
            disabled={!address || !city || !postalCode || !country}
            onClick={handleNavigateToPlaceholder}
            className="w-full block mt-4 bg-pink-600 text-white text-sm cursor-pointer py-2 rounded-2xl"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
