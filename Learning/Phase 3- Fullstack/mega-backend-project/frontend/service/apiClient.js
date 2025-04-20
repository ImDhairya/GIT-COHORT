class ApiClient {
  constructor() {
    this.baseURL = "http://127.0.0.1:3000/api/v1";
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }
  async customFetch(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const headers = { ...this.defaultHeaders, ...options.headers };
      const config = {
        ...options,
        headers,
        credentials: "include",
      };

      const response = await fetch(url, config);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error, "Api Error");
      throw error;
    }
  }

  async signup(name, email, password) {
    return this.customFetch("/user/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  }

  async login(email, password) {
    return this.customFetch("/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async getProfile() {
    return this.customFetch("/user/me");
  }
}

const apiClient = new ApiClient();

export default apiClient;
