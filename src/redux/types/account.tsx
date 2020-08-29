export type AccountState = {
  id: number;
  name: string;
  dataLoaded: boolean;
};
export type AccountProps = {
  id: number;
  name: string;
  fetchAccountData: Function;
};
