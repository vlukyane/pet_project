const updateScroll = (newScroll: number) => {
    return {
        type: scrollActionsNames.UPDATE_SCROLL,
        payload: newScroll
    }
};

const scrollActionsNames = {
    UPDATE_SCROLL: 'UPDATE_SCROLL'
};

export const scroll = {
    updateScroll
};
