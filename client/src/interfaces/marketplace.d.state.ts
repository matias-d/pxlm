import type { IUser } from "./user";
import type { IPxl } from "./pxl";

interface IMarketplaceState {
  status: { loading: boolean; error: boolean };
  account: IUser | null;
  items: IPxl[];
}
