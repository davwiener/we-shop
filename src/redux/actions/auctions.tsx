import axios from "axios";
import { addInterceptors } from "../../util/auth";

addInterceptors(axios);

export const fetchUserAuctions = () => {
  return axios.get("/auctions/my_auctions");
};
