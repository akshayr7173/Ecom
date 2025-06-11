import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import ProductTitle from "./ProductTitle";
import { getProducts, filteredProductData } from "./Redux/Actions";
import Slider from "./Slider";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const ProductsData = useSelector((state) => state.reducer.products);
  const filteredData = useSelector((state) => state.reducer.filter);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    if (!ProductsData || ProductsData.length === 0) {
      fetch("https://localhost:7051/api/Product")
        .then((res) => res.json())
        .then((data) => dispatch(getProducts(data)));
    }
  }, [dispatch, ProductsData]);

  const getFiltered = (cat) => {
    setCurrentPage(1);
    if (cat === "All") {
      dispatch(getProducts(ProductsData));
    } else {
      const filterData = ProductsData.filter((el) => el.category === cat);
      dispatch(filteredProductData(filterData));
    }
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredData.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredData.length / productsPerPage);

  return (
    <>
      <Slider />
      <div className="home-products-container">
        <ProductTitle getFiltered={getFiltered} />
        <div className="products">
          {currentProducts.map((product) => (
            <ProductCard {...product} key={product.id} />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
