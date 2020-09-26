import { FilterValue } from "../../filters/filter.config";

export interface filterType {
  value: any;
  type: string;
  action: CallableFunction;
  text: string;
}

export interface AuctionsState {
  filters: { [key: string]: FilterValue; page: number };
  auctions: any[];
  loaded: boolean;
  hasMore: boolean;
}

export type AuctionType = any;

export type ProductType = any;
