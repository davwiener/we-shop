import axios from "axios";
import { addInterceptors } from "../util/auth";
export const auctionService = {
  createAuction,
  getAuctions,
  searchAuction,
};
addInterceptors(axios);

function createAuction(auction: any) {
  return axios.post("/api/auctions/create", {
    ...auction,
  });
}
function getAuctions() {
  return axios.get(`/api/auctions/getAllAuctions`);
}

function searchAuction(filters: { [key: string]: string }) {
  return axios.get(`/api/auctions/search`, {
    params: {
      q: filters.kind ? filters.kind : "",
      page: filters.page,
    },
  });
}
