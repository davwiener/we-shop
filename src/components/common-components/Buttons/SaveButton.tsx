import React from "react";
import SaveIcon from "@material-ui/icons/Save";
import IconButton from "@material-ui/core/IconButton";

const SaveButton = ({ isLoading, onClick }: any) => {
  return isLoading ? (
    <div>Saving..</div>
  ) : (
    <IconButton
      className="saveButton"
      aria-label="add to shopping cart"
      size="small"
      onClick={onClick}
    >
      <SaveIcon />
    </IconButton>
  );
};
export default SaveButton;
