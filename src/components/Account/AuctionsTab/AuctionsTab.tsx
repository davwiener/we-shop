import React from "react";
import { useEffect, useState } from "react";
import { fetchUserAuctions } from "../../../redux/actions/auctions";
import "./AuctionsTab.scss";
import AuctionCard from "../../Auctions/AuctionCard/AuctionCard";
import AuctionCardImage from "../../Auctions/AuctionCard/AuctionCardImage";
import AuctionCardSummary from "../../Auctions/AuctionCard/AuctionCardSummary";

import { useDispatch, useSelector } from "react-redux";
import { accountAuctionsLoaded } from "../../../redux/actions/account";
import { WeShopState } from "../../../redux/store";
import { Divider, IconButton } from "@material-ui/core";
import AddAuction from "../../AddAuction/AddAuction";
import { AddBoxRounded } from "@material-ui/icons";
import { Link } from "react-router-dom";

export interface userAuctionsStruct {
  name: string;
  id: number;
  productId: number;
}

const AuctionsTab = () => {
  const dispatch = useDispatch();
  const { isAccountAuctionsLoaded } = useSelector(
    (state: WeShopState) => state.account
  );
  const [userAuctions, setUserAuctions] = useState<
    userAuctionsStruct[] | undefined
  >();
  useEffect(() => {
    fetchUserAuctions()
      .then((result: any) => {
        setUserAuctions(result.data);
        dispatch(accountAuctionsLoaded());
      })
      .catch((err) => console.log("error fetching user auctions:", err));
  }, [dispatch]);

  const renderAuctions = () => {
    return (
      <div className="auctions">
        {isAccountAuctionsLoaded &&
          userAuctions?.map((auction, index) => (
            <AuctionCard className="cardContent" key={index}>
              <AuctionCardImage
                url="https://i1.wp.com/www.shoorayner.com/wp-images/uploads/2017/02/scooter-1.jpg?resize=227%2C220"
                className="image"
              />
              <Divider />
              <AuctionCardSummary data={auction} className="description" />
            </AuctionCard>
          ))}
        <Link to="/auctions/new">
          <IconButton>
            <AddBoxRounded />
          </IconButton>
        </Link>
        <AddAuction />
      </div>
    );
  };

  return <div className="auctions">{renderAuctions()}</div>;
};

export default AuctionsTab;
