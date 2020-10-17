import axios from "axios";

export const auctionService = {
  createAuction,
  getAuctions,
  searchAuction,
};
function createAuction(auction: any) {
  return axios.post(`/auctions/createAuction`, {
    ...auction,
  });
}
function getAuctions() {
  return axios.get(`/auctions/getAllAuctions`);
}
function searchAuction(filters: { [key: string]: string }) {
  let cancel;
  return axios.get(`/auctions/search`, {
    params: {
      q: filters.kind ? filters.kind : "",
      page: filters.page,
    },
  });
}
