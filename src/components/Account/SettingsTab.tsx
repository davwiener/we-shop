import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import EditableText from "../../components/common-components/Text/EditableText";
import SaveButton from "../common-components/Buttons/SaveButton";
import { saveAccountSettings } from "../../redux/actions/account";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  fetchAccountData,
  fetchAccountSuccess,
} from "../../redux/actions/account";
import { WeShopState } from "../../redux/store";
import "./SettingsTab.scss";

const SettingsTab = () => {
  const dispatch = useDispatch();
  const [tempUserName, setTempUserName] = useState("");
  useEffect(() => {
    fetchAccountData().then((res) => {
      dispatch(fetchAccountSuccess(res.data));
      setTempUserName(res.data.userName);
    });
  }, [dispatch]);

  const { isLoading, userName } = useSelector(
    (state: WeShopState) => state.user
  );

  // const handleSave = () => {
  //   saveAccountSettings({
  //     userName: tempUserName,
  //     accountName: tempAccountName,
  //   }).then((respone) => {
  //     setIsSubmitting(true);
  //   });
  // };

  const handleChange = (e: any) => {
    setTempUserName(e.target.value);
  };

  return (
    <div className="wrapper">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <label>Username</label>
          <input
            value={tempUserName}
            placeholder="Enter username"
            key="snir"
            type="text"
            onChange={handleChange}
          ></input>
          <button>update</button>
        </div>
      )}
    </div>
  );
};

export default SettingsTab;
