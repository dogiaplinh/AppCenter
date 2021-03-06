import {
  ActiveDeviceCounts,
  AppItem,
  CountsResult,
  ErrorGroupsResult,
  EventCountResult,
  EventDeviceCountResult,
  EventsResult,
  SessionDurationsDistribution,
  User,
} from "../models/ApiModels";
import qs from "qs";
import moment from "moment";
import { Constants } from "../assets";

export type CommonFilterOptions = {
  start: Date;
  end?: Date;
  limit?: number;
  offset?: number;
  version?: string;
};
class ApiClient {
  private apiToken?: string;

  setToken(token: string | undefined) {
    this.apiToken = token;
  }

  get token() {
    return this.apiToken;
  }

  private getQueryParams(
    options: CommonFilterOptions,
  ): Record<string, string | number | undefined> {
    return {
      start: moment(options.start).format(),
      end: options.end && moment(options.end).format(),
      $top: options.limit || Constants.DEFAULT_MAX_RESULTS,
      $skip: options.offset || 0,
      versions: options.version,
    };
  }

  private async callApi<T = any>(
    url: string,
    queryString?: Record<string, string | number | undefined>,
  ): Promise<T | undefined> {
    const q = queryString ? "?" + qs.stringify(queryString, { skipNulls: true }) : "";
    const response = await fetch(url + q, {
      headers: {
        ["X-API-Token"]: this.apiToken || "",
      },
    });
    if (response.status === 200) {
      return await response.json();
    }
  }

  async getCurrentUser(): Promise<User | undefined> {
    return this.callApi<User>("https://api.appcenter.ms/v0.1/user");
  }

  async getApps(): Promise<AppItem[] | undefined> {
    return this.callApi<AppItem[]>("https://api.appcenter.ms/v0.1/apps");
  }

  async getVersions(
    username: string,
    appName: string,
    options: CommonFilterOptions,
  ): Promise<CountsResult | undefined> {
    const result = await this.callApi(
      `https://api.appcenter.ms/v0.1/apps/${username}/${appName}/analytics/versions`,
      this.getQueryParams(options),
    );
    return (
      result && {
        type: "version",
        total: result.total,
        values: result.versions.map((x) => ({
          count: x.count,
          previousCount: x.previous_count,
          key: x.version,
        })),
      }
    );
  }

  async getActiveDeviceCounts(username: string, appName: string, options: CommonFilterOptions) {
    return this.callApi<ActiveDeviceCounts>(
      `https://api.appcenter.ms/v0.1/apps/${username}/${appName}/analytics/active_device_counts`,
      this.getQueryParams(options),
    );
  }

  async getModels(
    username: string,
    appName: string,
    options: CommonFilterOptions,
  ): Promise<CountsResult | undefined> {
    const result = await this.callApi(
      `https://api.appcenter.ms/v0.1/apps/${username}/${appName}/analytics/models`,
      this.getQueryParams(options),
    );
    return (
      result && {
        type: "model",
        total: result.total,
        values: result.models.map((x) => ({
          count: x.count,
          previousCount: x.previous_count,
          key: x.model_name,
        })),
      }
    );
  }

  async getOSes(
    username: string,
    appName: string,
    options: CommonFilterOptions,
  ): Promise<CountsResult | undefined> {
    const result = await this.callApi(
      `https://api.appcenter.ms/v0.1/apps/${username}/${appName}/analytics/oses`,
      this.getQueryParams(options),
    );
    return (
      result && {
        type: "os",
        total: result.total,
        values: result.oses.map((x) => ({
          count: x.count,
          previousCount: x.previous_count,
          key: x.os_name,
        })),
      }
    );
  }

  async getLanguages(
    username: string,
    appName: string,
    options: CommonFilterOptions,
  ): Promise<CountsResult | undefined> {
    const result = await this.callApi(
      `https://api.appcenter.ms/v0.1/apps/${username}/${appName}/analytics/languages`,
      this.getQueryParams(options),
    );
    return (
      result && {
        type: "language",
        total: result.total,
        values: result.languages.map((x) => ({
          count: x.count,
          previousCount: x.previous_count,
          key: x.language_name,
        })),
      }
    );
  }

  async getPlaces(
    username: string,
    appName: string,
    options: CommonFilterOptions,
  ): Promise<CountsResult | undefined> {
    const result = await this.callApi(
      `https://api.appcenter.ms/v0.1/apps/${username}/${appName}/analytics/places`,
      this.getQueryParams(options),
    );
    return (
      result && {
        type: "place",
        total: result.total,
        values: result.places.map((x) => ({
          count: x.count,
          previousCount: x.previous_count,
          key: x.code,
        })),
      }
    );
  }

  async getEventsSummary(
    username: string,
    appName: string,
    options: CommonFilterOptions,
  ): Promise<EventsResult | undefined> {
    return this.callApi<EventsResult>(
      `https://api.appcenter.ms/v0.1/apps/${username}/${appName}/analytics/events`,
      this.getQueryParams(options),
    );
  }

  async getEventDeviceCount(
    username: string,
    appName: string,
    eventName: string,
    options: CommonFilterOptions,
  ) {
    return this.callApi<EventDeviceCountResult>(
      `https://api.appcenter.ms/v0.1/apps/${username}/${appName}/analytics/events/${eventName}/device_count`,
      this.getQueryParams(options),
    );
  }

  async getEventCount(
    username: string,
    appName: string,
    eventName: string,
    options: CommonFilterOptions,
  ) {
    return this.callApi<EventCountResult>(
      `https://api.appcenter.ms/v0.1/apps/${username}/${appName}/analytics/events/${eventName}/event_count`,
      this.getQueryParams(options),
    );
  }

  async getEventProperties(
    username: string,
    appName: string,
    eventName: string,
  ): Promise<string[] | undefined> {
    const result = await this.callApi(
      `https://api.appcenter.ms/v0.1/apps/${username}/${appName}/analytics/events/${eventName}/properties`,
    );
    return result?.event_properties;
  }

  async getEventPropertyCount(
    username: string,
    appName: string,
    eventName: string,
    propertyName: string,
    options: CommonFilterOptions,
  ): Promise<CountsResult | undefined> {
    const result = await this.callApi(
      `https://api.appcenter.ms/v0.1/apps/${username}/${appName}/analytics/events/${eventName}/properties/${propertyName}/counts`,
      this.getQueryParams(options),
    );
    return (
      result && {
        type: "event_property",
        total: result.total,
        values: result.values.map((x) => ({
          count: x.count,
          previousCount: x.previous_count,
          key: x.name,
        })),
      }
    );
  }

  async getSessionDurationsDistribution(
    username: string,
    appName: string,
    options: CommonFilterOptions,
  ): Promise<SessionDurationsDistribution | undefined> {
    const result = await this.callApi(
      `https://api.appcenter.ms/v0.1/apps/${username}/${appName}/analytics/session_durations_distribution`,
      this.getQueryParams(options),
    );
    return (
      result && {
        ...result,
        distribution: result.distribution.map((x) => ({
          count: x.count,
          previousCount: x.previous_count,
          key: x.bucket,
        })),
      }
    );
  }

  async getErrorGroups(
    username: string,
    appName: string,
    options: CommonFilterOptions,
  ): Promise<ErrorGroupsResult | undefined> {
    return this.callApi<ErrorGroupsResult>(
      `https://api.appcenter.ms/v0.1/apps/${username}/${appName}/errors/errorGroups`,
      this.getQueryParams(options),
    );
  }
}

const apiClient = new ApiClient();
export default apiClient;
