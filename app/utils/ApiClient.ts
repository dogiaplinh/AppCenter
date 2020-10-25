import {
  ActiveDeviceCounts,
  AppItem,
  ModelsResult,
  OsResult,
  User,
  VersionsResult,
} from "../models/ApiModels";
import qs from "qs";
import moment from "moment";
import { Constants } from "../assets";

class ApiClient {
  private apiToken: string;

  setToken(token: string) {
    this.apiToken = token;
  }

  get token() {
    return this.apiToken;
  }

  private async callApi<T>(url: string, queryString?: Record<string, string | number>): Promise<T> {
    const q = queryString ? "?" + qs.stringify(queryString, { skipNulls: true }) : "";
    const response = await fetch(url + q, {
      headers: {
        ["X-API-Token"]: this.apiToken,
      },
    });
    if (response.status === 200) return await response.json();
  }

  async getCurrentUser(): Promise<User> {
    return this.callApi<User>("https://api.appcenter.ms/v0.1/user");
  }

  async getApps(): Promise<AppItem[]> {
    return this.callApi<AppItem[]>("https://api.appcenter.ms/v0.1/apps");
  }

  async getVersions(
    username: string,
    appName: string,
    startDate: Date,
    endDate?: Date,
    limit?: number,
  ) {
    return this.callApi<VersionsResult>(
      `https://api.appcenter.ms/v0.1/apps/${username}/${appName}/analytics/versions`,
      {
        start: moment(startDate).format("YYYY-MM-DD"),
        end: endDate && moment(endDate).format("YYYY-MM-DD"),
        $top: limit || Constants.DEFAULT_MAX_RESULTS,
      },
    );
  }

  async getActiveDeviceCounts(
    username: string,
    appName: string,
    startDate: Date,
    endDate?: Date,
    limit?: number,
  ) {
    return this.callApi<ActiveDeviceCounts>(
      `https://api.appcenter.ms/v0.1/apps/${username}/${appName}/analytics/active_device_counts`,
      {
        start: moment(startDate).format("YYYY-MM-DD"),
        end: endDate && moment(endDate).format("YYYY-MM-DD"),
        $top: limit || Constants.DEFAULT_MAX_RESULTS,
      },
    );
  }

  async getModels(
    username: string,
    appName: string,
    startDate: Date,
    endDate?: Date,
    limit?: number,
  ) {
    return this.callApi<ModelsResult>(
      `https://api.appcenter.ms/v0.1/apps/${username}/${appName}/analytics/models`,
      {
        start: moment(startDate).format("YYYY-MM-DD"),
        end: endDate && moment(endDate).format("YYYY-MM-DD"),
        $top: limit || Constants.DEFAULT_MAX_RESULTS,
      },
    );
  }

  async getOSes(
    username: string,
    appName: string,
    startDate: Date,
    endDate?: Date,
    limit?: number,
  ) {
    return this.callApi<OsResult>(
      `https://api.appcenter.ms/v0.1/apps/${username}/${appName}/analytics/oses`,
      {
        start: moment(startDate).format("YYYY-MM-DD"),
        end: endDate && moment(endDate).format("YYYY-MM-DD"),
        $top: limit || Constants.DEFAULT_MAX_RESULTS,
      },
    );
  }
}

const apiClient = new ApiClient();
export default apiClient;
