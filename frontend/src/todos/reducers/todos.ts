import {ITodo} from '../common/types';

const initialState = {
    list: [],
    isFetching: false
};

export const todos = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SAVE_TODOS':
            return {
                ...state,
                list: [...state.list, ...action.payload]
            };

        case 'FETCH_TODOS':
            return {
                ...state,
                isFetching: true
            };

        case 'FETCH_TODOS_FULFILLED':
            return {
                ...state,
                list: [...state.list, ...action.payload],
                isFetching: false
            };

        case 'ADD_TODO':
            return {
                ...state,
                list: [action.payload, ...state.list]
            };

        case 'DELETE_TODO':
            return {
                ...state,
                list: state.list.filter((todo: ITodo) => todo.id !== action.payload)
            };

        case 'UPDATE_TODO':
            const {id, content, isEditing, isCompleted} = action.payload;
            return {
                ...state,
                list: state.list.map((todo: ITodo): ITodo =>
                    (todo.id !== id)
                        ? todo
                        : {
                            ...todo,
                            isCompleted,
                            isEditing,
                            content
                        }
                )
            };


        case 'EDIT_TODO':
            return {
                ...state,
                list: state.list.map((todo: ITodo) => {
                    if (todo.id !== action.payload) {
                        return todo;
                    }
                    return {
                        ...todo,
                        isEditing: !todo.isEditing
                    };
                })
            };

        default:
            return state;
    }
};
