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
import { Button, Divider, InputLabel, makeStyles, Menu, MenuItem } from "@material-ui/core";
import { fetchCategories } from "../../services/categoriesService";
import { fetchSubCategories } from "../../services/categoriesService";
import {
  fetchCategoriesStarted,
  fetchCategoriesSuccess,
} from "../../redux/actions/categories";
import AuctionCard from "../Auctions/AuctionCard/AuctionCard";
import AddProduct from "../AddProduct/AddProduct";
import PriceLevels from "../PriceLevels/PriceLevels";
import { PriceLevelType } from "../PriceLevels/PriceLevelType";
import Select from "../CommonComponents/Select/Select";
import SelectDate from "../CommonComponents/SelectDate/SelectDate";
import moment from "moment";
import {
  fetchProductsByCategory,
  fetchProductsBySubCategory,
} from "../../services/productsService";
import { auctionService } from "../../services/auction-service";
import AutoCompleteDropDown from "../CommonComponents/AutoCompleteDropdown/AutoCompleteDropdown";
import { Category } from "@material-ui/icons";


const AddAuction = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [auctionName, setAuctionName] = useState("");
  const [category, setCategory] = useState({ name: '', id: -1 });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [hasMoreCategoryOptions, setHasMoreCategoryOptions] = useState(true);
  const [hasMoreSubCategoryOptions, setHasMoreSubCategoryOptions] = useState(true);
  const [subCategory, setSubCategory] = useState("");
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [product, setProduct] = useState("");
  const [productOptions, setProductOptions] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [priceLevels, setPriceLevels] = useState<PriceLevelType[]>([]);
  const rbp = 50;
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    setShowAddProduct(false);
  };
  const fetchCategoriesCall = (page: number, searchWord: string = "") => {
    setCategory({ name: searchWord, id: category.id });
    dispatch(fetchCategoriesStarted());
    fetchCategories(page, searchWord, rbp)
      .then((res) => {
        if (page > 1) {
          setCategoryOptions(categoryOptions.concat(res.data.categories));
        } else {
          setCategoryOptions(res.data.categories);
        }
        setHasMoreCategoryOptions(res.data.hasMore)
        dispatch(fetchCategoriesSuccess(res.data.categories));
      })
      .catch((err) => console.log("err", err));
  };

  const fetchSubCategoriesCall = (page: number, searchWord: string = "") => {
    debugger;
    setSubCategory(searchWord);
    fetchSubCategories(page, searchWord, rbp, category.id)
      .then((res: any) => {
        debugger;
        if (page > 1) {
          setSubCategoryOptions(subCategoryOptions.concat(res.data.subCategories));
        } else {
          setSubCategoryOptions(res.data.subCategories);
        }
        setHasMoreSubCategoryOptions(res.data.hasMore)
        dispatch(fetchCategoriesSuccess(res.data.subCategories));
      })
      .catch((err: any) => console.log("err", err));
  };


  const handleCategoryChange = (categoryName: string, categoryId: number) => {
    setCategory({ name: categoryName, id: categoryId });
    setSubCategory("");
    setProduct("");
    fetchSubCategories(1, '', rbp, 1)
      .then((res: any) => {
        if (res.data.length !== 0) {
          setSubCategoryOptions(res.data);
        } else {
          handleSubCategoryChange({ target: { value: -1 } });
        }
      })
      .catch((err: any) => console.log("err", err));
  };

  const handleSubCategoryChange = (e: any) => {
    const subCat = e.target.value;
    setProduct("");
    setSubCategory(subCat.toString());
    if (subCat === -1) {
      fetchProductsByCategory(category.name);
    } else {
      fetchProductsBySubCategory(category.name).then((res: any) => {
        setProductOptions(res.data);
      });
    }
  };

  const handleProductChange = (e: any) => setProduct(e.target.value);

  const handleEndDateChange = (e: any) => {
    setEndDate(e.target.value);
  };

  const handleSave = () => {
    const auctionData = {
      auctionName,
      category,
      subCategory,
      product,
      priceLevels,
      endDate,
      name: auctionName,
    };
    auctionService.createAuction(auctionData).then((res) => { });
  };

  const addPriceLevel = ({ price, minRegisters }: PriceLevelType) => {
    const newPriceLevel = { price, minRegisters };
    if (priceLevels.length === 0) {
      setPriceLevels([newPriceLevel]);
    } else {
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
    const newPriceLevels = [...priceLevels];
    newPriceLevels.splice(index, 1);
    setPriceLevels(newPriceLevels);
  };

  const renderOptions = (options: any) => {
    if (options.length === 0) {
      return (
        <MenuItem key={"none"} value={-1}>
          No options available
        </MenuItem>
      );
    } else
      return options.map((option: any, index: number) => {
        return (
          <MenuItem key={index} value={option.id}>
            {option.name}
          </MenuItem>
        );
      });
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
            value={auctionName}
            onChange={(e) => setAuctionName(e.target.value)}
          />
          <div className="auto-complete-container">
            {(<AutoCompleteDropDown
              onChange={handleCategoryChange}
              hasMore={hasMoreCategoryOptions}
              key="catergory-auto-complete"
              id="catergory-auto-complete"
              name={"Category"}
              options={categoryOptions}
              searchWord={category.name}
              fetchMoreData={((page: number, searchWord: string) => fetchCategoriesCall(page, searchWord))}
            >
            </AutoCompleteDropDown>)}
          </div>
          <div className="auto-complete-container">
            {(<AutoCompleteDropDown
              onChange={handleSubCategoryChange}
              hasMore={hasMoreSubCategoryOptions}
              key="sub-catergory-auto-complete"
              id="sub-catergory-auto-complete"
              name={"Sub Category"}
              options={subCategoryOptions}
              searchWord={subCategory}
              fetchMoreData={((page: number, searchWord: string) => fetchSubCategoriesCall(page, searchWord))}
            >
            </AutoCompleteDropDown>)}
          </div>
          <div className="test">
            <Select
              required
              label="Product"
              onChange={handleProductChange}
              value={product}
            >
              {renderOptions(productOptions)}
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
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </AuctionCard>
  );
};

export default AddAuction;
