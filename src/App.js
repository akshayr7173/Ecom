import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import ProductDetals from "./Components/ProductDetals";
import Cart from "./Components/Cart";
import NavProducts from "./Components/NavProducts";
import Footer from "./Components/Footer";
import { Checkout } from "./Components/Checkout";
import { useSelector } from "react-redux";
import { Orders } from "./Components/Orders";
import Wishlist from "./Components/Wishlist";
import { ToastProvider } from "./Components/ToastContext";
import Register from "./Components/Register";
import Login from "./Components/Login";
import SellerPage from "./Components/SellerPage";

function App() {
  const Products = useSelector((state) => state.reducer.products);

  return (
    <ToastProvider>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<NavProducts />} />
        <Route
          path="/products/:id"
          element={
            Products.length !== 0 ? <ProductDetals /> : <Navigate to="/home" />
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/seller" element={<SellerPage />} />
      </Routes>
      <Footer />
    </ToastProvider>
  );
}

export default App;
