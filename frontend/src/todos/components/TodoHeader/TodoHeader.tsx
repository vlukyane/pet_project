import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {allActions} from "../../actions";
import {CookieService} from "../../../auth/service/CookieService";

interface IProps {
}

const TodoHeader: React.FC<IProps> = () => {
    const todosCount = useSelector((state: any) => state.todos.list.length);
    return (
        <>
            <p>
                Todos count: {todosCount}
            </p>
        </>
    )
};

export default TodoHeader;
