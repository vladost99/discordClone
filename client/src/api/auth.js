import axios from "axios";
import api, { BASE_URL } from "./index";

class AuthAPI {
  name = "/api/auth";

  async login(data) {
    return api.post(`${this.name}/login`, data);
  }
  async register(data) {
    return api.post(`${this.name}/register`, data);
  }
  async logout() {
    return api.post(`${this.name}/logout`, { withCredentials: true });
  }
  async refresh() {
    return axios.get(`${BASE_URL}${this.name}/refresh`, {
      withCredentials: true,
    });
  }
}

export default new AuthAPI();
