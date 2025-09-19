import type { IUser } from "./user";

interface IMarketplaceState {
  account: IUser | null;
  items: any[];
  status: { loading: boolean; error: boolean };
}
