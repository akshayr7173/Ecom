import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.css";
import CartItem from "./CartItem";
// import { useWindowScroll } from "react-use";

import { DisplayModel } from "./DisplayModel";
import { useToast } from "./ToastContext";
import { DeleteItem, TYPE } from "./Redux/Actions";

export default function Cart() {
  const dispatch = useDispatch();
  const [popup, setpopup] = useState(false);
  const [modal, setmodal] = useState(false);
  const cart = useSelector((state) => state.reducer.cart);
  const toast = useToast();

  useEffect(() => {
    // Fetch initial cart data
    const fetchCart = async () => {
      try {
        const response = await fetch('https://localhost:7051/api/Cart');
        const data = await response.json();
        dispatch({
          type: TYPE.getproducts,
          payload: data
        });
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, [dispatch]);

  const NoItems = <p>There are currently no items in the Cart!</p>;

  const showWindow = (val) => {
    setpopup(val);
  };

  useEffect(() => {
    const time = setTimeout(() => {
      setpopup(false);
    }, 1000);

    return () => {
      clearTimeout(time);
    };
  }, [popup]);

  const RenderPopup = () => {
    return <div className="delete-window">Removed From Cart!</div>;
  };

  const renderItems = cart.map((el) => (
    <CartItem
      title={el.title}
      image={el.image}
      qty={el.qty}
      key={el.id}
      id={el.id}
      price={el.price}
      showWindow={showWindow}
    />
  ));

  const TotalPrice =
    cart.length !== 0
      ? cart
          .map((el) => {
            return {
              ...el,
              totalPrice: el.price * el.qty,
            };
          })
          .map((el) => el.totalPrice)
          .reduce((acc, curr) => acc + curr)
          .toFixed(2)
      : 0;

  const onCheckout = () => {
    setmodal(true);
  };

  const closeModel = () => {
    setmodal(false);
  };

  const modelTitle =
    cart.length === 0
      ? "There are no items in the cart Currently!"
      : `Your total amount is $${TotalPrice} \n Are you Sure You want to continue ?`;

  const handleRemoveFromCart = (id) => {
    dispatch(DeleteItem(id));
    toast("Removed from Cart");
  };

  return (
    <>
      {popup && <RenderPopup />}
      {modal && <DisplayModel title={modelTitle} closeModel={closeModel} />}
      <div className="cart-container">
        {cart.length !== 0 ? renderItems : NoItems}
        <div className="cart-summary">
          <button onClick={onCheckout}>Checkout!</button>
          <p className="total-price">
            <span>Total Price </span>: $ {TotalPrice ? TotalPrice : 0}
          </p>
        </div>
      </div>
    </>
  );
}
