import { useSelector } from "react-redux";
import Product from "../../components/Product.jsx";

const Favorites = () => {
  const favoritesProducts = useSelector((state) => state.favorites);
  return (
    <div className="w-ful md:w-4/5 mx-auto py-12">
      <h4 className="text-xl md:text-2xl text-white font-semibold uppercase ">
        favorites products
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 py-8 md:py-16">
        {favoritesProducts?.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
      <div>
        <button className="rounded-3xl px-6 py-2 bg-pink-600 text-white text-xs md:text-sm uppercase">
          Check out
        </button>
      </div>
    </div>
  );
};

export default Favorites;
