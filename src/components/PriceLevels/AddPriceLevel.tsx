import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { TextField } from "@material-ui/core";

const AddPriceLevel = ({ ModalOpen, handleModalClose, addPriceLevel }: any) => {
  const [price, setPrice] = useState();
  const [minRegisters, setMinRegisters] = useState();

  const handleAddPriceLevel = (value: any) => {
    addPriceLevel({ price, minRegisters });
  };

  return (
    <div>
      <Dialog open={ModalOpen} onClose={handleModalClose}>
        <DialogTitle id="form-dialog-title">Add Price Level</DialogTitle>
        <Divider />
        <DialogContent>
          <div className="priceLevelEditContainer">
            <TextField
              classes={{ root: "editField" }}
              autoFocus
              variant="outlined"
              type="number"
              label="Price"
              value={price}
              onChange={(e: any) => setPrice(e.target.value)}
            ></TextField>
            <TextField
              classes={{ root: "editField" }}
              variant="outlined"
              label="Minimum Registers"
              type="number"
              value={minRegisters}
              onChange={(e: any) => setMinRegisters(e.target.value)}
            ></TextField>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddPriceLevel} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddPriceLevel;
