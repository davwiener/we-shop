import React, { useEffect, useState } from "react";
import {
  fetchAccountData,
  fetchAccountSuccess,
  fetchAccountStarted,
  updateAccountData,
} from "../../redux/actions/account";
import Container from "@material-ui/core/Container";
import Header from "../../components/common-components/Header/Header";
import EditableText from "../../components/common-components/Text/EditableText";
import TextField from "@material-ui/core/TextField";
import SaveButton from "../common-components/Buttons/SaveButton";
import "./AccountSettings.scss";
import { useDispatch, useSelector } from "react-redux";
import { WeShopState } from "../../redux/store";

const AccountSettings = () => {
  const dispatch = useDispatch();
  const { name, dataLoaded } = useSelector(
    (state: WeShopState) => state.account
  );
  const { userName } = useSelector((state: WeShopState) => state.user);
  const [accountName, setAccountName] = useState(name);
  const [IsSavingAccountName, setIsSavingAccountName] = useState(false);
  const [myUserName, setUserName] = useState(userName);

  useEffect(() => {
    if (!dataLoaded) {
      dispatch(fetchAccountStarted());
      fetchAccountData().then((result: any) => {
        dispatch(fetchAccountSuccess(result.data));
        setAccountName(result.data.name);
      });
    }
  }, [dispatch, dataLoaded]);

  const handleChange = (field: String) => (e: any) => {
    switch (field) {
      case "account":
        setAccountName(e.target.value);
        break;
      case "username":
        setUserName(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSave = (field: String) => () => {
    switch (field) {
      case "account":
        setIsSavingAccountName(true);
        updateAccountData({ name: accountName }).then((result: any) => {
          setAccountName(result.data.name);
          setTimeout(() => {
            setIsSavingAccountName(false);
          }, 1000);
        });
        break;
      default:
        break;
    }
  };

  return (
    <Container className="container">
      <Header title="Account Settings" />
      <EditableText>
        <TextField
          label={"account name"}
          value={accountName}
          onChange={handleChange("account")}
          size="medium"
        />
        <SaveButton
          isLoading={IsSavingAccountName}
          onClick={handleSave("account")}
        />
      </EditableText>
      <EditableText>
        <TextField
          label={"user name"}
          value={myUserName}
          onChange={handleChange("username")}
          size="medium"
        />
      </EditableText>
    </Container>
  );
};

export default AccountSettings;
