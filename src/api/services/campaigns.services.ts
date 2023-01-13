import api from "../api";
import { Campaign, NewCampaign } from "interfaces/campaign.model";
import { AxiosResponse } from "axios";

export const getCampaignsList = async (): Promise<Campaign[]> => {
    const response = await api.get<Campaign[]>('/campaign');
    return response.data;
};

export const deleteCampaign = async (data: any) : Promise<AxiosResponse> => {
    let ids : any = {
        selectedIds: data
    }
    const response = await api.delete('/campaign', { data: ids });
    return response.data;
}

export const getCampaignById = async (id: any): Promise<Campaign> => {
    let queryId = id.queryKey[0];
    const response = await api.get<Campaign>(`campaign/${queryId}`);
    return response.data;
};

export const addNewCampaign = async (data: NewCampaign): Promise<AxiosResponse> => {
    const response = await api.post<AxiosResponse>(`/campaign`, data);
    return response.data;
};
