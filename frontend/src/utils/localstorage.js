const FAVORITS_PRODUCTS_KEY = "favorits-products";

//add a favorits product in localstoage
export const addFavProductInLoaclStorage = (product) => {
  const products = getAllFavProductsLocalStorage();
  if (!products.some((p) => p._id == product._id)) {
    products.push(product);
    localStorage.setItem(FAVORITS_PRODUCTS_KEY, JSON.stringify(products));
  }
};


export const removeFavProductFromLoaclStorage = (productId)=>{
    const products = getAllFavProductsLocalStorage();
    const newProducts = products.filter((p)=> p?._id !== productId );
    localStorage.setItem(FAVORITS_PRODUCTS_KEY, JSON.stringify(newProducts));
}


//get all favorits products from localstarage
export const getAllFavProductsLocalStorage = () => {
  const products =
    JSON.parse(localStorage.getItem(FAVORITS_PRODUCTS_KEY)) || [];
  return products;
};
