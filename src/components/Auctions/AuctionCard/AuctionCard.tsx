import React from "react";
import "./AuctionCard.scss";

const AuctionCard = ({ children, className = "" }: any) => {
  return <div className={`${className} auctionCard`}>{children}</div>;
};

export default AuctionCard;
