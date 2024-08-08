import React from "react";
import { useSelector } from "react-redux";

const FavoritesProductCount = () => {
  const favoritesProduct = useSelector((state) => state.favorites);
  const favoritesProductCount = favoritesProduct?.length || 0;
  return (
    <>
      {favoritesProductCount > 0 && (
        <div className="absolute w-4 h-4 flex justify-center items-center top-[-10px] right-0 bg-pink-600 text-white text-[10px] rounded-full">
          {favoritesProductCount}
        </div>
      )}
    </>
  );
};

export default FavoritesProductCount;
