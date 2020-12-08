import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import "./priceLevelEdit.scss";

export interface PriceLevelViewType {
  addPriceLevel: Function;
}

const PriceLevelEdit = ({ setPriceLevel }: any) => {
  const [price, setPrice] = useState();
  const [minRegisters, setMinRegisters] = useState();

  const handleChangePrice = (e: any) => setPrice(e.target.value);
  const handleChangeMinRegisters = (e: any) => setMinRegisters(e.target.value);

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
    </div>
  );
};

export default PriceLevelEdit;
