import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";

import {
  useAddProductReviewMutation,
  useUpdateProductReviewMutation,
  useFetchCategoryRelatedProductQuery,
} from "../redux/api/productApiSlice.js";
import Rating from "./Rating";
import Button from "./Button";
import { addAction } from "../redux/features/notice/naticSlice.js";
import { SUCCESS, ERROR } from "../redux/constants.js";
import { useDispatch } from "react-redux";
import Product from "./Product";
const RELATED_PRODUCT = "related_products";
const ADD_REVIEW = "add_review";
const ALL_REVIEWS = "all_reviews";

const ProductTab = ({ product, refetch, userInfo }) => {
  const { _id: productId } = product;
  const dispatch = useDispatch();
  const [tabOption, setTapOption] = useState(RELATED_PRODUCT);
  const [reviewData, setReviewData] = useState({ rating: 0, comment: "" });
  const [commentEditable, setCommentEditable] = useState(false);
  const [commentEdit, setCommentEdit] = useState("");
  const [updatedComment, setUpdatedComment] = useState("");
  const [reviewUpdataApiCall] = useUpdateProductReviewMutation();

  const [addReviewApiCall, { isLoading }] = useAddProductReviewMutation();
  const { data: categoryProducts, isLoading: categoryProductLoading } =
    useFetchCategoryRelatedProductQuery(product.category);
  console.log("ok", categoryProducts);
  const setTabOptionHandler = (value) => {
    setTapOption(value);
  };
  const setReviewDataHandler = (e) => {
    setReviewData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const error = (value) => {
    dispatch(addAction({ variant: ERROR, value }));
  };
  const success = (value) => {
    dispatch(addAction({ variant: SUCCESS, value }));
  };
  const submitHandler = async () => {
    try {
      const data = {
        ...reviewData,
        rating: Number(reviewData.rating),
      };
      const res = await addReviewApiCall({ data, productId }).unwrap();
      success("Review added");
      setTapOption(ALL_REVIEWS);
      refetch();
    } catch (err) {
      error(err.data.message);
    }
  };

  const commentEditableHandler = () => {
    setCommentEditable(!commentEditable);
  };

  const commentEditHandler = (e) => {
    setCommentEdit(e.target.value);
  };

  const commentUpdateHandler = async () => {
    //update comment
    try {
      const payload = {
        productId,
        data: { comment: commentEdit },
      };

      const res = await reviewUpdataApiCall(payload).unwrap();
      if (res.error) {
        error(res.error);
      }
      setUpdatedComment(commentEdit);
      setCommentEdit("");
      setCommentEditable(false);
      success("Review updated");
    } catch (error) {
      error(error.data.message);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row py-16 px-0 md:px-8  items-start ">
      <div className="w-full px-4 md:px-0 md:w-[30%] flex  items-start justify-between  md:flex-col ">
        <button
          className={`text-sm md:text-base font-medium my-2  cursor-pointer border-none ${
            tabOption == RELATED_PRODUCT ? "text-[greenyellow]" : "text-white"
          }`}
          onClick={() => setTabOptionHandler(RELATED_PRODUCT)}
        >
          Related Products
        </button>
        <button
          className={`text-sm md:text-base font-medium my-2 cursor-pointer border-none ${
            tabOption == ADD_REVIEW ? "text-[greenyellow]" : "text-white"
          }`}
          onClick={() => setTabOptionHandler(ADD_REVIEW)}
        >
          Add Review
        </button>

        <button
          className={`text-sm md:text-base font-medium my-2 cursor-pointer border-none ${
            tabOption == ALL_REVIEWS ? "text-[greenyellow]" : "text-white"
          }`}
          onClick={() => setTabOptionHandler(ALL_REVIEWS)}
        >
          All Reviews
        </button>
      </div>

      {tabOption === RELATED_PRODUCT && (
        <div className="w-full  mt-5 grid grid-cols-2 md:grid-cols-3 gap-4">
          {categoryProducts
            ?.filter((p) => p._id != productId)
            ?.slice(0, 6)
            .map((p) => (
              <Product product={p} key={p._id} />
            ))}
        </div>
      )}

      {tabOption === ADD_REVIEW && (
        <div className="mt-4 md:mt-0 w-[90%] md:w-full mx-auto md:mx-0">
          <div className="mb-3 flex w-full justify-between md:justify-start md:gap-7 items-center">
            <label htmlFor="rating" className="text-sm text-white">
              Rating
            </label>
            <br />
            <select
              className="text-xs md:text-sm px-3 md:px-4 py-1 md:py-2 border border-gray-500 bg-transparent text-white rounded-md focus:border-pink-600 focus:outline-none"
              onChange={setReviewDataHandler}
              name="rating"
              id="rating"
            >
              <option value="" className="text-black text-sm">
                Select
              </option>
              <option value="1" className="text-black text-sm">
                Inferior
              </option>
              <option value="2" className="text-black text-sm">
                Decent
              </option>
              <option value="3" className="text-black text-sm">
                Great
              </option>
              <option value="4" className="text-black text-sm">
                Excellent
              </option>
              <option value="5" className="text-black text-sm">
                Exceptional
              </option>
            </select>
          </div>
          <div className="">
            <label className="text-sm text-white" htmlFor="comment">
              Comment
            </label>
            <br />
            <textarea
              rows={5}
              placeholder="Write your comment"
              className="text-white w-full text-xs md:text-sm placeholder:text-gray-400 placeholder:text-sm  p-2 bg-transparent border border-gray-500 md:w-[300px] rounded-md focus:outline-none  focus:border-pink-600"
              name="comment"
              id="comment"
              value={reviewData.comment}
              onChange={setReviewDataHandler}
            ></textarea>
          </div>
          <Button isLoading={isLoading} onClick={submitHandler}>
            Submit
          </Button>
        </div>
      )}

      {tabOption === ALL_REVIEWS && (
        <div className="overflow-auto w-full mt-4 md:mt-0">
          <div className="max-h-[40vh]">
            {product.reviews.length == 0 ? (
              <span className="text-sm text-gray-400">
                There are no Reviews
              </span>
            ) : (
              product.reviews?.map((r, i) => (
                <div
                  key={i}
                  className="bg-[#1A1A1A] mx-auto md:mx-0 w-[300px] px-2 py-2 rounded-md mb-2 relative"
                >
                  {userInfo.userId == r.user && (
                    <CiEdit
                      onClick={commentEditableHandler}
                      className="text-white text-base cursor-pointer absolute top-3 right-3"
                    />
                  )}

                  <span className="text-gray-300 text-xs font-medium inline-block ">
                    {r.name}
                  </span>

                  {commentEditable && userInfo.userId == r.user ? (
                    <div className="flex items-center justify-between gap-2">
                      <input
                        onChange={commentEditHandler}
                        value={commentEdit ? commentEdit : r.comment}
                        className="my-2 w-full block focus:outline focus:border-pink-600 bg-transparent border border-slate-700 px-2 py-2 rounded-md text-sm text-white"
                      />
                      <button
                        onClick={() => commentUpdateHandler()}
                        className="bg-blue-700 cursor-pointer text-white px-2 py-2 border-b border-b-blue-800 rounded-md text-sm"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p className="text-white text-[10px] mb-1 ">
                      {updatedComment || r.comment}
                    </p>
                  )}

                  <Rating
                    value={r.rating}
                    text=""
                    style={{ text_size: "text-[10px]" }}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTab;
