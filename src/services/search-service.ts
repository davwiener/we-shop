import axios from "axios";
import { resolve } from "path";
export const searchService = {
  search,
};
function search(filters: { [key: string]: string }) {
  let cancel;
  // return axios({
  //   method: "GET",
  //   url: "/api/auctions/search",
  //   params: { q: filters.kind ? filters.kind : "", page: filters.page },
  //   cancelToken: new axios.CancelToken((c) => (cancel = c)),
  // });
  // return axios.get(`/api/auctions/search`, {
  //   params: {
  //     filters: { q: filters.kind ? filters.kind : "", page: filters.page },
  //   },
  // });
  return axios.post(`/api/auctions/search`, {
    q: filters.kind ? filters.kind : "",
    page: filters.page,
  });
}
