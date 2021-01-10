import axios from "axios";

// export const fetchBrands = () => {
//   return axios.get(`/api/brands/`);
// };

export const fetchBrandModels = (brand: any) => {
  return axios.get(`/api/brands/models`, {
    params: {
      brand: brand.id,
    },
  });
};

export const fetchBrands = (page: number, searchWord: string, rbp: number, categoryId: number, subCategoryId: number) => {
  return axios.get("/api/brands/", {
    params: {
      categoryId,
      subCategoryId,
      page,
      rbp,
      searchWord
    },
  });
};

export const fetchFullBrand = (id: number) => {
  return axios.get("/api/brands/full-brand", {
    params: {
      id
    }
  }).then(res => {
    return {
      data:
        { category: res.data.categories[0], subCategory: res.data.subCategories[0] }
    }
  });
};