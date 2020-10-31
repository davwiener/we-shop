import React from "react";

const AuctionCardSummary = ({ data, className }: any) => {
  return (
    <div className={className}>
      <div>{data.name}</div>
      <div>Status: {data.status}</div>
    </div>
  );
};

export default AuctionCardSummary;
