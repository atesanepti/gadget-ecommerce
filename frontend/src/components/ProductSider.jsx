import React from "react";
import Slider from "react-slick";
import { FaHome, FaStopwatch, FaStar, FaShoppingCart } from "react-icons/fa";
import { GiVibratingShield } from "react-icons/gi";
import { RiDatabaseLine } from "react-icons/ri";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { Link } from 'react-router-dom';

const ProductSider = ({products}) => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    
  };

  return (
    <div className=" rounded-lg ">
      <Slider {...settings}>
        {products?.map((product) => (
          <div key={product._id}>
            <div className="w-full aspect-[4/3] ">
              <img
                className="w-full h-full rounded-t-lg "
                src={product.image}
              />
            </div>
            <div className="p-3 flex flex-col items-start gap-4">
              <div className="flex-1 ">
                <span className="inline-block text-gray-300 text-[12px] ">
                  <Link
                    to={`/productDetails/${product._id}`}
                    className="inline-block"
                  >
                    {product.name}
                  </Link>
                </span>

                <p className=" text-gray-400 mt-2 text-[10px] !line-clamp-2">
                  {product.description}
                </p>
              </div>
              <div>
                <span className="text-white text-sm font-semibold">
                  ${product.price}
                </span>
              </div>
              <div className="flex-1 grid grid-cols-3 justify-between gap-2">
                <span className="text-white text-[10px] bg-[#151515] px-2 py-1 rounded-sm">
                  <FaHome className="!inline" /> Brand : {product.brand}
                </span>
                <span className="text-white text-[10px] bg-[#151515] px-2 py-1 rounded-sm">
                  <FaStopwatch className="!inline" /> Added :{" "}
                  {moment(product.createdAt)
                    .fromNow()
                    .replace("minutes", "m")
                    .replace("minute", "m")
                    .replace("hours", "h")
                    .replace("hour", "h")
                    .replace("days", "d")
                    .replace("day", "d")
                    .replace("a", "1")}
                </span>
                <span className="text-white text-[10px] bg-[#151515] px-2 py-1 rounded-sm">
                  <FaStar className="!inline" /> Review : {product.numReviws}
                </span>
                <span className="text-white text-[10px] bg-[#151515] px-2 py-1 rounded-sm">
                  <GiVibratingShield className="!inline" /> Rating :{" "}
                  {product.rating}
                </span>
                <span className="text-white text-[10px] bg-[#151515] px-2 py-1 rounded-sm">
                  <FaShoppingCart className="!inline" /> Quantity :{" "}
                  {product.quantity}
                </span>
                <span className="text-white text-[10px] bg-[#151515] px-2 py-1 rounded-sm">
                  <RiDatabaseLine className="!inline" /> In Stock :{" "}
                  {product.stock}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSider;
