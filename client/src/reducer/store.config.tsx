import { Component } from "react";

export interface WeShoopState {
  userReducer: { userName: string };
  popUpReducer: PopUpState;
  filtersReducer: any;
}
export interface PopUpState {
  popUp: Component | null;
}

export interface filtersState {
  price: { min: number; max: number };
  date: { endDate: Date; startDate: Date };
  productName: string;
  productKind: string;
}
