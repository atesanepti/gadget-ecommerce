import { useFetchCategoryQuery } from "../redux/api/categoryApiSlice.js";
import CategoryProduct from "./CategoryProduct.jsx";
import Loader from "./Loader.jsx";
const CategoryProducts = () => {
  const { data: categories, isLoading } = useFetchCategoryQuery();
  return (
    <div className="flex flex-col gap-10 my-20 w-full">
      {isLoading && <Loader />}
      {categories &&
        !isLoading &&
        categories.map((c) => <CategoryProduct key={c._id} category={c} />)}
    </div>
  );
};

export default CategoryProducts;
