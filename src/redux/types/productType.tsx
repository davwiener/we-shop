import {Item} from "../../components/AddAuction/AddAuction";

export type ProductType = {
  name: string;
  category: Item;
  subCategory: Item;
  brand?: Item;
  model?: Item;
  productName: string;
  description: string;
};
