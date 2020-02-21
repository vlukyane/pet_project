import {CookieService} from "../auth/service/CookieService";

const TODOS_URL = process.env.TODOS_BACKEND_SERVICE_HOST;
const serverUrl = `${TODOS_URL}:3001/api/`;

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
    console.log('TODOS URLS ::::', TODOS_URL);
    console.log('TODOS URLS ::::', process.env);
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
