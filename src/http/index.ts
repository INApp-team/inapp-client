import axios from "axios";
import { IAuthResponse } from "../typization/interfaces";
import { API_URL } from "./urls";

const $api = axios.create({
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalReq = error.config;
        if (error.response.status === 401 && originalReq && !originalReq._isRetry) {
            originalReq._isRetry = true;
            try {
                const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {});
                localStorage.setItem("token", response.data.accessToken);
                return $api.request(originalReq);
            } catch (e) {
                console.log(e, "Auth error");
            }
        }
        throw error;
    }
);

export default $api;