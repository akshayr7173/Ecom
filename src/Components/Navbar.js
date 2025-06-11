import React, { useEffect, useState, useRef } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsCart, BsPersonCircle, BsHeart, BsShop } from "react-icons/bs";
import logo from "../pictures/logo.png";
import { logoutUser } from "../utils/auth";
import fuzzy from "fuzzy"; // <-- Add this import

export default function Navbar() {
  const Cart = useSelector((state) => state.reducer.cart);
  const Products = useSelector((state) => state.reducer.products); // Get all products
  const navigate = useNavigate();

  // Dropdown state
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  // Search state
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  // Fuzzy search logic
  useEffect(() => {
    if (search.trim() && Products.length) {
      const options = {
        extract: (el) => el.title,
      };
      const matches = fuzzy.filter(search, Products, options);
      setResults(matches.map((match) => match.original));
    } else {
      setResults([]);
    }
  }, [search, Products]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleSearchSelect = (product) => {
    setSearch("");
    setResults([]);
    navigate(`/products/${product.id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (results.length > 0) {
      handleSearchSelect(results[0]);
    }
  };

  return (
    <div className="nav-bar">
      <NavLink to="/home">
        <div className="nav-logo">
          <img src={logo} alt="" width={"80px"} />
          <p>Flipmart</p>
        </div>
      </NavLink>

      {/* Centered Nav Links */}
      <div className="nav-links" style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <div className="navlink-container" style={{ display: "flex", gap: "24px" }}>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? "activenav" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "activenav" : "")}
          >
            Products
          </NavLink>
        </div>
      </div>

      {/* Search bar to the right of nav links */}
      <div className="nav-search-wrapper" style={{ minWidth: 220, marginRight: 24 }}>
        <form
          className="nav-search-form"
          onSubmit={handleSearchSubmit}
          autoComplete="off"
        >
          <input
            type="text"
            className="nav-search-input"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && results.length > 0 && (
            <ul className="nav-search-results">
              {results.slice(0, 5).map((product) => (
                <li
                  key={product.id}
                  onClick={() => handleSearchSelect(product)}
                  className="nav-search-result-item"
                >
                  {product.title}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>

      {/* Cart and Profile on the right */}
      <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Cart first */}
        <div className="nav-cart">
          <button onClick={() => navigate("/cart")}>
            <span className="cart-icon">
              <BsCart />
            </span>
            <p>{Cart.length}</p>
          </button>
        </div>
        {/* Profile after cart */}
        <div className="nav-profile" ref={dropdownRef}>
          <button
            className="profile-btn"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <BsPersonCircle size={28} />
          </button>
          {showDropdown && (
            <div className="profile-dropdown">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  navigate("/wishlist");
                }}
              >
                <BsHeart /> Wishlist
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  navigate("/orders");
                }}
              >
                Orders
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  navigate("/seller");
                }}
              >
                <BsShop /> Seller Page
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  handleLogout();
                }}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
