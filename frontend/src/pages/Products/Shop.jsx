import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { CiFilter } from "react-icons/ci";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../../redux/features/shop/shopSlice.js";
import { useFetchFilteredProductsQuery } from "../../redux/api/productApiSlice.js";
import { useFetchCategoryQuery } from "../../redux/api/categoryApiSlice.js";

import ProductCard from "../../components/ProductCard.jsx";
import Loader from "./../../components/Loader";
import ProductLoader from "./../../components/ProductLoader";

const Shop = () => {
  const [priceFilter, setPriceFilter] = useState("");

  const dispatch = useDispatch();
  const { products, categories, checked, radio } = useSelector(
    (state) => state.shop
  );

  useEffect(() => {
    console.log("product", products);
  }, [products]);

  const { data: oldCategories, isLoading: categoriesLoading } =
    useFetchCategoryQuery();

  const { data: filteredProducts, isLoading: productsLoading } =
    useFetchFilteredProductsQuery({ checked, radio });

  useEffect(() => {
    if (!categoriesLoading) {
      dispatch(setCategories(oldCategories));
    }
  }, [oldCategories, dispatch, categoriesLoading]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!productsLoading) {
        const priceFilterdProducts = filteredProducts?.filter(
          (product) =>
            product.price.toString().includes(priceFilter) ||
            product.price == parseInt(priceFilter, 10)
        );

        dispatch(setProducts(priceFilterdProducts));
      }
    }
  }, [
    filteredProducts,
    productsLoading,
    checked,
    radio,
    dispatch,
    priceFilter,
  ]);

  const setBrandsHandler = (brand) => {
    const brandFilteredProducts = filteredProducts?.filter(
      (product) => product.brand.toLowerCase() == brand
    );
    console.log("bp", brand);
    dispatch(setProducts(brandFilteredProducts));
  };

  const checkedHandler = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c != id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = () => {
    const brandArray = filteredProducts.map((p) => p.brand.toLowerCase());
    const filteredArray = brandArray?.filter((p) => p.brand != "undefined");
    return [...Array.from(new Set(filteredArray))];
  };

  const priceFilterHandler = (e) => {
    setPriceFilter(e.target.value);
  };

  const [filterMenu, setFilterMenu] = useState(false);
  const toggleFilterMenu = ()=>{
    setFilterMenu(!filterMenu)
  }

  return (
    <div className="w-full md:w-[calc(100%-220px)] md:ml-[50px] text-white my-5  ">
      {productsLoading && <Loader />}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 transition-all justify-between gap-5 md:block w-full md:w-[200px] z-[30]  h-screen !bg-[#151515] px-3 py-10 fixed   ${
          filterMenu ? "top-[80px]" : "top-[-100%]"
        } md:top-0 right-0 `}
      >
        <div className="mt-0 md:mt-10 self-start">
          <h4 className="w-full bg-black text-center py-2 rounded-3xl text-xs md:text-sm  mb-3">
            Filter by Categories
          </h4>

          {oldCategories && (
            <div className="ml-3 flex flex-wrap gap-2 md:block">
              {oldCategories?.map((c, i) => (
                <div key={i} className="flex gap-1 items-center ">
                  <input
                    className=" w-3 h-3 text-pink-600 bg-gray-300 border-gray-300 rounded "
                    type="checkbox"
                    id={c.name}
                    onChange={(e) => checkedHandler(e.target.checked, c._id)}
                  />
                  <label className="text-sm " htmlFor={c.name}>
                    {c.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-0 md:mt-10 self-start ">
          <h4 className="w-full bg-black text-center text-xs md:text-sm py-2 rounded-3xl  mb-3">
            Filter by Brands
          </h4>
          {filteredProducts && (
            <div className="ml-3 flex flex-wrap gap-2 md:block">
              {uniqueBrands()?.map((b, i) => (
                <div key={i} className="flex items-center gap-1">
                  <input
                    className="w-3 h-3"
                    type="radio"
                    value={b}
                    id={b}
                    name="brand"
                    onChange={() => setBrandsHandler(b)}
                  />
                  <label htmlFor={b} className="text-sm capitalize">
                    {b}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-0 md:mt-10  self-start ">
          <h4 className="w-full bg-black text-xs md:text-sm text-center py-2 rounded-3xl  mb-3">
            Filter by Price
          </h4>
          {filteredProducts && (
            <div className="">
              <input
                placeholder="price"
                className="w-full block px-3 py-1 rounded-md border border-gray-400 focus:outline-none  focus:!border-pink-500 bg-transparent"
                type="text"
                value={priceFilter}
                onChange={priceFilterHandler}
              />
            </div>
          )}
        </div>

        <div className="mt-0 md:mt-10 self-auto">
          {filteredProducts && (
            <button
              className="bg-pink-600 text-white w-full block  py-1 rounded-sm"
              onClick={() => window.location.reload()}
            >
              Reset
            </button>
          )}
        </div>

        {filterMenu && (
          <div
            className="md:hidden fixed w-[30px] animation-to-bottom h-[30px] bg-pink-500 cursor-pointer rounded-full flex justify-center items-center z-[600] left-1/2  translate-x-[-50%] bottom-[-100px]"
            onClick={toggleFilterMenu}
          >
            <RxCross2 />
          </div>
        )}
      </div>

      <div
        onClick={toggleFilterMenu}
        className="md:hidden cursor-pointer w-[100px] ml-2 my-8 text-sm h-[30px] flex gap-2 items-center justify-center bg-[#151515] text-white rounded-md"
      >
        <CiFilter /> Filter
      </div>

      <div
        className={`w-full px-2 md:px-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3  md:gap-5 ${
          productsLoading && "max-h-screen"
        }`}
      >
        {productsLoading && (
          <ProductLoader
            qnt={9}
            style="w-full h-[200px] bg-[#151515] rounded-md"
          />
        )}
        {products &&
          products.length > 0 &&
          products?.map((p) => <ProductCard product={p} key={p._id} />)}
      </div>
    </div>
  );
};

export default Shop;
