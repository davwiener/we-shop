import axios from "axios";
export const productService = {
  getProducts,
  createProduct,
};
function getProducts(productName: string) {
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
