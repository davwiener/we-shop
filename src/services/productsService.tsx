import axios from "axios";
import { ProductType } from "../redux/types/search-types";
import { addInterceptors } from "../util/auth";
addInterceptors(axios);

export const createProduct = (product: ProductType) => {
  return axios.post(`/api/products/save`, {
    ...product,
  });
};

export const fetchProductsByCategory = (categoryId: string) => {
  return axios.get("/api/products/getProducts", {
    params: {
      category: categoryId,
    },
  });
};

export const fetchProductsBySubCategory = (subCategoryId: string) => {
  return axios.get("/api/products/getProducts", {
    params: {
      category: subCategoryId,
    },
  });
};
