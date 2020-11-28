import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./AddAuction.scss";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Button, Divider } from "@material-ui/core";
import { fetchCategories } from "../../api_methods/categories";
import { fetchCategoryProducts } from "../../services/categoriesService";
import {
  fetchCategoriesStarted,
  fetchCategoriesSuccess,
} from "../../redux/actions/categories";
import AuctionCard from "../Auctions/AuctionCard/AuctionCard";
import AddProduct from "../AddProduct/AddProduct";
import { AddBoxRounded } from "@material-ui/icons";
import PriceLevels from "../PriceLevels/PriceLevels";
import { PriceLevelType } from "../PriceLevels/PriceLevelType";
import Select from "../CommonComponents/Select/Select";
import SelectDate from "../CommonComponents/SelectDate/SelectDate";
import moment from "moment";

const AddAuction = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [product, setProduct] = useState("");
  const [productOptions, setProductOptions] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [priceLevels, setPriceLevels] = useState<PriceLevelType[]>([]);
  console.log("end date", endDate);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    setShowAddProduct(false);
  };
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
    fetchCategoryProducts(e.target.value)
      .then((res: any) => {
        setProductOptions(res.data);
      })
      .catch((err: any) => console.log("err", err));
  };

  const handleSubCategoryChange = (e: any) => {
    setSubCategory(e.target.value);
  };

  const handleProductChange = (e: any) => setProduct(e.target.value);

  const handleEndDateChange = (e: any) => setEndDate(e.target.value);

  const addPriceLevel = ({ price, minRegisters }: PriceLevelType) => {
    const newPriceLevel = { price, minRegisters };
    if (priceLevels.length === 0) {
      setPriceLevels([newPriceLevel]);
    } else {
      debugger;
      const indexToInsert = priceLevels.findIndex(
        (priceLevel: PriceLevelType) => price <= priceLevel.price
      );
      if (indexToInsert === -1) {
        setPriceLevels([...priceLevels, newPriceLevel]);
      } else {
        const newPriceLevels = [...priceLevels];
        newPriceLevels.splice(indexToInsert, 0, newPriceLevel);
        setPriceLevels(newPriceLevels);
      }
    }
  };

  const removePriceLevel = (index: number) => {
    debugger;
    const newPriceLevels = [...priceLevels];
    newPriceLevels.splice(index, 1);
    setPriceLevels(newPriceLevels);
  };

  return (
    <AuctionCard className="noBorder">
      <IconButton className="iconButton" onClick={handleOpen}>
        <AddCircleOutline style={{ fontSize: 170 }} />
      </IconButton>
      <Dialog
        fullWidth
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        onEnter={fetchNewAuctionData}
      >
        <DialogTitle id="form-dialog-title">Add New Auction</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            autoFocus
            variant="outlined"
            size="small"
            label="Title"
            type="text"
            margin="normal"
            fullWidth
          />
          <Select required label="category" onChange={handleCategoryChange}>
            {categoryOptions.map((option: any, index: number) => (
              <option key={index} value={option.id}>
                {option.name}
              </option>
            ))}
          </Select>
          <Select
            required
            label="sub category"
            onChange={handleSubCategoryChange}
          >
            {categoryOptions.map((option: any, index: number) => (
              <option key={index} value={option.id}>
                {option.name}
              </option>
            ))}
          </Select>
          <div className="test">
            <Select
              required
              label="Product"
              onChange={handleProductChange}
              disabled={category.toString() === ""}
            >
              {productOptions.map((option: any, index: number) => (
                <option key={index} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>
            <AddProduct categories={categoryOptions} />
          </div>
          <SelectDate
            label="end date"
            onChange={handleEndDateChange}
            defaultValue={moment().format("YYYY-MM-DDTHH:00")}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Divider classes={{ root: "divider" }} />
          <PriceLevels
            priceLevels={priceLevels}
            addPriceLevel={addPriceLevel}
            removePriceLevel={removePriceLevel}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </AuctionCard>
  );
};

export default AddAuction;
