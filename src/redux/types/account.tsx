export type AccountState = {
  isLoggedIn: boolean;
  id: number;
  name: string;
  isDataLoaded: boolean;
};
export type AccountProps = {
  isLoggedIn: boolean;
  id: number;
  name: string;
  fetchAccountData: Function;
};
