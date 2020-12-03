import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Button, IconButton } from "@material-ui/core";
import { fetchBrands, fetchBrandModels } from "../../services/brandsService";
import { createProduct } from "../../services/productsService";
import { brandType } from "../../redux/types/brandType";
import { modelType } from "../../redux/types/modelType";
import { categoryType } from "../../redux/types/categoryType";
import { EMPTY_BRAND } from "../../constants/brand";
import { EMPTY_MODEL } from "../../constants/model";
import { EMPTY_CATEGORY } from "../../constants/category";
import { AddBoxRounded } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";

const AddProduct = ({ categories }: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [brandOptions, setBrandOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [category, setCategory]: [categoryType, Function] = useState(
    EMPTY_CATEGORY
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand]: [brandType, Function] = useState(EMPTY_BRAND);
  const [model, setModel]: [modelType, Function] = useState(EMPTY_MODEL);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSave = () => {
    createProduct({
      name,
      description,
      brandId: brand.id,
      modelId: model.id,
    });
  };

  const fetchNewProductData = () => {
    fetchBrands()
      .then((res) => {
        setBrandOptions(res.data);
      })
      .catch((err) => console.log("error fetching brands", err));
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleBrandChange = (_: any, value: any) => {
    setBrand(value);
    setModel(EMPTY_MODEL);
    if (value) {
      fetchBrandModels(value)
        .then((res) => {
          setModelOptions(res.data);
        })
        .catch((err) => console.log("error fetching models"));
    }
  };

  const handleModelChange = (e: any, value: any) => {
    setModel(value);
  };

  const handleCategoryChange = (e: any, value: any) => {
    setCategory(value);
  };

  const getOptionLabel = (option: any) => option.name;

  const renderBrandSelect = (params: any) => {
    return (
      <TextField
        {...params}
        required
        label="Brand"
        value={brand}
        margin="normal"
        classes={{ root: "field" }}
      />
    );
  };

  const renderCategorySelect = (params: any) => {
    return (
      <TextField
        {...params}
        required
        label="Category"
        value={category}
        margin="normal"
        classes={{ root: "field" }}
      />
    );
  };

  const renderModelSelect = (params: any) => {
    return (
      <TextField
        {...params}
        required
        label="Model"
        value={model}
        onChange={handleModelChange}
        margin="normal"
        classes={{ root: "field" }}
        helperText="choose from list or add a new model"
      />
    );
  };

  return (
    <div>
      <IconButton
        color="primary"
        size="medium"
        onClick={() => setModalOpen(true)}
      >
        <AddBoxRounded fontSize="large" />
      </IconButton>
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        onEnter={fetchNewProductData}
      >
        <DialogTitle id="form-dialog-title">Add New Product</DialogTitle>
        <DialogContent>
          {/* {/* <TextField
            autoFocus
            label="Product Name"
            value={name}
            onChange={handleNameChange}
            type="text"
            margin="normal"
            fullWidth
          /> */}
          {/* <TextField
            label="Description"
            multiline
            value={description}
            onChange={handleDescriptionChange}
            rowsMax={4}
            margin="normal"
            fullWidth
          />  */}
          <Autocomplete
            options={categories}
            getOptionLabel={getOptionLabel}
            renderInput={(params: any) => renderCategorySelect(params)}
            onChange={handleCategoryChange}
          />
          <Autocomplete
            options={brandOptions}
            getOptionLabel={getOptionLabel}
            renderInput={(params: any) => renderBrandSelect(params)}
            onChange={handleBrandChange}
          />
          <TextField
            label="Model"
            value={name}
            onChange={handleNameChange}
            margin="normal"
            fullWidth
          />
          {/* <Autocomplete
            freeSolo
            disabled={brand.id === -1}
            options={modelOptions}
            getOptionLabel={getOptionLabel}
            renderInput={(params: any) => renderModelSelect(params)}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProduct;

/**
 *
 */
