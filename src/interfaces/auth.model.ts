import { User } from "./user.model";

export class userCredentials {
    email?: string;
    password?: User;
}

export class UserInfo {
    token?: string;
    user?: User;
}

export interface RegisterUser {
    fullname?: string,
    email?: string;
    gender: string;
    country?: string;
    company?: string;
    password?: string;
    confirmPassword?: string;
}