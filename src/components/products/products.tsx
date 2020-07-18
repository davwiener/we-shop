import React from "react";
import Filters from "../filters/filters";
import "./products.scss";
function Products() {
  return (
    <div className="products-container">
      <div className="products">Products</div>
      <div className="filters">
        <Filters></Filters>
      </div>
    </div>
  );
}
export default Products;
