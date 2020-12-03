import React from "react";
import { Paper } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import "./Form.scss";

const Form = (props: any) => {
  const renderHeader = () =>
    props.header && (
      <div className="formHeader">
        <div className="title">{props.header}</div>
        <Divider className="formDividerTop" />
      </div>
    );

  const renderFooter = () =>
    props.footer && (
      <div className="formFooter">
        <Divider className="formDividerBottom" />
        <div className="title">{props.footer}</div>
      </div>
    );

  return (
    <Paper className="paper" elevation={5}>
      {renderHeader()}
      {props.children}
      {renderFooter()}
    </Paper>
  );
};

export default Form;
