import axios from "axios";
export const searchService = {
  search,
};
function search(filters: { [key: string]: string }) {
  return axios.get(`api/auctions/search`, {
    params: {
      ...filters,
    },
  });
}
