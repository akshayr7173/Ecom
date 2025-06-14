import React from "react";
import "./Orders.css";
import { useSelector } from "react-redux";
import { OrdersCard } from "./OrdersCard";
import { useToast } from "./ToastContext";

export const Orders = () => {
  const orders = useSelector((state) => state.reducer.orders);
  const toast = useToast();
  const noOrderMsg = (
    <p style={{ color: "red" }}>There are currently no orders in your cart!</p>
  );

  const handleCancelOrder = (orderId) => {
    // dispatch your cancel action here
    toast("Canceled Order");
  };

  console.log(orders);
  return (
    <div className="order-container">
      <div className="order-main">
        {orders.length === 0
          ? noOrderMsg
          : orders.map((el, i) => {
              return <OrdersCard orders={el} key={i} />;
            })}
      </div>
    </div>
  );
};
