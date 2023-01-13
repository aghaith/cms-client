import axios, { AxiosResponse } from 'axios'
import { userCredentials, UserInfo, RegisterUser } from "interfaces/auth.model";

const apiURL = process.env.REACT_APP_API_URL

const api = axios.create({
    baseURL: apiURL,
    headers: {
        Pragma: "no-cache",
        "Cache-control": "no-cache"
    },
    // If server won't respond in 5 seconds, it goes into catch block
    timeout: 1000 * 5, // Wait for 5 seconds,
})

export const userLogin = async (data: userCredentials): Promise<UserInfo> => {
    const response = await api.post<UserInfo>(`/auth/signin`, data);
    return response.data;
};

export const userSignUp = async (data: RegisterUser): Promise<AxiosResponse> => {
    const response = await api.post<AxiosResponse>(`/auth/signup`, data);
    return response.data;
};
