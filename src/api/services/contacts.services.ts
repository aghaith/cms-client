import api from "../api";
import { Contact } from "interfaces/contact.model";

export const getContactsList = async (): Promise<Contact[]> => {
    const response = await api.get<Contact[]>('/contact');
    return response.data;
};