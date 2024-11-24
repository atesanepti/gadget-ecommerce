import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { useFetchProductByIdQuery } from "../../redux/api/productApiSlice.js";
import { addToCart } from "../../redux/features/cart/cartSlice.js";
import { Link } from "react-router-dom";
import Loader from "./../../components/Loader";
import { FaHome, FaShoppingCart, FaStar, FaStopwatch } from "react-icons/fa";
import { GiVibratingShield } from "react-icons/gi";
import { RiDatabaseLine } from "react-icons/ri";
import moment from "moment";
import Rating from "./../../components/Rating";
import ProductTab from "../../components/ProductTab.jsx";
import { useDispatch, useSelector } from "react-redux";
import Image from "./../../components/Image";
import PhotoGallery from "./../../components/PhotoGallery";

const ProductsDetails = () => {
  const [galleryImage, setGalleryImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState(false);
  const { productId } = useParams();

  const userInfo = useSelector((state) => state.auth.userInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading: productLoading,
    refetch,
    error,
  } = useFetchProductByIdQuery(productId);

  const toggleGalleryImage = (image) => {
    if (galleryImage && !image) {
      setGalleryImage("");
    } else {
      setGalleryImage(image);
    }
  };

  const quantityHandler = (e) => {
    setQuantity(Number(e.target.value));
  };
  useEffect(() => {
    console.log(quantity);
  }, [quantity]);
  const addToCartHandler = (product) => {
    dispatch(addToCart({ ...product, quantity }));
    navigate("/cart");
  };

  const decriptionHandler = () => {
    setDescription(!description);
  };



  return (
    <>
      {!product && error ? (
        <Navigate to="/login" />
      ) : (
        <div className="w-full md:w-[90%] mx-auto py-12">
          <Link to="/" className="text-white font-medium text-base block mb-7">
            Go Home
          </Link>

          {productLoading && <Loader />}
          {product && (
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-0 justify-center">
              <div
                className="flex-1 w-[90%] mx-auto md:mx-0 md:w-full aspect-[4/3]"
                onClick={() => toggleGalleryImage(product.image)}
              >
                <Image src={product.image} />
              </div>

              <div className="flex-1 px-5">
                <span className="text-sm md:text-base text-white font-medium uppercase">
                  {product.name}
                </span>
                <br />
                <p className="text-gray-300 text-xs md:text-sm mt-2 md:mt-3">
                  {description
                    ? product.description
                    : product.description.substring(0, 240)}
                  {description ? (
                    <span
                      className="text-sm font-medium text-blue-600"
                      onClick={decriptionHandler}
                    >
                      .See Less
                    </span>
                  ) : (
                    <span
                      className="text-sm font-medium text-blue-600"
                      onClick={decriptionHandler}
                    >
                      ...See More
                    </span>
                  )}
                </p>

                <span className="text-2xl font-bold text-white ordinal  block mt-2 md:mt-4">
                  ${product.price}
                </span>

                <div className="flex-1 grid grid-cols-2 justify-between gap-2 mt-3 md:mt-5">
                  <span className="text-white text-[10px] text-xs py-1 rounded-sm">
                    <FaHome className="!inline" /> Brand : {product.brand}
                  </span>
                  <span className="text-white text-[10px] text-xs py-1 rounded-sm">
                    <FaStopwatch className="!inline" /> Added :{" "}
                    {moment(product.createdAt).fromNow()}
                  </span>
                  <span className="text-white text-[10px] text-xs py-1 rounded-sm">
                    <FaStar className="!inline" /> Review : {product.numReviws}
                  </span>
                  <span className="text-white text-[10px] text-xs py-1 rounded-sm">
                    <GiVibratingShield className="!inline" /> Rating :{" "}
                    {product.rating}
                  </span>
                  <span className="text-white text-[10px] text-xs py-1 rounded-sm">
                    <FaShoppingCart className="!inline" /> Quantity :{" "}
                    {product.quantity}
                  </span>
                  <span className="text-white text-[10px] text-xs py-1 rounded-sm">
                    <RiDatabaseLine className="!inline" /> In Stock :{" "}
                    {product.stock}
                  </span>
                </div>
                <br />
                <div className="flex justify-between ">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviws} reviews`}
                  />
                  <div>
                    <select
                      className="bg-[#19191b] text-white  text-xs md:text-sm block p-1 md:p-2 rounded-sm"
                      onChange={quantityHandler}
                    >
                      <option value="">Qunatity</option>
                      {[...Array(product.stock)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => addToCartHandler(product)}
                    disabled={product.stock == 0}
                    className="block w-max bg-[#03346E] text-white font-medium uppercase text-xs md:text-sm cursor-pointer rounded-md px-3 md:px-4 py-2 my-4"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          )}

          {product && (
            <ProductTab
              refetch={refetch}
              product={product}
              userInfo={userInfo}
            />
          )}

          {galleryImage && (
            <PhotoGallery
              imagePath={galleryImage}
              toggleGalleryImage={toggleGalleryImage}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ProductsDetails;
