import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import React, { useEffect, useState } from "react";
import { productService } from "../../services/product-service";
import { auctionService } from "../../services/auction-service";
import Products from "../Products/Prodcuts";
import { Input, InputAdornment, TextareaAutosize } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import moment from "moment";
import "./AddAuction.scss";
import { string } from "yup";
function AddAuction(props: any) {
  const minDate = moment(moment().add(1, "day").toDate()).format(
    "YYYY-MM-DDThh:mm"
  );
  const [products, setProducts] = useState(Array());
  const [product, setProduct] = useState({
    name: "",
    type: "",
    company_name: "",
    model: "",
    description: "",
  });
  const [auction, setAuction] = useState({
    productId: 0,
    product: product,
    price_levels: "",
    description: "",
    name: "",
    end_date: minDate,
  });
  auction.product = product;
  const { name, type, company_name, model, description } = product;

  const [showProducts, setShowProducts] = useState(false);
  useEffect(() => {
    productService.getProducts({ productName: "" }).then((res) => {
      if (res) {
        setProducts(
          res.data.map((product: any) => {
            product.selected = false;
            return product;
          })
        );
      }
    });
  }, []);
  const selectProduct = (event: any) => {
    event.product.selected = event.selected;
    setProducts(
      products.map((product: any) => {
        if (product.id === event.product.id) {
          product.selected = event.selected;
        } else {
          product.selected = false;
        }
        return product;
      })
    );
    if (event.selected) {
      setProduct((product) => event.product);
      handleAuctionChange("productId", event.product.id);
    } else {
      handleAuctionChange("productId", "");
    }
  };
  const handleAuctionChange = (name: string, value: any) => {
    setAuction((auction) => ({ ...auction, [name]: value }));
  };
  const handleProductChange = (e: any) => {
    const { name, value } = e.target;
    setProduct((product) => ({ ...product, [name]: value }));
  };
  function addAuction() {
    if (
      (auction.productId !== 0 ||
        (name !== "" &&
          type !== "" &&
          company_name !== "" &&
          model !== "" &&
          description !== "")) &&
      auction.end_date &&
      auction.price_levels !== "" &&
      auction.description !== "" &&
      auction.name !== ""
    ) {
      auctionService.createAuction(auction);
    }
  }
  return (
    <form onSubmit={addAuction}>
      <h2 className="center-element">Add Auction</h2>
      <div className="fields-container">
        <TextField
          id="auction-name"
          name="name"
          label="Auction Name"
          onChange={(e) => handleAuctionChange("name", e.target.value)}
          value={auction.name}
        />
        <InputLabel htmlFor="input-with-icon-adornment">price</InputLabel>
        <Input
          id="add-auction-price-levels"
          name="price_levels"
          value={auction.price_levels}
          onChange={(e) => handleAuctionChange("price_levels", e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <i className="fas fa-dollar-sign"></i>
            </InputAdornment>
          }
        />
        <TextField
          onChange={(e) => handleAuctionChange("end_date", e.target.value)}
          id="add-auction-end-date"
          label="Auction End Date and Time"
          type="datetime-local"
          name="end_date"
          defaultValue={minDate}
          inputProps={{ min: minDate }}
          InputLabelProps={{
            shrink: true,
          }}
          value={auction.end_date}
        />
        <TextField
          onChange={(e) => handleAuctionChange("description", e.target.value)}
          id="add-auction-auction_description"
          label="description"
          name="description"
          defaultValue={auction.description}
          value={auction.description}
        />
        <TextField
          id="add-auction-product-name"
          name="name"
          label="Product Name"
          onChange={handleProductChange}
          value={name}
        />
        <TextField
          id="add-auction-product-type"
          name="type"
          label="Type"
          onChange={handleProductChange}
          value={type}
        />
        <TextField
          id="add-auction-company-name"
          name="company_name"
          label="Company Name"
          onChange={handleProductChange}
          value={company_name}
        />
        <TextField
          id="add-auction-product-model"
          name="model"
          label="Company Model"
          onChange={handleProductChange}
          value={model}
        />
        <Button variant="contained" component="label">
          Upload File
          <input type="file" style={{ display: "none" }} />
        </Button>
        <TextareaAutosize
          id="add-auction-product-description"
          name="description"
          aria-label="minimum height"
          rowsMin={3}
          placeholder="product_description"
          onChange={handleProductChange}
          value={description}
        />
        <Button variant="contained" component="label" onClick={addAuction}>
          add auction
        </Button>
      </div>
      <div className="center-element">
        <FormControlLabel
          control={
            <Switch
              checked={showProducts}
              onChange={() => setShowProducts(!showProducts)}
              name="products-toggle"
            />
          }
          label={
            showProducts
              ? "Create a new product"
              : "Chose From a list of products"
          }
        />
      </div>
      {showProducts && (
        <Products
          className="products"
          products={products}
          onSelect={selectProduct}
        ></Products>
      )}
    </form>
  );
}

export default AddAuction;
