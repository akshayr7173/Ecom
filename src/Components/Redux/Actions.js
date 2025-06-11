export const TYPE = {
  getproducts: "GETPRODUCTS",
  getproductid: "GETPRODUCTID",
  addtocart: "ADDTOCART",
  increaseqty: "INCRESEQTY",
  decreaseqty: "DECREASEQTY",
  deleteitem: "DELETEITEM",
  filterData: "FILTERDATA",
  getAddress: "GETADDRESS",
  order: "Orders",
  reset: "RESET",
  addToWishlist: "ADD_TO_WISHLIST",
};

export const resetCart = () => {
  return {
    type: TYPE.reset,
  };
};

export const getOrders = (data) => {
  return {
    type: TYPE.order,
    payload: data,
  };
};

export const filteredProductData = (data) => {
  return {
    type: TYPE.filterData,
    payload: data,
  };
};

export const getProducts = (data) => {
  return {
    type: TYPE.getproducts,
    payload: data,
  };
};

export const getAddress = (address) => {
  return {
    type: TYPE.getAddress,
    payload: address,
  };
};
// export const getProductsFromID = (id) => {
//   return {
//     type: TYPE.getproductid,
//     payload: id,
//   };
// };

export const addToCart = (item) => async (dispatch) => {
  try {
    const response = await fetch('https://localhost:7051/api/Cart/Add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item)
    });
    const data = await response.json();
    dispatch({
      type: TYPE.addtocart,
      payload: data
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

export const DeleteItem = (id) => async (dispatch) => {
  try {
    await fetch(`https://localhost:7051/api/Cart/${id}`, {
      method: 'DELETE'
    });
    dispatch({
      type: TYPE.deleteitem,
      payload: id
    });
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

export const IncreaseQuantity = (id) => async (dispatch) => {
  try {
    const response = await fetch(`https://localhost:7051/api/Cart/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'increase' })
    });
    const data = await response.json();
    dispatch({
      type: TYPE.increaseqty,
      payload: id
    });
  } catch (error) {
    console.error('Error increasing quantity:', error);
  }
};

export const DecreaseQuantity = (id) => async (dispatch) => {
  try {
    const response = await fetch(`https://localhost:7051/api/Cart/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'decrease' })
    });
    const data = await response.json();
    dispatch({
      type: TYPE.decreaseqty,
      payload: id
    });
  } catch (error) {
    console.error('Error decreasing quantity:', error);
  }
};

export const addToWishlist = (product) => {
  return {
    type: TYPE.addToWishlist,
    payload: product,
  };
};

export const removeFromWishlist = (id) => {
  return {
    type: "REMOVE_FROM_WISHLIST",
    payload: id,
  };
};
