
import { useSelector } from "react-redux";

const CartCount = () => {
  const cart = useSelector((state) => state.carts);
  const {cartItems} = cart;
  const cartItemsLength = cartItems?.length || 0;
  return (
    <>
      {cartItemsLength > 0 && (
        <div className="absolute w-4 h-4 flex items-end justify-center top-[-10px] right-0 bg-pink-600 text-white text-[10px] rounded-full">
          {cartItemsLength}
        </div>
      )}
    </>
  );
};

export default CartCount;

