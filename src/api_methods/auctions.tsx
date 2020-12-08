import { addInterceptors } from "../util/auth";
import axios from "axios";

addInterceptors(axios);

export const saveAuction = (auctionData: any) => {
  console.log("bla", auctionData);
  return axios.post("/api/auctions/create", {
    ...auctionData,
  });
};
