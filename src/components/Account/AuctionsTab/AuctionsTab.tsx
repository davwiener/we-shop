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
import { Divider } from "@material-ui/core";
import AddAuction from "../../AddAuction/AddAuction";

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
      isAccountAuctionsLoaded && (
        <div className="auctions">
          {userAuctions?.map((auction, index) => (
            <AuctionCard className="cardContent" key={index}>
              <AuctionCardImage
                url="https://i1.wp.com/www.shoorayner.com/wp-images/uploads/2017/02/scooter-1.jpg?resize=227%2C220"
                className="image"
              />
              <Divider />
              <AuctionCardSummary data={auction} className="description" />
            </AuctionCard>
          ))}
          <AddAuction />
        </div>
      )
    );
  };

  return <div className="auctions">{renderAuctions()}</div>;
};

export default AuctionsTab;
