import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "./Redux/Actions";
import { BsHeart, BsCartPlus } from "react-icons/bs";
import "./ProductCard.css";
import { NavLink } from "react-router-dom";
import { useToast } from "./ToastContext";

export default function ProductCard({
  id,
  title,
  price,
  rating,
  description,
  image,
  imageUrl,
}) {
  const [readMore, setreadMore] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleAddToCart = () => {
    dispatch(addToCart({ id, title, price, rating, description, image }));
    toast("Added to Cart");
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist({ id, title, price, rating, description, image }));
    toast("Added to Wishlist");
  };

  return (
    <div className="product-card-container">
      <div className="product-img">
        <img
          src={image || imageUrl}
          alt={title}
          style={{ height: readMore ? "100px" : "120px" }}
        />
      </div>
      <div className="product-title">
        <h3>{title}</h3>
      </div>
      <div
        className="product-description"
        style={{ fontSize: readMore ? "12px" : "16px" }}
      >
        {readMore
          ? description.slice(0, 300) + " ..."
          : description.slice(0, 20) + "..."}
        <span className="readmore" onClick={() => setreadMore(!readMore)}>
          {!readMore ? "read more" : "less"}
        </span>
      </div>
      <div className="product-price">${price}</div>
      <div className="product-button">
        <NavLink to={`/products/${id}`}>
          <button>Buy Now</button>
        </NavLink>
      </div>
      <div className="product-actions">
        <button className="cart-btn" onClick={handleAddToCart}>
          <BsCartPlus /> Add to Cart
        </button>
        <button className="wishlist-btn" onClick={handleAddToWishlist}>
          <BsHeart /> Wishlist
        </button>
      </div>
    </div>
  );
}
