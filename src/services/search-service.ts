import axios from "axios";
export const searchService = {
  search,
};
function search(filters: { [key: string]: string }) {
  let cancel;
  return axios({
    method: "GET",
    url: "http://openlibrary.org/search.json",
    params: { q: filters.kind ? filters.kind : "", page: filters.page },
    cancelToken: new axios.CancelToken((c) => (cancel = c)),
  });
  // return axios.post(`/api/search`, filters);
}
