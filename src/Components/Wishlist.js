import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ToastContext";
import { removeFromWishlist } from "./Redux/Actions";
import "./Wishlist.css";

export default function Wishlist() {
  const wishlist = useSelector((state) => state.reducer.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
    toast("Removed from Wishlist");
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-container">
        <h2>Your Wishlist is empty.</h2>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      <div className="wishlist-grid">
        {wishlist.map((item) => (
          <div className="wishlist-card" key={item.id}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>${item.price}</p>
            <button onClick={() => navigate(`/products/${item.id}`)}>
              View Details
            </button>
            <button onClick={() => handleRemoveFromWishlist(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}