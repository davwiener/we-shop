import React from "react";
import { Paper } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import "./Form.scss";

const Form = (props: any) => {
  const renderHeader = () =>
    props.header ? (
      <>
        <div className="title">{props.header}</div>
        <Divider variant="middle" className="divider" />
      </>
    ) : null;

  const renderFooter = () =>
    props.footer ? (
      <>
        <Divider variant="middle" className="divider" />
        <div className="title">{props.footer}</div>
      </>
    ) : null;

  return (
    <Paper className="paper" elevation={5}>
      {renderHeader()}
      {props.children}
      {renderFooter()}
    </Paper>
  );
};

export default Form;
