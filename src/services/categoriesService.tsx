import axios from "axios";
import { addInterceptors } from "../util/auth";
addInterceptors(axios);
export const fetchSubcategoriesByCategory = (categoryId: number) => {
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
