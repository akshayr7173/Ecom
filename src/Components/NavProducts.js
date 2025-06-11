import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import "./NavProducts.css";

export default function NavProducts() {
  const filteredData = useSelector((state) => state.reducer.filter);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredData.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredData.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="products-container">
      <div className="products">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard
              title={product.title}
              price={product.price}
              rating={product.rating}
              key={product.id}
              id={product.id}
              description={product.description}
              image={product.image}
            />
          ))
        ) : (
          <p>Could not fetch the products!</p>
        )}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
