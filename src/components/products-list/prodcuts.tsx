import Checkbox from "@material-ui/core/Checkbox";
import React from "react";
import Product from "../common-components/product/product";
import "./products.scss";
function Products(props: any) {
  return (
    <div className="products-container">
      {props.products.map((product: any) => (
        <Product product={product}></Product>
      ))}
    </div>
  );
}

export default Products;
