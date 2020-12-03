import React from "react";
import "./PriceLevelView.scss";
import { RemoveRounded } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

export interface PriceLevelViewType {
  price: number;
  minRegisters: number;
  removePriceLevel?: Function;
  index?: number;
}

const PriceLevelView = ({
  price,
  minRegisters,
  removePriceLevel,
  index,
}: PriceLevelViewType) => {
  const handleRemovePriceLevel = () => {
    removePriceLevel!(index);
  };
  return (
    <div className="priceLevelContainer">
      <div>price: {price}</div>
      <div>Minimum Registers: {minRegisters}</div>
      <IconButton>
        <RemoveRounded onClick={handleRemovePriceLevel} />
      </IconButton>
    </div>
  );
};

export default PriceLevelView;
