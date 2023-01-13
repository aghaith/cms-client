import api from "../api";
import { HeaderOverview, UsersOverview, campaignsOverview } from "interfaces/dashboard.model";

export const getHeadersOverview = async (): Promise<HeaderOverview[]> => {
    const response = await api.get<HeaderOverview[]>('/dashboard/get/count');
    return response.data;
};

export const getUsersPerMonth = async (): Promise<UsersOverview[]> => {
    const response = await api.get<UsersOverview[]>('/user/get/per-month');
    return response.data;
};

export const getCampaignsPerMonth = async (data): Promise<campaignsOverview[]> => {
    let type = data.queryKey[1];
    let response;
    if (type) {
        response = await api.get<campaignsOverview[]>(`/campaign/get/per-month?type=${type}`);
    } else {
        response = await api.get<campaignsOverview[]>('/campaign/get/per-month');
    }
    return response.data;
};
