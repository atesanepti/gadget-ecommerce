import React, { useEffect } from "react";
import { useFetchAllProductQuery } from "../../redux/api/productApiSlice.js";
import { FaArrowRightLong } from "react-icons/fa6";
import moment from "moment";
import { Link } from "react-router-dom";
import Loader from "./../../components/Loader";
const Products = () => {
  const {
    data: producs,
    refetch,
    isLoading: isLoading,
  } = useFetchAllProductQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="w-full md:w-4/5 mx-auto text-white py-8">
      <div className="flex">
        <h4 className="text-lg md:text-xl lg:text-2xl font-medium lg:font-semibold">
          All Product List ({producs?.length})
        </h4>
      </div>
      {producs?.length === 0 && (
        <span className="text-sm text-gray-400 text-center block my-10">
          No Product Found
        </span>
      )}

      <div className="w-full  md:w-3/4 mx-auto overflow-auto my-6 md:my-10">
        {isLoading && <Loader />}
        {!isLoading && (
          <ul className="w-full max-h-[70ch] ">
            {producs?.map((product) => {
              return (
                <li
                  className="w-full flex flex-col border-b border-b-gray-700 px-0 md-px-4 py-3 md:py-6"
                  key={product._id}
                >
                  <div className="flex gap-5 items-start">
                    <div className="w-[70px] md:w-[140px] overflow-hidden rounded-md bg-blue-500 aspect-[4/3]">
                      <img
                        className="object-cover hover:scale-110 transition-transform rounded-md w-full h-full"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className=" w-full flex flex-col justify-between">
                      <div className="flex  justify-between items-start">
                        <h4 className="text-xs line-clamp-1 md:line-clamp-3 md:text-base max-w-[65%] text-white font-semibold capitalize">
                          {product.name}
                        </h4>
                        <span className="text-xs md:text-sm font-semibold text-gray-500 ">
                          {moment(product.createdAt).format("MMMM Do YYYY")}
                        </span>
                      </div>
                      <span className="max-w-[70%] inline-block text-xs md:text-sm text-gray-500 my-3 !line-clamp-1">
                        {product.description}
                      </span>

                      <div className="flex items-center justify-between">
                        <Link
                          to={`/admin/update/${product._id}`}
                          className="flex items-center font-semibold text-xs text-pink-600 md:text-white  md:text-sm gap-2 px-2  md:px-4 py-2 rounded-md cursor-pointer  md:bg-pink-600"
                        >
                          Update Product
                          <FaArrowRightLong className="text-pink-600 md:text-white text-xs md:text-sm" />
                        </Link>

                        <span className="inline-block text-sm md:text-base font-black text-white">
                          $ {product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Products;
