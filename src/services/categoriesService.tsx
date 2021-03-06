import axios from "axios";
import { addInterceptors } from "../util/auth";
addInterceptors(axios);
export const fetchSubCategories = (page: number, searchWord: string, rbp: number, categoryId: number) => {
  return axios.get(`/api/sub_categories/`, {
    params: {
      categoryId,
      page,
      rbp,
      searchWord
    },
  });
};

export const fetchCategories = (page: number, searchWord: string, rbp: number) => {
  return axios.get("/api/categories/", {
    params: {
      page,
      searchWord,
      rbp
    }
  });
};

export const fetchFullSubCategoreis = (id: number) => {
  return axios.get("/api/sub_categories/full-sub-category", {
    params: {
      id
    }
  });
};