import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {ITodo} from '../../common/types';
import {Typography} from '@material-ui/core';
import {sendRequest} from "../../../utils/utils";

const TodoInfo: React.FC = (props: any) => {

    const [todo, setTodo] = useState<ITodo>();
    const todoId: string = props.match.params.todoId;
    useEffect(() => {
       (async () => {
           const rawTodo = await sendRequest(`todos/info/${todoId}`,
               'GET',
               {
                   'Content-Type': 'application/json',
               },
           );
           const todoInfo = await rawTodo.json();
           setTodo(todoInfo.data);
       })();
    }, [todoId]);

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
