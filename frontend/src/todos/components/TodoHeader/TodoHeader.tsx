import React from 'react';
import {useSelector} from 'react-redux';

interface IProps {
}

const TodoHeader: React.FC<IProps> = () => {
    const todosCount = useSelector((state: any) => state.todos.list.length);
    return (
        <p>
            Todos count: {todosCount}
        </p>
    )
};

export default TodoHeader;
