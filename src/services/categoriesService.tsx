import axios from "axios";

export const fetchSubcategoriesByCategory = (category: string) => {
  return axios.get(`/api/categories/sub_categories`, {
    params: {
      category,
    },
  });
};
