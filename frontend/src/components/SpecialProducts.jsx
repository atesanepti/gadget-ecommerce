import React from "react";
import { useFetchAllProductQuery } from "../redux/api/productApiSlice.js";
import Loader from "./Loader.jsx";
import Product from "./Product.jsx";
import ProductLoader from "./ProductLoader";
import { Link } from "react-router-dom";

const SpectialProducts = () => {
  let { data: products, isLoading } = useFetchAllProductQuery();

  return (
    <div className="w-full py-16 ">
      <div className="flex justify-between items-center py-8">
        <h4 className="text-white text-xl md:text-3xl ml-0 md:ml-10 font-semibold ">
          Special Products
        </h4>

        <Link
          to="/shop"
          className="bg-pink-600 text-white cursor-pointer rounded-lg text-sm px-6 py-2"
        >
          Shop
        </Link>
      </div>

      <div className="grid grid-cols-2  md:grid-cols-3 gap-4  md:gap-9">
        {!products && (
          <ProductLoader
            qnt={6}
            style="w-full h-[200px] bg-[#151515] rounded-md"
          />
        )}
        {products?.slice(0, 6)?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SpectialProducts;
