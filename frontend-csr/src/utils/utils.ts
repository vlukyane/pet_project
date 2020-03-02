import {CookieService} from "../auth/service/CookieService";

declare const window: any;
const serverUrl = `${window.TODOS_BACKEND_SERVICE_ADDRESS}api/`;

const checkCookie = async () => {
    const cookieRaw = await CookieService.get('sign_in');
    if (cookieRaw === '') return '';
    const cookieData = await JSON.parse(cookieRaw);
    if (cookieData === '') return '';
    return {
        'Authorization': 'Bearer ' + cookieData.token
    }

};

export const sendRequest = async(url: string, method: string, headers?: any, body?: any) => {
    const authHeader = await checkCookie();
    if (authHeader) {
        headers = {
            ...authHeader,
            ...headers
        }
    }

    return await fetch(`${serverUrl}${url}`, {
        method,
        headers,
        body
    });
};
