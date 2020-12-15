import axios from "axios";
import { addInterceptors } from "../util/auth";
addInterceptors(axios);
export const fetchSubCategories = (page: number, searchWord: string, rbp: number, categoryId: number) => {
  return axios.get(`/api/categories/sub_categories`, {
    params: {
      categoryId,
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
