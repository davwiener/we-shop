import { addInterceptors } from "../util/auth";
import axios from "axios";

addInterceptors(axios);

export const fetchCategoryProducts = (categoryId: number) => {
  return axios.get("/api/products/getProducts", {
    params: {
      category: categoryId,
    },
  });
};
