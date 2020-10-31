import { TextField } from "@material-ui/core";
import React from "react";
import { AuctionType, ProductType } from "../../../redux/types/search-types";
import Product from "../Product/Product";
function Auction(props: { auction: AuctionType; id: string }) {
  console.log("props ===>", props);
  const openAuction = (product: ProductType) => {
    // open a product page
    console.log(product);
  };
  return (
    <div>
      <div>
        <Product
          product={props.auction.product}
          onSelect={openAuction}
        ></Product>
      </div>
      <div className="fields-container">
        <TextField
          id={`${props.auction.id} ${props.id} auction-auction-name`}
          label="Auction Name"
          defaultValue={props.auction.name}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id={`${props.auction.id} ${props.id} auction-auction-price-levels`}
          label="Price Levels"
          defaultValue={props.auction.price_levels}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id={`${props.auction.id} ${props.id} auction-auction-end-date`}
          label="End Date"
          defaultValue={props.auction.end_date}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id={`${props.auction.id} ${props.id} auction-auction-description`}
          label="Description"
          defaultValue={props.auction.description}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
    </div>
  );
}
export default Auction;
