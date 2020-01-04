import React, {useEffect, useState} from 'react';
import {Link, Route} from 'react-router-dom';
import {ITodo} from '../../common/types';
import {Typography} from '@material-ui/core';

const TodoInfo: React.FC = (props: any) => {

    const [todo, setTodo] = useState<ITodo>();
    const todoId: string = props.match.params.todoId;
    useEffect(() => {
       const fetchTodo = async () => {
           const rawTodo = await fetch(`http://localhost:3001/todos/info/${todoId}`);
           const todoInfo = await rawTodo.json();
           setTodo(todoInfo.data);
       };
       fetchTodo();
    }, []);

    return(
        <>
            {todo ? (
                <>
                <Typography>
                    This is Todo number: {todo.id}
                    <br/>
                    Content: {todo.content}
                    <br/>
                    Is completed: {todo.isCompleted? ('Yes'): ('No')}
                </Typography>

                </>
            ): (
                <Typography>Can`t find todo by id.</Typography>
            )}
            <Link to={'/'}>Back to list</Link>
        </>
    )
};

export default TodoInfo;
