import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { useFetchCategoryQuery } from "../../redux/api/categoryApiSlice.js";
import Loader from "./../../components/Loader";
import { useDispatch } from "react-redux";
import { addAction } from "../../redux/features/notice/naticSlice.js";
import { ERROR, SUCCESS } from "../../redux/constants.js";
import {
  useUpdateProductMutation,
  useFetchProductByIdQuery,
  useDeleteProductMutation,
  useDeleteProductImageMutation,
} from "../../redux/api/productApiSlice.js";

const UpdateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    quantity: 0,
    price: 0,
    stock: 0,
  });
  const { productId } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error: productError,
  } = useFetchProductByIdQuery(productId);
  const { data: categories } = useFetchCategoryQuery();
  const [updateProductApiCall] = useUpdateProductMutation();
  const [productDeleteApiCall] = useDeleteProductMutation();
  const [productImageDeleteApiCall] = useDeleteProductImageMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData({
      name: product?.name,
      description: product?.description,
      brand: product?.brand,
      quantity: product?.quantity,
      price: product?.price,
      stock: product?.stock,
      category: product?.category,
    });
  }, [product]);

  const formChangeHander = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const error = (value) => {
    dispatch(addAction({ variant: ERROR, value }));
  };
  const success = (value) => {
    dispatch(addAction({ variant: SUCCESS, value }));
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (let key in formData) {
      form.append(`${[key]}`, formData[key]);
    }

    try {
      const payload = {
        productId: productId,
        formData: form,
      };
      const res = await updateProductApiCall(payload);
      success("Product Updated successfully");
      setFormData({
        name: res.data?.name,
        description: res.data?.description,
        brand: res.data?.brand,
        quantity: res.data?.quantity,
        price: res.data?.price,
        stock: res.data?.stock,
        category: res.data?.category,
      });
    } catch (err) {
      error(err.data.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: product?.name,
      description: product?.description,
      brand: product?.brand,
      quantity: product?.quantity,
      price: product?.price,
      stock: product?.stock,
      category: product?.category,
    });
  };

  const deleteProductHandler = async (productId) => {
    try {
      await productDeleteApiCall(productId);
      //delete product image
      await productImageDeleteApiCall(product.image);
      success("Product Deleted");
      navigate("/admin/products");
    } catch (err) {
      error(err.data.message);
    }
  };
  if (!product && productError) {
    return <Navigate to="/error" />;
  }
  return (
    <div className="w-full md:w-4/5 mx-auto text-white py-8">
      <h4 className="text-white text-center text-xl md:text-2xl font-medium lg:font-semibold mb-8">
        Create New Product
      </h4>
      {!product && <Loader />}
      {product && (
        <div className="w-full md:w-3/4 mx-auto">
          <div className="flex justify-between gap-3 md:gap-6 mb-2">
            <div className="flex-1">
              <label
                htmlFor="name"
                className="text-xs md:text-sm mb-1 inline-block"
              >
                Product Name
              </label>
              <br />
              <input
                className="text-xs md:text-sm text-gray-300 focus:text-white block w-full rounded-md px-4 py-2 bg-transparent border border-stone-900 focus:outline-none focus:outline-pink-600 focus:ouline-1"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={formChangeHander}
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="price"
                className="text-xs md:text-sm mb-1 inline-block"
              >
                Product Price
              </label>
              <br />
              <input
                type="number"
                onChange={formChangeHander}
                id="price"
                name="price"
                value={formData.price}
                className="text-xs mds:text-sm text-gray-300 focus:text-white block w-full rounded-md px-4 py-2 bg-transparent border border-stone-900 focus:outline-none focus:outline-pink-600 focus:ouline-1"
              />
            </div>
          </div>

          <div className="flex justify-between gap-3 md:gap-6 mb-2">
            <div className="flex-1">
              <label
                htmlFor="quantity"
                className="text-xs md:text-sm mb-1 inline-block"
              >
                Product Quantity
              </label>
              <br />
              <input
                className="text-xs md:text-sm text-gray-300 focus:text-white block w-full rounded-md px-4 py-2 bg-transparent border border-stone-900 focus:outline-none focus:outline-pink-600 focus:ouline-1"
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={formChangeHander}
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="stock"
                className="text-xs md:text-sm mb-1 inline-block"
              >
                Stock
              </label>
              <br />
              <input
                className="text-xs md:text-sm text-gray-300 focus:text-white block w-full rounded-md px-4 py-2 bg-transparent border border-stone-900 focus:outline-none focus:outline-pink-600 focus:ouline-1"
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
              <div className="flex-1 flex flex-col md:flex-row justify-between md:items-center">
                <label className="text-xs md:text-sm  " htmlFor="category">
                  Category
                </label>

                <select
                  onChange={formChangeHander}
                  name="category"
                  id="category"
                  className="text-xs md:text-sm bg-transparent rounded-md cursor-pointer border border-stone-900 px-4 py-2"
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
                className="text-xs md:text-sm text-gray-300 focus:text-white block w-full rounded-md px-4 py-2 bg-transparent border border-stone-900 focus:outline-none focus:outline-pink-600 focus:ouline-1"
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={formChangeHander}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="text-xs md:text-sm inline-block mb-1"
            >
              Description
            </label>
            <textarea
              onChange={formChangeHander}
              className="text-xs md:text-sm text-gray-300 focus:text-white block w-full rounded-md px-4 py-2 bg-transparent border border-stone-900 focus:outline-none focus:outline-pink-600 focus:ouline-1"
              value={formData.description}
              name="description"
              id="description"
            ></textarea>
          </div>

          <div className="mt-6 flex justify-between">
            <div className="flex gap-3 md:gap-6">
              <button
                onClick={formSubmitHandler}
                className="px-4 py-2 bg-pink-600 text-white cursor-pointer text-xs md:text-sm  rounded-md"
              >
                Update <span className="hidden md:inline">Product</span>
              </button>

              <button
                onClick={() => deleteProductHandler(productId)}
                className="px-4 py-2 bg-red-600 text-white cursor-pointer text-xs md:text-sm  rounded-md"
              >
                Delete <span className="hidden md:inline">Product</span>
              </button>
            </div>
            <button
              onClick={resetForm}
              className="px-12 py-2 bg-[#151515] rounded-md cursor-pointer text-xs md:text-sm text-white "
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
