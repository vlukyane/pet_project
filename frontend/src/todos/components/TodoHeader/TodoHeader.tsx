import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {allActions} from "../../actions";

interface IProps {
}

const TodoHeader: React.FC<IProps> = () => {
    const todosCount = useSelector((state: any) => state.todos.list.length);
    const dispatcher = useDispatch();


    const logOutEvent = () => {
        dispatcher(allActions.user.logOut());
    };

    return (
        <>
            <p>
                Todos count: {todosCount}
            </p>
            <button onClick={(e) => logOutEvent() }> log out </button>
        </>
    )
};

export default TodoHeader;
