/* eslint-disable @typescript-eslint/camelcase */
import { AppItem } from "../../models/ApiModels";

class ApiClient {
  private key?: string = undefined;
  setToken = (key: string) => (this.key = key);
  getCurrentUser = () => Promise.resolve(this.key === "token" ? {} : undefined);
  getApps = (): Promise<Partial<AppItem>[]> => Promise.resolve([{}]);
}
const apiClient = new ApiClient();
export default apiClient;
