import React, { useState } from "react";
import AddPriceLevel from "./AddPriceLevel";
import { IconButton } from "@material-ui/core";
import "./PriceLevels.scss";
import PriceLevelView from "../PriceLevels/PriceLevelView";
import { PriceLevelType } from "./PriceLevelType";
import { AddBoxRounded } from "@material-ui/icons";

const PriceLevels = ({ priceLevels, addPriceLevel, removePriceLevel }: any) => {
  const [ModalOpen, setModalOpen] = useState(false);

  const handleAddPriceLevel = (value: PriceLevelType) => {
    setModalOpen(false);
    addPriceLevel(value);
  };

  const handleModalClose = () => setModalOpen(false);

  return (
    <div className="priceLevelsContainer">
      <div className="title">
        <span>Price Levels - Add between 1 and 3</span>
        <IconButton
          color="primary"
          disabled={priceLevels.length === 3}
          size="medium"
          onClick={() => setModalOpen(true)}
        >
          <AddBoxRounded fontSize="large" />
        </IconButton>
        <AddPriceLevel
          ModalOpen={ModalOpen}
          handleModalClose={handleModalClose}
          addPriceLevel={handleAddPriceLevel}
        />
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
    </div>
  );
};

export default PriceLevels;
