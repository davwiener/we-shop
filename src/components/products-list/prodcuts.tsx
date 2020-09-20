import Checkbox from "@material-ui/core/Checkbox";
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
            alt="https://cdn.azrieli.com/Images/05a63359-eea9-40a2-91ee-87ba1724f44e/Normal/8c145866.jpg"
          ></img>
          <Checkbox
            checked={product.checked}
            onChange={(event) => {
              console.log(event);
              props.onSelect({ product, checked: event.target.checked });
            }}
            name="checkedB"
            color="primary"
          />
          <div className="fields-container">
            <div className="field">{product.name}</div>
            <div className="field">{product.description}</div>
            <div className="field">{product.kind}</div>
            <div className="field">{product.company_name}</div>
            <div className="field">{product.model}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
