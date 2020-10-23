import { User } from "../models/apiModels";

class ApiClient {
  private apiToken: string;

  setToken(token: string) {
    this.apiToken = token;
  }

  async getUser(): Promise<User> {
    const response = await fetch("https://api.appcenter.ms/v0.1/user", {
      headers: {
        ["X-API-Token"]: this.apiToken,
      },
    });
    if (response.status === 200) return await response.json();
  }
}

const apiClient = new ApiClient();
export default apiClient;
