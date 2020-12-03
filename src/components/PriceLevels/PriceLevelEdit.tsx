import React, { useState } from "react";
import { TextField, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./priceLevelEdit.scss";

export interface PriceLevelViewType {
  addPriceLevel: Function;
}

const PriceLevelEdit = ({ addPriceLevel }: PriceLevelViewType) => {
  const [price, setPrice] = useState();
  const [minRegisters, setMinRegisters] = useState();

  const handleChangePrice = (e: any) => setPrice(e.target.value);
  const handleChangeMinRegisters = (e: any) => setMinRegisters(e.target.value);
  const onClickAdd = () => addPriceLevel({ price, minRegisters });

  return (
    <div className="priceLevelEditContainer">
      <TextField
        classes={{ root: "editField" }}
        autoFocus
        variant="outlined"
        type="number"
        label="Price"
        value={price}
        onChange={handleChangePrice}
      ></TextField>
      <TextField
        classes={{ root: "editField" }}
        variant="outlined"
        label="Minimum Registers"
        type="number"
        value={minRegisters}
        onChange={handleChangeMinRegisters}
      ></TextField>
      {/* <Button variant="outlined" color="primary" onClick={onClickAdd}>
        Add
      </Button> */}
    </div>
  );
};

export default PriceLevelEdit;
