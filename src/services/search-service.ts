import axios from "axios";
export const searchService = {
  search,
};
function search(filters: { [key: string]: string }) {
  return axios.post(`/api/search`, filters);
}
