import { addInterceptors } from "../util/auth";
import axios from "axios";

addInterceptors(axios);

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
