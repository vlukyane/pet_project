const logIn = (email: string, token: string) => {
    return {
        type: userActionsNames.LOG_IN,
        payload: {email, token}
    }
};

const logOut = () => {
    return {
        type: userActionsNames.LOG_OUT
    }
};

export const userActionsNames = {
    LOG_IN: 'LOG_IN',
    LOG_OUT: 'LOG_OUT'
};

export const user = {
  logIn,
  logOut
};
