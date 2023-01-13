import api from "../api";
import { User } from "interfaces/user.model";

export const getUserProfileById = async (id: any): Promise<User> => {
    let queryId = id.queryKey[0];
    const response = await api.get<User>(`user/${queryId}`);
    return response.data;
};

export const userLogout = async () => {
    return await api.get('/auth/signout');
};