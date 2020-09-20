import axios from "axios";

export const fetchUserAuctions = () => {
  return axios.get("/auctions/my_auctions");
};
