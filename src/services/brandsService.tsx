import axios from "axios";

export const fetchBrands = () => {
  return axios.get(`/api/brands/`);
};

export const fetchBrandModels = (brand: any) => {
  return axios.get(`/api/brands/models`, {
    params: {
      brand: brand.id,
    },
  });
};
