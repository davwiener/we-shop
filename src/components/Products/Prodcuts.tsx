import Checkbox from "@material-ui/core/Checkbox";
import React from "react";
import Product from "../CommonComponents/Product/Product";
import "./products.scss";
function Products(props: any) {
  return (
    <div className="products-container">
      {props.products.map((product: any) => (
        <Product
          id={product.id}
          product={product}
          onSelect={props.onSelect}
          selected={props.selected}
        ></Product>
      ))}
    </div>
  );
}

export default Products;
