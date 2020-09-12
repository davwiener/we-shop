import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import React, { useEffect, useState } from "react";
import { productService } from "../../services/product-service";
import Products from "../products-list/prodcuts";
import { Input, InputAdornment, TextareaAutosize } from "@material-ui/core";
function AddAuction(props: any) {
  function handleSubmit(e: any) {
    e.preventDefault();
    if (productId !== 0) {
    }
  }
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    type: "",
    company_name: "",
    model: "",
    description: "",
  });
  const { name, type, company_name, model, description } = product;
  const [productId, setProductId] = useState(0);
  const [auction] = useState({});
  useEffect(() => {
    productService.getProducts("").then((res) => {
      if (res) {
        //const
        setProducts(res.data);
      }
    });
  }, []);
  const selectProduct = (product: any, checked: boolean) => {
    if (checked) {
      setProductId(() => product.productId);
    } else {
      setProductId(() => 0);
    }
  };
  function handleChange(e: any) {
    const { name, value } = e.target;
    setProduct((product) => ({ ...product, [name]: value }));
  }
  function AddProduct() {
    if (
      name !== "" &&
      type !== "" &&
      company_name !== "" &&
      model !== "" &&
      description !== ""
    ) {
      productService.createProduct(product).then((res) => {
        if (res) {
          productService.getProducts("").then((res) => {
            if (res) {
              setProducts(res.data);
            }
          });
        }
      });
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Auction</h2>
      <Products products={products} onSelect={selectProduct}></Products>
      {productId === 0 && (
        <div>
          <TextField
            id="product-name"
            name="name"
            label="Product Name"
            onChange={handleChange}
            value={name}
          />
          <TextField
            id="product-type"
            name="type"
            label="Type"
            onChange={handleChange}
            value={type}
          />
          <TextField
            id="company-name"
            name="company_name"
            label="Company Name"
            onChange={handleChange}
            value={company_name}
          />
          <TextField
            id="product-model"
            name="model"
            label="Company Model"
            onChange={handleChange}
            value={model}
          />
          <Button variant="contained" component="label">
            Upload File
            <input type="file" style={{ display: "none" }} />
          </Button>
          <TextareaAutosize
            id="product-description"
            name="description"
            aria-label="minimum height"
            rowsMin={3}
            placeholder="description"
            onChange={handleChange}
            value={description}
          />
          <Button variant="contained" component="label" onClick={AddProduct}>
            add product
          </Button>
        </div>
      )}
      <InputLabel htmlFor="input-with-icon-adornment">price</InputLabel>
      <Input
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment position="start">
            <i className="fas fa-dollar-sign"></i>
          </InputAdornment>
        }
      />
    </form>
  );
}

export default AddAuction;
