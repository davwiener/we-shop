import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AuctionCard from "./AuctionCard/AuctionCard";
import "./AddAuction.scss";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { MenuItem, FormControl, InputLabel, Button } from "@material-ui/core";
import { fetchCategories } from "../../api_methods/categories";
import { productService } from "../../services/product-service";
import {
  fetchCategoriesStarted,
  fetchCategoriesSuccess,
} from "../../redux/actions/categories";

const AddAuction = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [product, setProduct] = useState("");
  const [productOptions, setProductOptions] = useState([]);
  const [endDate, setEndDate] = useState("");

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const fetchNewAuctionData = () => {
    dispatch(fetchCategoriesStarted());
    fetchCategories()
      .then((res) => {
        setCategoryOptions(res.data);
        dispatch(fetchCategoriesSuccess(res.data));
      })
      .catch((err) => console.log("err", err));
  };

  const handleCategoryChange = (e: any) => {
    setCategory(e.target.value);
    setProduct("");
    productService
      .getProducts({ category: e.target.value })
      .then((res: any) => {
        setProductOptions(res.data);
      })
      .catch((err: any) => console.log("err", err));
  };

  const handleProductChange = (e: any) => setProduct(e.target.value);

  const handleEndDateChange = (e: any) => setEndDate(e.target.value);

  return (
    <AuctionCard className="noBorder">
      <IconButton className="iconButton" onClick={handleOpen}>
        <AddCircleOutline style={{ fontSize: 170 }} />
      </IconButton>
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        onEnter={fetchNewAuctionData}
      >
        <DialogTitle id="form-dialog-title">Add New Auction</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="name"
            label="Title"
            type="text"
            margin="normal"
            fullWidth
          />
          <TextField
            select
            required
            label="Category"
            value={category}
            onChange={handleCategoryChange}
            margin="normal"
            classes={{ root: "field" }}
          >
            {categoryOptions.map((option: any, index: number) => (
              <option key={index} value={option.id}>
                {option.name}
              </option>
            ))}
          </TextField>
          <TextField
            select
            required
            label="Product"
            value={product}
            onChange={handleProductChange}
            margin="normal"
            classes={{ root: "field" }}
            disabled={category.toString() === ""}
          >
            {productOptions.map((option: any, index: number) => (
              <option key={index} value={option.id}>
                {option.name}
              </option>
            ))}
            {/* <option value={1}>Basket Ball</option>
            <option value={2}>Soccer Ball</option>
            <option value={3}>Tennis Ball</option> */}
          </TextField>
          <TextField
            value={endDate}
            margin="normal"
            id="endDate"
            label="End Date"
            type="date"
            onChange={handleEndDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            classes={{ root: "field" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </AuctionCard>
  );
};

export default AddAuction;
