import axios from "axios";
export const searchService = {
  search,
};
function search(filters: { [key: string]: string }) {
  return axios.get(`/auctions/search`, {
    params: {
      ...filters,
    },
  });
}
