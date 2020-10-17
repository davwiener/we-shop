import axios from "axios";
export const productService = {
  getProducts,
  createProduct,
};
function getProducts(productName: string) {
  return axios.get(`api/products/getProducts`, {
    params: {
      productName,
    },
  });
}
function createProduct(product: any) {
  return axios.post(`api/products/createProduct`, {
    ...product,
  });
}
