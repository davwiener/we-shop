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
import { fetchBrands } from "../../services/brandsService";
import { fetchModels } from "../../services/modelsService";



const AddAuction = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [auctionName, setAuctionName] = useState("");
  const [category, setCategory] = useState({ name: '', id: -1 });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategory, setSubCategory] = useState({ name: '', id: -1 });
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [product, setProduct] = useState({ name: '', id: -1 });
  const [productOptions, setProductOptions] = useState([]);
  const [model, setModel] = useState({ name: '', id: -1 });
  const [modelOptions, setModelsOptions] = useState([]);
  const [brand, setBrand] = useState({ name: '', id: -1 });
  const [brandOptions, setBrandsOptions] = useState([]);
  const [hasMore, setHaseMore] = useState({
    category: true,
    subCategory: true,
    product: true,
    brand: true,
    model: true
  })
  const [endDate, setEndDate] = useState("");
  const [priceLevels, setPriceLevels] = useState<PriceLevelType[]>([]);
  const rbp = 50;
  const handelOpen = () => setModalOpen(true);
  const handelClose = () => {
    setModalOpen(false);
  };

  const removeOptions = (type: string) => {
    switch (type) {
      case 'category': {
        setBrandsOptions([]);
        setProductOptions([]);
        setSubCategoryOptions([]);
        setModelsOptions([]);
        break;
      }
      case 'subCategory': {
        setBrandsOptions([]);
        setProductOptions([]);
        setModelsOptions([]);
        break;
      }
      case 'brand': {
        setProductOptions([]);
        setModelsOptions([]);
        break;
      }
      default: break;
    }
  }
  const fetchCategoriesCall = (page: number, searchWord: string = "") => {
    setCategory({ name: searchWord, id: -1 });
    dispatch(fetchCategoriesStarted());
    fetchCategories(page, searchWord, rbp)
      .then((res) => {
        removeOptions('category');
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
    setSubCategory({ name: searchWord, id: -1 })
    fetchSubCategories(page, searchWord, rbp, categoryId)
      .then((res: any) => {
        removeOptions('subCategory');
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

  const fetchBrandsCall = (page: number, searchWord: string = "", categoryId: number, subCategoryId: number) => {
    setBrand({ name: searchWord, id: -1 })
    fetchBrands(page, searchWord, rbp, categoryId, subCategoryId)
      .then((res: any) => {
        removeOptions('brands');
        if (page > 1) {
          setBrandsOptions(brandOptions.concat(res.data.brands));
        } else {
          setBrandsOptions(res.data.brands);
        }
        setHaseMore({ ...hasMore, brand: res.data.hasMore })
      })
      .catch((err: any) => console.log("err", err));
  };

  const fetchModelsCall = (page: number, searchWord: string = "", categoryId: number, subCategoryId: number, brandId: number) => {
    setModel({ name: searchWord, id: -1 })
    fetchModels(page, searchWord, rbp, categoryId, subCategoryId, brandId)
      .then((res: any) => {
        if (page > 1) {
          setModelsOptions(modelOptions.concat(res.data.models));
        } else {
          setModelsOptions(res.data.models);
        }
        setHaseMore({ ...hasMore, model: res.data.hasMore })
      })
      .catch((err: any) => console.log("err", err));
  };

  const fetchProductsCall = (page: number, searchWord: string = "", categoryId: number, subCategoryId: number) => {
    setProduct({ name: searchWord, id: -1 })
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

  const handelCategoryChange = (categoryName: string, categoryId: number) => {
    setCategory({ name: categoryName, id: categoryId });
    removeOptions('category');
    setSubCategory({ name: '', id: -1 });
    setProduct({ name: '', id: -1 });
  };

  const handelSubCategoryChange = (subCategoryName: string, subCategoryId: number) => {
    setSubCategory({ name: subCategoryName, id: subCategoryId });
    removeOptions('subCategory');
    setProduct({ name: '', id: -1 });
  };
  const handelBrandChange = (brandName: string, brandId: number) => {
    removeOptions('brand');
    setBrand({ name: brandName, id: brandId })
  }

  const handelModelChange = (modelName: string, modelId: number) => {
    setModel({ name: modelName, id: modelId });
  };

  const handelProdcutsChange = (productName: string, prodcutId: number) => {
    setProduct({ name: productName, id: prodcutId });
  };
  const handelEndDateChange = (e: any) => {
    setEndDate(e.target.value);
  };

  const handelSave = () => {
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
      <IconButton className="iconButton" onClick={handelOpen}>
        <AddCircleOutline style={{ fontSize: 170 }} />
      </IconButton>
      <Dialog
        fullWidth
        open={modalOpen}
        onClose={handelClose}
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
              onChange={handelCategoryChange}
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
              onChange={handelSubCategoryChange}
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
          <div className="auto-complete-container">
            {(<AutoCompleteDropDown
              onChange={handelBrandChange}
              hasMore={hasMore.brand}
              key="brands-auto-complete"
              id="brands-auto-complete"
              name={"Brand"}
              options={brandOptions}
              searchWord={brand.name}
              fetchMoreData={((page: number, searchWord: string) => fetchBrandsCall(page, searchWord, category.id, subCategory.id))}
            >
            </AutoCompleteDropDown>)}

          </div>
          <div className="auto-complete-container">
            {(<AutoCompleteDropDown
              onChange={handelModelChange}
              hasMore={hasMore.model}
              key="model-auto-complete"
              id="model-auto-complete"
              name={"Model"}
              options={modelOptions}
              searchWord={model.name}
              fetchMoreData={((page: number, searchWord: string) => fetchModelsCall(page, searchWord, category.id, subCategory.id, brand.id))}
            >
            </AutoCompleteDropDown>)}
          </div>
          <div className="auto-complete-container">
            {(<AutoCompleteDropDown
              onChange={handelProdcutsChange}
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
            onChange={handelEndDateChange}
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
          <Button onClick={handelClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handelSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </AuctionCard>
  );
};

export default AddAuction;
