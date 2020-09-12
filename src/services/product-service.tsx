import axios from "axios";
export const productService = {
  getProducts,
  createProduct,
};
function getProducts(productName: string) {
  let cancel;
  // return axios({
  //   method: "GET",
  //   url: "/api/auctions/search",
  //   params: { q: filters.kind ? filters.kind : "", page: filters.page },
  //   cancelToken: new axios.CancelToken((c) => (cancel = c)),
  // });:
  // return axios.get(`/api/auctions/search`, {
  //   params: {
  //     filters: { q: filters.kind ? filters.kind : "", page: filters.page },
  //   },
  // });
  return axios.get(`/products/getProducts`, {
    params: {
      productName,
    },
  });
}
function createProduct(product: any) {
  return axios.post(`/products/createProduct`, {
    ...product,
  });
}
