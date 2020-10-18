import React from "react";
import "./Product.scss";
function Product(props: any) {
  return (
    <div
      className={
        props.checked ? "product-container selected" : "product-container"
      }
      onClick={(event) => {
        console.log(event);
        props.onSelect({
          product: props.product,
          selected: !props.product.selected,
        });
      }}
    >
      <img
        className="product-image"
        src={
          props.product.src
            ? props.product.src
            : "https://cdn.azrieli.com/Images/05a63359-eea9-40a2-91ee-87ba1724f44e/Normal/8c145866.jpg"
        }
        alt="https://cdn.azrieli.com/Images/05a63359-eea9-40a2-91ee-87ba1724f44e/Normal/8c145866.jpg"
      ></img>
      <div className="fields-container">
        <div className="field">{props.product.name}</div>
        <div className="field">{props.product.description}</div>
        <div className="field">{props.product.kind}</div>
        <div className="field">{props.product.company_name}</div>
        <div className="field">{props.product.model}</div>
      </div>
    </div>
  );
}
export default Product;
