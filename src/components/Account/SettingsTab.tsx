import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import EditableText from "../../components/common-components/Text/EditableText";
import SaveButton from "../common-components/Buttons/SaveButton";
import { saveAccountSettings } from "../../redux/actions/account";
import {
  fetchAccountData,
  fetchAccountSuccess,
} from "../../redux/actions/account";
import { WeShopState } from "../../redux/store";
import "./SettingsTab.scss";

const SettingsTab = () => {
  const { userName } = useSelector((state: WeShopState) => state.user);
  const { name, isDataLoaded } = useSelector(
    (state: WeShopState) => state.account
  );
  const dispatch = useDispatch();
  const [tempAccountName, setTempAccountName] = useState(name || "");
  const [tempUserName, setTempUserName] = useState(userName || "");
  const [IsSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    !isDataLoaded &&
      !userName &&
      fetchAccountData().then((result) => {
        dispatch(fetchAccountSuccess(result.data));
        setTempAccountName(result.data.name);
      });
    setTempUserName(userName);
  }, [userName, isDataLoaded]);

  const handleChange = (field: String) => (e: any) => {
    const value = e.target.value;
    switch (field) {
      case "account":
        setTempAccountName(value);
        break;
      case "username":
        setTempUserName(value);
        break;
      default:
    }
  };

  const handleSave = () => {
    saveAccountSettings({
      userName: tempUserName,
      accountName: tempAccountName,
    }).then((respone) => {
      setIsSubmitting(true);
    });
  };

  return (
    <div>
      <EditableText>
        <TextField
          label={"account name"}
          value={tempAccountName}
          onChange={handleChange("account")}
          size="medium"
        />
      </EditableText>
      <EditableText>
        <TextField
          label={"user name"}
          value={tempUserName}
          onChange={handleChange("username")}
          size="medium"
        />
      </EditableText>
      <SaveButton IsSubmitting={IsSubmitting} onClick={handleSave} />
    </div>
  );
};

export default SettingsTab;
