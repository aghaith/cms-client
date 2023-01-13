import axios, { AxiosRequestConfig } from "axios";
import { getUserToken } from "helpers/global";

const apiURL = process.env.REACT_APP_API_URL

const api = axios.create({
    baseURL: apiURL,
    headers: {
        Pragma: "no-cache",
        "Cache-control": "no-cache"
    },
    timeout: 10000,
})

api.interceptors.request.use(function (config: AxiosRequestConfig) {
    const token = getUserToken() ? getUserToken().token : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
