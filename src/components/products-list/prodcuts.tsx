import { CheckBox } from "@material-ui/icons";
import React from "react";
import "./products.scss";
function Products(props: any) {
  return (
    <div className="products-container">
      {props.products.map((product: any) => (
        <div className="product-container">
          <img
            className="product-image"
            src={
              product.src
                ? product.src
                : "https://cdn.azrieli.com/Images/05a63359-eea9-40a2-91ee-87ba1724f44e/Normal/8c145866.jpg"
            }
          ></img>
          <CheckBox
            onChange={(event) =>
              props.onSelect({ product, checked: event.target })
            }
          ></CheckBox>
          <div className="product-name">{product.name}</div>
          <div className="product-name">{product.description}</div>
          <div className="product-name">{product.kind}</div>
          <div className="product-name">{product.company_name}</div>
          <div className="product-name">{product.model}</div>
        </div>
      ))}
    </div>
  );
}

export default Products;
