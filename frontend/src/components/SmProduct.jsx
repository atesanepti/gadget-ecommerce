import React from "react";
import HeartIcon from "./HeartIcon";
import { Link } from 'react-router-dom';

const SmProduct = ({ product }) => {
  return (
    <div className="bg-[#151515] overflow-hidden rounded-md">
      <div className="w-full aspect-[4/3] relative  ">
        <img className="w-full h-full  " src={product.image} />
        <HeartIcon product={product} />
      </div>
      <div className="flex items-center justify-between gap-3 px-2 md:px-3 py-1 md:py-2">
        <span className="text-xs text-gray-300 !line-clamp-2">
          <Link to={`/productDetails/${product._id}`} className=" line-clamp-1">
            {product.name}
          </Link>
        </span>
        <span className="inline-block text-xs text-pink-600 font-semibold bg-[#bb1f941e] p-1 md:p-2 rounded-3xl">
          ${product.price}
        </span>
      </div>
    </div>
  );
};

export default SmProduct;
