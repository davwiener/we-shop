import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import "./PriceLevels.scss";
import PriceLevelEdit from "../PriceLevels/PriceLevelEdit";
import PriceLevelView from "../PriceLevels/PriceLevelView";
import { PriceLevelType } from "./PriceLevelType";
import { AddBoxRounded } from "@material-ui/icons";

const PriceLevels = ({ priceLevels, addPriceLevel, removePriceLevel }: any) => {
  const [ModalOpen, setModalOpen] = useState(false);
  const renderAddButton = () => (
    <IconButton
      color="primary"
      disabled={priceLevels.length === 3}
      size="medium"
      onClick={() => setModalOpen(true)}
    >
      <AddBoxRounded fontSize="large" />
    </IconButton>
  );
  const handleClose = () => setModalOpen(false);
  const handleAddPriceLevel = (value: PriceLevelType) => {
    setModalOpen(false);
    addPriceLevel(value);
  };

  return (
    <div className="priceLevelsContainer">
      <div className="title">
        <span>Price Levels - Add between 1 and 3</span>
        {renderAddButton()}
      </div>
      <div className="priceLevels">
        {priceLevels.map((priceLevel: PriceLevelType, index: number) => (
          <PriceLevelView
            minRegisters={priceLevel.minRegisters}
            price={priceLevel.price}
            removePriceLevel={removePriceLevel}
            index={index}
          />
        ))}
      </div>
      <Dialog open={ModalOpen} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Add Price Level</DialogTitle>
        <Divider />
        <DialogContent>
          <PriceLevelEdit addPriceLevel={handleAddPriceLevel} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PriceLevels;
