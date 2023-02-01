import axios from "axios";
import LocalStorageSerive from 'Services/localStorage';
import authAPI from 'api/auth';
import { store } from "redux/store";
import { setUser, removeUser } from "redux/user/slice";

export const BASE_URL = 'http://localhost:8080';

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    withCredentials: true
});

apiClient.interceptors.request.use(config => {
    const token = LocalStorageSerive.getToken();
    
    if(token) {
        config.headers.authorization = `Bearer ${token}`;
    }

    return config
});

apiClient.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response =  await authAPI.refresh();
            store.dispatch(setUser({...response.data}));
            return apiClient.request(originalRequest);
        } catch (e) {
            store.dispatch(removeUser());
        }
    }
    throw error;
})

export default apiClient