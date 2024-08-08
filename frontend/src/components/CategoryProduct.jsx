import { useFetchCategoryRelatedProductQuery } from "../redux/api/productApiSlice.js";
import ProductCard from "./ProductCard";
import ProductLoader from "./ProductLoader.jsx";

const CategoryProduct = ({ category }) => {
  const { data: products, isLoading } = useFetchCategoryRelatedProductQuery(
    category._id
  );
  return (
    <div className="w-full">
      {products?.length >= 3 && (
        <>
          <h4 className="text-base md:text-lg text-white font-semibold g mb-5">
            Category : {category.name}
          </h4>
          {products && !isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {!products && isLoading && (
                <ProductLoader
                  qnt={3}
                  style="w-full h-[200px] bg-[#151515] rounded-md"
                />
              )}
              {products.slice(0, 3).map((p) => (
                <ProductCard product={p} key={p._id} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryProduct;
