import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import CategoryForm from "./../../components/CategoryForm.jsx";
import Loader from "./../../components/Loader.jsx";

import {

  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoryQuery,
} from "../../redux/api/categoryApiSlice.js";

const Category = () => {

  

  const [name, setName] = useState("");
  const [clickedCategory, setClickedCategory] = useState(null);
  const [updateName, setUpdateName] = useState("");

  const { data, refetch, isLoading } = useFetchCategoryQuery();
  const [createCategoryApiCall ] = useCreateCategoryMutation();
  const [updateCategoryApiCall] = useUpdateCategoryMutation();
  const [deleteCategoryApiCall] = useDeleteCategoryMutation();

  const handleCategoryClick = (category) => {
    setClickedCategory(category);
    setUpdateName(category.name);
  };

  const modelCloseHandler = () => {
    setClickedCategory("");
  };



  const createCategoryHandler = async (name) => {
    try {
      const res = await createCategoryApiCall({ name: name }).unwrap();
      if (res.error) {
        console.error(res.error);
      } else {
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  window.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      console.log(e.key)
      
    }

  });

  const updateCategoryHandler = async (name) => {
    try {
      const newCategory = { newCategory: name };
      const categoryId = clickedCategory._id;
      const payload = {
        categoryId,
        newCategory,
      };
      const res = await updateCategoryApiCall(payload).unwrap();
      if (res.error) {
        console.log(res.error);
      } else {
        setName("");
        setClickedCategory(null);
        setUpdateName("");
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategoryHandler = async () => {
    try {
      const res = await deleteCategoryApiCall(clickedCategory._id).unwrap();
      if (res.error) {
        console.error(res.error);
      } else {
        setName("");
        setClickedCategory(null);
        setUpdateName("");
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full md:w-4/5 mx-auto h-screen py-14">
      <h4 className="text-white text-base md:text-xl font-medium lg:font-semibold mb-3">
        Manga Category
      </h4>
      <div>
        <CategoryForm
          name={name}
          
          setName={setName}
          setCategoryHandler={createCategoryHandler}
        />
        <br />
        <hr className="border-gray-500" />

        {isLoading ? (
          <div className="my-4">
            <Loader />
          </div>
        ) : (
          <div className="flex gap-3 my-4 flex-wrap">
            {data?.map((category, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-3 py-1 md:px-4 md:py-2 bg-transparent border text-pink-600 border-pink-600 rounded-md cursor-pointer  ${
                    clickedCategory &&
                    clickedCategory == category &&
                    "!bg-pink-600 !text-white"
                  }`}
                >
                  {category.name}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {clickedCategory && (
        <div className="fixed top-0 left-0 w-full flex justify-center items-center h-screen bg-[#07070769] ">
          <div className="w-[300px] bg-stone-950 rounded-xl px-4 py-8">
            <div className="flex justify-end py-1 mb-5">
              <RxCross1
                onClick={modelCloseHandler}
                className="text-white cursor-pointer text-base"
              />
            </div>
            <CategoryForm
              name={updateName}
              setName={setUpdateName}
              setCategoryHandler={updateCategoryHandler}
              buttonText="Update"
              handleDelete={deleteCategoryHandler}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
