import axios from "axios";

export const auctionService = {
  createAuction,
  getAuctions,
  searchAuction,
};
function createAuction(auction: any) {
  return axios.post(`api/auctions/createAuction`, {
    ...auction,
  });
}
function getAuctions() {
  return axios.get(`api/auctions/getAllAuctions`);
}
function searchAuction(filters: { [key: string]: string }) {
  let cancel;
  return axios.get(`api/auctions/search`, {
    params: {
      q: filters.kind ? filters.kind : "",
      page: filters.page,
    },
  });
}
