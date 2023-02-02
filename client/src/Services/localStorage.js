import Cookies from "js-cookie";

class LocalStorageSerive {
  user = "user";
  token = "token";
  refresh_token = "refreshToken";

  getUser() {
    let data = Cookies.get(this.user);
    return data ? { userDetails: JSON.parse(data), status: "success" } : null;
  }
  setUser(data) {
    Cookies.set(this.user, JSON.stringify(data), { expires: 3600000 * 24 * 1 });
  }

  setToken(token) {
    Cookies.set(this.token, token, { expires: 3600000 * 24 * 1 });
  }
  setRefreshToken(token) {
    Cookies.set(this.refresh_token, token, {
      expires: 3600000 * 24 * 4,
    });
  }
  getRefreshToken() {
    let data = Cookies.get(this.refresh_token);
    return data ? data : null;
  }
  getToken() {
    let data = Cookies.get(this.token);
    return data ? data : null;
  }
  removeToken() {
    Cookies.remove(this.token);
    Cookies.remove(this.refresh_token);
    Cookies.remove(this.user);
  }
}

export default new LocalStorageSerive();
