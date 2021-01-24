import axios from "axios";

import { addInterceptors } from "../util/auth";
import {ProductType} from "../redux/types/productType";
addInterceptors(axios);

export const createProduct = (product: ProductType) => {
  return axios.post(`/api/products/save`, {
    ...product,
  });
};

export const fetchProducts = (page: number, searchWord: string, rbp: number, categoryId: number, subCategoryId: number, brandId: number) => {
  return axios.get("/api/products/", {
    params: {
      categoryId,
      subCategoryId,
      brandId,
      page,
      rbp,
      searchWord
    },
  });
};

export const fetchFullProduct = (id: number) => {
  return axios.get("/api/products/full-product", {
    params: {
      id
    }
  })
}
