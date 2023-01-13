import { format, parseISO } from 'date-fns';
import { UserInfo } from 'interfaces/auth.model';
import * as constants from 'constants/constants';

/* LocalStorage Functions */

export const setLocalStorageItems = (data: UserInfo) => {
    let token = data.token;
    let user = data.user;
    localStorage.setItem(constants.KEY_ACCESS_TOKEN, JSON.stringify({ token }))
    localStorage.setItem(constants.KEY_USER_INFO, JSON.stringify({ user }));
}

export function getUserInfo() {
    return JSON.parse(localStorage.getItem(constants.KEY_USER_INFO) || '')
}

export function getUserToken() {
    try {
        return JSON.parse(localStorage.getItem(constants.KEY_ACCESS_TOKEN))
    } catch (error) {
        return null;
    }
}

export const clearLocalStorageItems = () => {
    localStorage.removeItem(constants.KEY_ACCESS_TOKEN);
    localStorage.removeItem(constants.KEY_USER_INFO)
}

/* date-fns functions */

export const dateFormmaterNoTime = (date: string) => {
    if (date !== undefined && date !== null && date !== '')
        return format(parseISO(date), "dd.MM.yyyy");
    else
        return null;
}