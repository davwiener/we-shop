export type AccountState = {
  id: number;
  name: string;
  isDataLoaded: boolean;
};
export type AccountProps = {
  id: number;
  name: string;
  fetchAccountData: Function;
};
