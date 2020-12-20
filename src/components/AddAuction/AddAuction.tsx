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
import SelectDate from "../CommonComponents/SelectDate/SelectDate";
import moment from "moment";
import {
  fetchProducts
} from "../../services/productsService";
import { auctionService } from "../../services/auction-service";
import AutoCompleteDropDown from "../CommonComponents/AutoCompleteDropdown/AutoCompleteDropdown";



const AddAuction = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [auctionName, setAuctionName] = useState("");
  const [category, setCategory] = useState({ name: '', id: -1 });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [hasMore, setHaseMore] = useState({
    category: true,
    subCategory: true,
    product: true,
    brand: true,
    model: true
  })
  const [subCategory, setSubCategory] = useState({ name: '', id: -1 });
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [product, setProduct] = useState({ name: '', id: -1 });
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
        setHaseMore({ ...hasMore, category: res.data.hasMore })
        dispatch(fetchCategoriesSuccess(res.data.categories));
      })
      .catch((err) => console.log("err", err));
  };

  const fetchSubCategoriesCall = (page: number, searchWord: string = "", categoryId: number) => {
    setSubCategory({ name: searchWord, id: subCategory.id })
    fetchSubCategories(page, searchWord, rbp, categoryId)
      .then((res: any) => {
        if (page > 1) {
          setSubCategoryOptions(subCategoryOptions.concat(res.data.subCategories));
        } else {
          setSubCategoryOptions(res.data.subCategories);
        }
        setHaseMore({ ...hasMore, subCategory: res.data.hasMore })
        dispatch(fetchCategoriesSuccess(res.data.subCategories));
      })
      .catch((err: any) => console.log("err", err));
  };

  const fetchProductsCall = (page: number, searchWord: string = "", categoryId: number, subCategoryId: number) => {
    setProduct({ name: searchWord, id: product.id })
    fetchProducts(page, searchWord, rbp, categoryId, subCategoryId)
      .then((res: any) => {
        if (page > 1) {
          setProductOptions(productOptions.concat(res.data.products));
        } else {
          setProductOptions(res.data.products);
        }
        setHaseMore({ ...hasMore, product: res.data.hasMore })
      })
      .catch((err: any) => console.log("err", err));
  };

  const handleCategoryChange = (categoryName: string, categoryId: number) => {
    setCategory({ name: categoryName, id: categoryId });
    setSubCategory({ name: '', id: -1 });
    setProduct({ name: '', id: -1 });
    fetchSubCategoriesCall(1, '', categoryId);
    fetchProductsCall(1, '', categoryId, -1);
  };

  const handleSubCategoryChange = (subCategoryName: string, subCategoryId: number) => {
    setSubCategory({ name: subCategoryName, id: subCategoryId });
    setProduct({ name: '', id: -1 });
    fetchProductsCall(1, '', category.id, subCategoryId);
  };

  const handleProdcutsChange = (productName: string, prodcutId: number) => {
    setProduct({ name: productName, id: prodcutId });
  };

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
              hasMore={hasMore.category}
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
              hasMore={hasMore.subCategory}
              key="sub-catergory-auto-complete"
              id="sub-catergory-auto-complete"
              name={"Sub Category"}
              options={subCategoryOptions}
              searchWord={subCategory.name}
              fetchMoreData={((page: number, searchWord: string) => fetchSubCategoriesCall(page, searchWord, category.id))}
            >
            </AutoCompleteDropDown>)}
          </div>
          <div className="test">
            {(<AutoCompleteDropDown
              onChange={handleProdcutsChange}
              hasMore={hasMore.product}
              key="product-auto-complete"
              id="product-auto-complete"
              name={"Product"}
              options={productOptions}
              searchWord={product.name}
              fetchMoreData={((page: number, searchWord: string) => fetchProductsCall(page, searchWord, category.id, subCategory.id))}
            >
            </AutoCompleteDropDown>)}
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
