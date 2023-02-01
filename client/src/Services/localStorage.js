class LocalStorageSerive {
    user = 'user';
    token = 'token';

    getUser() {
        let data = localStorage.getItem(this.user);
        return data ? {userDetails: JSON.parse(data), status: 'success'} : null
    }
    setUser(data) {
        localStorage.setItem(this.user, JSON.stringify(data));
    }
    setToken(token) {
        localStorage.setItem(this.token, JSON.stringify(token));
    }
    getToken() {
        let data = localStorage.getItem(this.token);
        return data ? JSON.parse(data) : null
    }
    removeToken() {
        localStorage.removeItem(this.token);
    }
}

export default new LocalStorageSerive();