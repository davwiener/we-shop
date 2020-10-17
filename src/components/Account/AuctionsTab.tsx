import React from "react";
import { useEffect, useState } from "react";
import { fetchUserAuctions } from "../../redux/actions/auctions-actions";
import { Card, CardContent } from "@material-ui/core";
import "./AuctionsTab.scss";

export interface userAuctionsStruct {
  name: string;
  id: number;
  productId: number;
}

const AuctionsTab = () => {
  const [userAuctions, setUserAuctions] = useState<
    userAuctionsStruct[] | undefined
  >();
  useEffect(() => {
    fetchUserAuctions().then((result: any) => {
      setUserAuctions(result.data);
    });
  }, []);

  const renderAuctions = () => {
    return userAuctions?.map((auction) => (
      <Card key={auction.id} className="auction" variant="outlined">
        <CardContent>
          <div>auction name: {auction.name}</div>
          <div>auction id: {auction.id}</div>
          <div>product id: {auction.productId}</div>
        </CardContent>
      </Card>
    ));
  };

  return <div className="auctions">{renderAuctions()}</div>;
};

export default AuctionsTab;
