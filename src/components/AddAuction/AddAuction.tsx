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
import { fetchCategories, fetchFullSubCategoreis } from "../../services/categoriesService";
import { fetchSubCategories } from "../../services/categoriesService";
import {
  fetchCategoriesStarted,
  fetchCategoriesSuccess,
} from "../../redux/actions/categories";
import AuctionCard from "../Auctions/AuctionCard/AuctionCard";
import PriceLevels from "../PriceLevels/PriceLevels";
import { PriceLevelType } from "../PriceLevels/PriceLevelType";
import SelectDate from "../CommonComponents/SelectDate/SelectDate";
import moment from "moment";
import {
  createProduct,
  fetchFullProduct,
  fetchProducts
} from "../../services/productsService";
import { auctionService } from "../../services/auction-service";
import AutoCompleteDropDown from "../CommonComponents/AutoCompleteDropdown/AutoCompleteDropdown";
import { fetchBrands, fetchFullBrand } from "../../services/brandsService";
import { fetchFullModel, fetchModels } from "../../services/modelsService";
import {ProductType} from "../../redux/types/productType";



export type Item = { name: string, id: number, selectedItem?: string };

const AddAuction = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [auctionName, setAuctionName] = useState("");
  const [category, setCategory] = useState<Item>({name: '', id: -1});
  const [categoryOptions, setCategoryOptions] = useState<Item[]>([]);
  const [subCategory, setSubCategory] = useState<Item>({name: '', id: -1});
  const [subCategoryOptions, setSubCategoryOptions] = useState<Item[]>([]);
  const [product, setProduct] = useState<Item>({name: '', id: -1});
  const [productOptions, setProductOptions] = useState<Item[]>([]);
  const [model, setModel] = useState<Item>({name: '', id: -1});
  const [modelOptions, setModelsOptions] = useState<Item[]>([]);
  const [brand, setBrand] = useState<Item>({name: '', id: -1});
  const [brandOptions, setBrandsOptions] = useState<Item[]>([]);
  const [titleText, setTitleText] = useState<string>("Add New Auction");
  const [addProductMode, setAddProductMode] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
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
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    if(addProductMode) {
      setAddProductMode(false);
      return;
    }
    setModalOpen(false);
  };

  const removeOptions = (type: string) => {
    switch (type) {
      case 'category': {
        setBrandsOptions([]);
        setProductOptions([]);
        setSubCategoryOptions([]);
        setModelsOptions([]);
        setBrandsOptions([]);
        setSubCategory({name: '', id: -1});
        setProduct({name: '', id: -1});
        setBrand({name: '', id: -1});
        setModel({name: '', id: -1});
        break;
      }
      case 'subCategory': {
        setBrandsOptions([]);
        setProductOptions([]);
        setModelsOptions([]);
        setBrandsOptions([]);
        setProduct({name: '', id: -1});
        setBrand({name: '', id: -1});
        setModel({name: '', id: -1});
        break;
      }
      case 'brand': {
        setProductOptions([]);
        setModelsOptions([]);
        setModel({name: '', id: -1});
        setProduct({name: '', id: -1});
        break;
      }
      default:
        break;
    }
  }
  const fetchCategoriesCall = (page: number, searchWord: string = "") => {
    setCategory({...category, name: searchWord, id: -1});
    dispatch(fetchCategoriesStarted());
    fetchCategories(page, searchWord, rbp)
        .then((res) => {
          if (page > 1) {
            setCategoryOptions(categoryOptions.concat(res.data.categories));
          } else {
            setCategoryOptions(res.data.categories);
          }
          setHaseMore({...hasMore, category: res.data.hasMore})
          dispatch(fetchCategoriesSuccess(res.data.categories));
        })
        .catch((err) => console.log("err", err));
  };

  const fetchSubCategoriesCall = (page: number, searchWord: string = "", categoryId: number) => {
    setSubCategory({...subCategory, name: searchWord, id: -1})
    fetchSubCategories(page, searchWord, rbp, categoryId)
        .then((res: any) => {
          if (page > 1) {
            setSubCategoryOptions(subCategoryOptions.concat(res.data.subCategories));
          } else {
            setSubCategoryOptions(res.data.subCategories);
          }
          setHaseMore({...hasMore, subCategory: res.data.hasMore})
          dispatch(fetchCategoriesSuccess(res.data.subCategories));
        })
        .catch((err: any) => console.log("err", err));
  };

  const fetchBrandsCall = (page: number, searchWord: string = "", categoryId: number, subCategoryId: number) => {
    setBrand({...brand, name: searchWord, id: -1})
    fetchBrands(page, searchWord, rbp, categoryId, subCategoryId)
        .then((res: any) => {
          if (page > 1) {
            setBrandsOptions(brandOptions.concat(res.data.brands));
          } else {
            setBrandsOptions(res.data.brands);
          }
          setHaseMore({...hasMore, brand: res.data.hasMore})
        })
        .catch((err: any) => console.log("err", err));
  };

  const fetchModelsCall = (page: number, searchWord: string = "", categoryId: number, subCategoryId: number, brandId: number) => {
    setModel({name: searchWord, id: -1})
    fetchModels(page, searchWord, rbp, categoryId, subCategoryId, brandId)
        .then((res: any) => {
          if (page > 1) {
            setModelsOptions(modelOptions.concat(res.data.models));
          } else {
            setModelsOptions(res.data.models);
          }
          setHaseMore({...hasMore, model: res.data.hasMore})
        })
        .catch((err: any) => console.log("err", err));
  };

  const fetchProductsCall = (page: number, searchWord: string = "", categoryId: number, subCategoryId: number, brandId: number) => {
    setProduct({name: searchWord, id: -1})
    fetchProducts(page, searchWord, rbp, categoryId, subCategoryId, brandId)
        .then((res: any) => {
          if (page > 1) {
            setProductOptions(productOptions.concat(res.data.products));
          } else {
            setProductOptions(res.data.products);
          }
          setHaseMore({...hasMore, product: res.data.hasMore})
        })
        .catch((err: any) => console.log("err", err));
  };

  const setSelectedOptionFromSelectedItem = (data: any) => {
    if (data?.category?.id) {
      setCategory({id: data.category.id, name: data.category.name, selectedItem: data.category.name});
      setCategoryOptions([{id: data.category.id, name: data.category.name}])
    }
    if (data?.subCategory?.id) {
      setSubCategory({id: data.subCategory.id, name: data.subCategory.name, selectedItem: data.subCategory.name});
      setSubCategoryOptions([{id: data.subCategory.id, name: data.subCategory.name}])
    }
    if (data?.brand?.id) {
      setBrand({id: data.brand.id, name: data.brand.name, selectedItem: data.brand.name});
      setBrandsOptions([{id: data.brand.id, name: data.brand.name}])
    }
    if (data?.model?.id) {
      setBrand({id: data.model.id, name: data.model.name, selectedItem: data.model.name});
      setBrandsOptions([{id: data.model.id, name: data.model.name}])
    }
  }

  const handelCategoryChange = (categoryName: string, categoryId: number) => {
    if (categoryName !== category.selectedItem) {
      removeOptions('category');
    }
    setCategory({name: categoryName, id: categoryId, selectedItem: categoryName});
  };

  const handelSubCategoryChange = (subCategoryName: string, subCategoryId: number) => {
    if (subCategoryName !== subCategory.selectedItem) {
      removeOptions('subCategory');
    }
    setSubCategory({name: subCategoryName, id: subCategoryId, selectedItem: subCategoryName});
    if (category.id === -1) {
      fetchFullSubCategoreis(subCategoryId).then((res: any) => {
        setSelectedOptionFromSelectedItem(res.data);
      })
    }
  };

  const handelBrandChange = (brandName: string, brandId: number) => {
    if (brandName !== brand.selectedItem) {
      removeOptions('brand');
    }
    setBrand({name: brandName, id: brandId, selectedItem: brandName})
    if (category.id === -1 || subCategory.id === -1) {
      fetchFullBrand(brandId).then((res: any) => {
        setSelectedOptionFromSelectedItem(res.data);
      })
    }
  }

  const handelModelChange = (modelName: string, modelId: number) => {
    setModel({name: modelName, id: modelId});
    if (category.id === -1 || subCategory.id === -1) {
      fetchFullModel(modelId).then((res: any) => {
        setSelectedOptionFromSelectedItem(res.data);
      })
    }
  };

  const handelProdcutsChange = (productName: string, prodcutId: number) => {
    setProduct({name: productName, id: prodcutId});
    if (category.id === -1 || subCategory.id === -1) {
      fetchFullProduct(prodcutId).then((res: any) => {
        setSelectedOptionFromSelectedItem(res.data);
      })
    }
  };

  const handelEndDateChange = (e: any) => {
    setEndDate(e.target.value);
  };

  const handleSave = () => {
    if (addProductMode) {
      const productData: ProductType = {
        productName: product.name,
        category,
        subCategory,
        brand,
        model,
        name: auctionName,
        description: description
      };
      createProduct(productData).then((res) => {
        setAddProductMode(false);
        setProduct({name: res.data.name, id: res.data.id})
      });
    } else {
      const auctionData = {
        auctionName,
        category,
        subCategory,
        product,
        priceLevels,
        endDate,
        name: auctionName,
        description: description
      };
      auctionService.createAuction(auctionData).then((res) => {
        handleClose();
      });
    }
  };

  const addPriceLevel = ({price, minRegisters}: PriceLevelType) => {
    const newPriceLevel = {price, minRegisters};
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


  function changeToAddProductMode() {
    setTitleText("Add New Product");
    setAddProductMode(true);
  }

  return (
      <AuctionCard className="noBorder">
        <IconButton className="iconButton" onClick={handleOpen}>
          <AddCircleOutline style={{fontSize: 170}}/>
        </IconButton>
        <Dialog
            fullWidth
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{titleText}</DialogTitle>
          <Divider/>
          <DialogContent>
            {!addProductMode &&
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
            }
            <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                fullWidth
                rows={4}
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                  isSelected={category.id > -1}
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
                  isSelected={subCategory.id > -1}
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
                  isSelected={brand.id > -1}
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
                  isSelected={model.id > -1}
                  fetchMoreData={((page: number, searchWord: string) => fetchModelsCall(page, searchWord, category.id, subCategory.id, brand.id))}
              >
              </AutoCompleteDropDown>)}
            </div>
            <div className="auto-complete-container" >
              <AutoCompleteDropDown
                onChange={handelProdcutsChange}
                hasMore={hasMore.product}
                key="product-auto-complete"
                id="product-auto-complete"
                name={"Product"}
                options={productOptions}
                searchWord={product.name}
                isSelected={product.id > -1}
                hideOptions={addProductMode}
                fetchMoreData={((page: number, searchWord: string) => fetchProductsCall(page, searchWord, category.id, subCategory.id, brand.id))}
            >
            </AutoCompleteDropDown>
            </div>
            {!addProductMode &&
            <div>
              <div>
              <Button
                  variant="outlined"
                  color="primary"
                  onClick={changeToAddProductMode}
              >
                Add a new product
              </Button>
            </div>
              <SelectDate
                  label="end date"
                  onChange={handelEndDateChange}
                  defaultValue={moment().format("YYYY-MM-DDTHH:00")}
                  InputLabelProps={{
                    shrink: true,
                  }}
              />
              <Divider classes={{root: "divider"}}/>
              <PriceLevels
                  priceLevels={priceLevels}
                  addPriceLevel={addPriceLevel}
                  removePriceLevel={removePriceLevel}
              />
            </div>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="outlined" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </AuctionCard>
  );
};

export default AddAuction;
