import axios from "axios";

export const fetchModels = (page: number, searchWord: string, rbp: number, categoryId: number, subCategoryId: number, brandId: number) => {
    return axios.get("/api/models/", {
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