import { addInterceptors } from "../util/auth";
import axios from "axios";

addInterceptors(axios);

export const fetchCategories = () => {
  return axios.get("/api/categories/");
};
