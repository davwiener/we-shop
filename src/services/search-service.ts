import axios from "axios";
export const searchService = {
  search,
};
function search(filters: { [key: string]: string }) {
  return axios.post(`/auctions/search`, {
    q: filters.kind ? filters.kind : "",
    page: filters.page,
  });
}
