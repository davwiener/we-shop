import axios from "axios";
import { ProductType } from "../redux/types/search-types";

export const createProduct = (product: ProductType) => {
  return axios.post(`/api/products/save`, {
    ...product,
  });
};
