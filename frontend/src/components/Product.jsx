import React from "react";
import HeartIcon from './HeartIcon';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className="bg-[#151515] overflow-hidden relative rounded-md">
      <div className=" w-full  aspect-[4/3]">
        <img src={product.image} className="w-full h-full " />
        <HeartIcon product={product} />
      </div>
    
      <div className="flex justify-between  px-2 md:px-3 py-1 md:py-2 gap-4 items-center">
        <span className="text-white text-xs md:text-sm">
          <Link to={`/productDetails/${product._id}`} className="line-clamp-1">
            {product.name}
          </Link>
        </span>
        <span className="text-pink-600 font-semibold block bg-[#bb1f941e] w-[70px] text-xs rounded-2xl px-2 md:px-4 py-1 md:py-2">
          ${product.price}
        </span>
      </div>
    </div>
  );
};

export default Product;
