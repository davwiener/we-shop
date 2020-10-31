import axios from "axios";
export const productService = {
  getProducts,
  createProduct,
};
function getProducts(query: object) {
  return axios.get(`/api/products/getProducts`, {
    params: {
      ...query,
    },
  });
}
function createProduct(product: any) {
  return axios.post(`/api/products/createProduct`, {
    ...product,
  });
}
