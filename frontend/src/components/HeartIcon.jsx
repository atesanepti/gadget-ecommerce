import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import {
  addFavProductInLoaclStorage,
  removeFavProductFromLoaclStorage,
} from "./../utils/localstorage.js";
import {
  addFavorites,
  removeFavorites,
} from "../redux/features/favorites/favoritesSlice.js";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favProducts = useSelector((state) => state.favorites) || [];
  console.log("favp", favProducts);
  const isFavProducts = favProducts.some((p) => p?._id == product._id);

  const toggleFavHandler = () => {
    if (!isFavProducts) {
      dispatch(addFavorites({ product }));
      addFavProductInLoaclStorage(product);
    } else {
      dispatch(removeFavorites({ product }));
      removeFavProductFromLoaclStorage(product._id);
    }
  };

  return (
    <div
      onClick={toggleFavHandler}
      className="absolute top-4 right-4 cursor-pointer"
    >
      {!isFavProducts ? (
        <AiOutlineHeart className="text-white text-base" />
      ) : (
        <FaHeart className="text-pink-600 text-base" />
      )}
    </div>
  );
};

export default HeartIcon;
