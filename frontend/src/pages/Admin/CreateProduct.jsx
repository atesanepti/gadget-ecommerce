import React, { useEffect, useState } from "react";
import { useFetchCategoryQuery } from "../../redux/api/categoryApiSlice.js";
import { useDispatch } from "react-redux";
import { addAction } from "../../redux/features/notice/naticSlice.js";
import {
  useUploadProductImageMutation,
  useCreateProductMutation,
} from "../../redux/api/productApiSlice.js";
import { ERROR, SUCCESS } from "../../redux/constants.js";
import Button from "./../../components/Button";
const CreateProduct = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    quantity: 0,
    price: 0,
    stock: 0,
  });
  const [formError, setFormError] = useState({ image: "" });

  const { data: categories, refetch } = useFetchCategoryQuery();
  const [imageUpload] = useUploadProductImageMutation();
  const [createProductApiCall, { isLoading }] = useCreateProductMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await imageUpload(formData).unwrap();
      if (res.error) {
        console.log(res.error);
      }
      setImage(e.target.files[0]);
      setImageUrl(res.image);
      setFormError(null);
    } catch (error) {
      console.log(error);
    }
  };

  const error = (value) => {
    dispatch(addAction({ variant: ERROR, value }));
  };
  const success = (value) => {
    dispatch(addAction({ variant: SUCCESS, value }));
  };
  const formChangeHander = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      return setFormError({ image: "*Product image is reqiured" });
    }
    if (!formData.name) {
      return error("Product name is required");
    }
    if (!formData.category) {
      return error("Product category is required");
    }
    if (!formData.brand) {
      return error("Product brand name is required");
    }
    if (!formData.description) {
      return error("Product description is required");
    }

    const form = new FormData();
    for (let key in formData) {
      form.append(`${[key]}`, formData[key]);
    }
    form.append("image", imageUrl);
    try {
      const res = await createProductApiCall(form).unwrap();
      success("Product created successfully");
      setFormData({
        name: "",
        description: "",
        brand: "",
        category: "",
        quantity: 0,
        price: 0,
        stock: 0,
      });
      setImage("");
      setImageUrl(null);
    } catch (err) {
      error(err.data.message);
    }
  };

  return (
    <div className="w-full md:w-4/5 mx-auto text-white py-8">
      <h4 className="text-white  text-xl md:text-2xl text-center font-medium lg:font-semibold mb-4">
        Create New Product
      </h4>
      <div className="w-full md:w-3/4 mx-auto">
        {image && (
          <div className="grid-col-two w-full flex justify-center items-center py-5">
            <img
              src={URL.createObjectURL(image)}
              alt="product"
              className="w-auto max-h-[150px] object-cover"
            />
          </div>
        )}

        <div className="mb-6">
          <label
            htmlFor="image"
            className=" cursor-pointer w-full flex justify-center items-center h-[5rem] bg-[#101011] border border-stone-900 rounded-lg text-sm  "
          >
            {!image && "Upload image"}
            <input
              className={`${
                !image
                  ? "hidden"
                  : "block bg-[#151515] text-white rounded-md px-4 py-2  border-stone-900"
              }`}
              type="file"
              id="image"
              onChange={handleImageUpload}
            />
          </label>
          {formError?.image && (
            <span className="text-red-600 text-sm block my-3">
              {formError?.image}
            </span>
          )}
        </div>

        <div className="flex justify-between gap-3 md:gap-6 mb-2">
          <div className="flex-1">
            <label htmlFor="name" className="text-sm mb-1 inline-block">
              Product Name
            </label>
            <br />
            <input
              className=" block w-full rounded-md px-4 py-2 bg-transparent border border-stone-900 focus:outline-none focus:outline-pink-600 focus:ouline-1"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={formChangeHander}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="price" className="text-sm mb-1 inline-block">
              Product Price
            </label>
            <br />
            <input
              className=" block w-full rounded-md px-4 py-2 bg-transparent border border-stone-900 focus:outline-none focus:outline-pink-600 focus:ouline-1"
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={formChangeHander}
            />
          </div>
        </div>

        <div className="flex justify-between gap-3  md:gap-6 mb-2">
          <div className="flex-1">
            <label htmlFor="quantity" className="text-sm mb-1 inline-block">
              Product Quantity
            </label>
            <br />
            <input
              className=" block w-full rounded-md px-4 py-2 bg-transparent border border-stone-900 focus:outline-none focus:outline-pink-600 focus:ouline-1"
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={formChangeHander}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="stock" className="text-sm mb-1 inline-block">
              Stock
            </label>
            <br />
            <input
              className=" block w-full rounded-md px-4 py-2 bg-transparent border border-stone-900 focus:outline-none focus:outline-pink-600 focus:ouline-1"
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={formChangeHander}
            />
          </div>
        </div>

        <div className="flex justify-center gap-3 md:gap-6 mb-2">
          {categories && (
            <div className="flex-1 flex justify-between flex-col md:flex-row  md:items-center">
              <label className="text-sm  " htmlFor="category">
                Category
              </label>

              <select
                onChange={formChangeHander}
                name="category"
                id="category"
                className="bg-transparent rounded-md cursor-pointer border border-stone-900 px-4 py-2"
              >
                <option className="bg-[#151515] text-white " value="defalut">
                  Category
                </option>
                {categories.map((category) => {
                  return (
                    <option
                      className="bg-[#151515] text-white "
                      key={category._id}
                      value={category._id}
                    >
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          <div className="flex-1">
            <label htmlFor="brand" className="text-sm">
              Brand
            </label>

            <input
              className=" block w-full rounded-md px-4 py-2 bg-transparent border border-stone-900 focus:outline-none focus:outline-pink-600 focus:ouline-1"
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={formChangeHander}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="text-sm inline-block mb-1">
            Description
          </label>
          <textarea
            onChange={formChangeHander}
            className=" block w-full rounded-md px-4 py-2 bg-transparent border border-stone-900 focus:outline-none focus:outline-pink-600 focus:ouline-1"
            value={formData.description}
            name="description"
            id="description"
          ></textarea>
        </div>

        <div className="mt-6">
          <Button
            isLoading={isLoading}
            style="w-max px-4"
            onClick={formSubmitHandler}
          >
            Upload Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
