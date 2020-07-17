import { Component } from "react";

export interface userState {
  user: { userName: string };
  popUp: Component | null;
}

export const INITIALE_USER_STATE: userState = {
  user: { userName: "" },
  popUp: null,
};
