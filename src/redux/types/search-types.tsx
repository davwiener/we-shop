import { FilterValue } from "../../filters/filter.config";

export type QueryType = {
  [key: string]: FilterValue;
  page: number;
  sortBy: string;
};

export interface filterType {
  value: any;
  type: string;
  action: CallableFunction;
  text: string;
}

export interface AuctionsState {
  filters: QueryType;
  query: QueryType;
  auctions: any[];
  loaded: boolean;
  hasMore: boolean;
}

export type AuctionType = any;


export interface PriceLevel {
  price: number,
  subscribers: number,
  wantedQuantity: number
}



export type ProductType = {
  name: string;
  description: string;
  brandId: number;
  modelId: number;
};

