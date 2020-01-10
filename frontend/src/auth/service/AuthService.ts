import {sendRequest} from "../../utils/utils";

export class AuthService {
    static async getLogIn(userEmail: string, userPassword: string) {
        const userCreditials = {
            userEmail,
            userPassword
        };
        const response = await sendRequest('signUp',
            'POST',
            {
                'Content-Type': 'application/json',
            },
            JSON.stringify(userCreditials)
        );
        return await response.json();
    }

    static async saveToken(token: string) {

    }
}
