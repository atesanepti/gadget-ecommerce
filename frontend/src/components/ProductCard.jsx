import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice.js";
import { CiShoppingCart } from "react-icons/ci";
import Image from "./Image";
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.carts);
  const cartItems = cart.cartItems;

  const isProductInCart = cartItems?.some((c) => product._id == c._id);

  const handleAddToCart = () => {
    if (isProductInCart) {
      dispatch(removeFromCart(product._id));
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  };

  return (
    <div className="w-full bg-[#1a1a1a] rounded h-auto">
      <Link to={`/productDetails/${product._id}`}>
        <div className="w-full aspect-[4/3] relative">
          <div className="invisible hover:visible animate-pulse bg-[#00000057] absolute top-0 left-0 w-full h-full"></div>
          <Image src={product.image} />

          <div className="absolute top-1 md:top-2 right-1 md:right-3">
            <HeartIcon product={product} />
          </div>
          <div className="absolute bottom-1 md:bottom-2 right-1 md:right-3">
            <span className="text-xs md:text-sm text-nowrap block bg-pink-600 opacity-50  text-white p-1 md:px-2 py-1 rounded-2xl ">
              {product.brand}
            </span>
          </div>
        </div>
      </Link>

      <div className="py-2 px-3">
        <div className="flex items-center justify-between">
          <span className="max-w-[80%] text-xs line-clamp-1  md:text-sm font-medium md:!line-clamp-2 text-white">
            {product.name}
          </span>
          <span className="bg-[#ce24a913] text-xs md:text-sm text-pink-600 p-1 md:only:px-2 rounded-xl py-1 font-medium ">
            {/* {product.price.toLocalString("en-US",{
                    
                    })} */}
            ${product.price}
          </span>
        </div>
        <p className="hidden md:block text-xs text-[#e6e5e5b7] mt-2 md:!line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-3 md:mt-5 mb-2 md:mb-3">
          <Link
            className="bg-pink-600 text-white text-xs md:text-sm font-medium rounded-md px-2  md:px-3 py-1"
            to={`/productDetails/${product._id}`}
          >
            Read More
          </Link>

          <button onClick={handleAddToCart}>
            {!isProductInCart ? (
              <CiShoppingCart className="text-white text-xl md:text-2xl cursor-pointer" />
            ) : (
              <CiShoppingCart className="text-pink-600 text-xl md:text-2xl " />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
