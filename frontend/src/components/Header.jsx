import React from "react";
import {
  useFetchTopProductsQuery,
  useFetchNewProductsQuery,
} from "../redux/api/productApiSlice.js";
import SmProduct from "./SmProduct.jsx";
import Loader from "./Loader";
import ProductSider from "./ProductSider.jsx";
import ProductLoader from "./ProductLoader.jsx";

const Header = () => {
  const { data: topProducts, isLoading: topPoductLoading } =
    useFetchTopProductsQuery();
  const { data: newProducts, isLoading: newProductLoading } =
    useFetchNewProductsQuery();

  return (
    <header className="w-full py-10 ">
      <div className="flex flex-col md:flex-row items-start justify-between gap-12 md:gap-24">
        <div className="w-full md:w-[60%] grid grid-cols-2 gap-3">
          {newProductLoading && (
            <ProductLoader
              qnt={4}
              style="w-full h-[200px] bg-[#151515] rounded-md"
            />
          )}
          {newProducts &&
            newProducts.map((product) => (
              <SmProduct key={product._id} product={product} />
            ))}
        </div>

        <div className="w-full md:w-[40%]">
          {topPoductLoading && (
            <ProductLoader
              qnt={1}
              style="w-full h-[400px] bg-[#151515] rounded-md"
            />
          )}
          {topProducts && topProducts.length > 0 && (
            <ProductSider products={topProducts} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
