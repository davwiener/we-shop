export type AccountState = {
  isLoggedIn: boolean;
  id: number;
  name: string;
  isDataLoaded: boolean;
  isAccountAuctionsLoaded: boolean;
};
export type AccountProps = {
  isLoggedIn: boolean;
  id: number;
  name: string;
  fetchAccountData: Function;
};
