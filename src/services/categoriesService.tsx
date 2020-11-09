import axios from "axios";

export const fetchCategoryProducts = (category: string) => {
  return axios.get(`/api/categories/products`, {
    params: {
      category,
    },
  });
};
