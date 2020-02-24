const initialState = {
    scrollStatus: 0
};
export const scroll = (state = initialState, action: any) => {
  switch (action.type) {
      case 'UPDATE_SCROLL':
          return {
              ...state,
              scrollStatus: action.payload
          };
      default :
          return state;
  }
};
