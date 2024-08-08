export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0)
  );

  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 10 : 0);
  state.taxPrice = Number(state.itemsPrice * 0.5).toFixed(2);

  state.totalPrice =
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
