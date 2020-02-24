import React from 'react';
import {Button} from '@material-ui/core';
import { Delete } from '@material-ui/icons'

interface IProps {
    deleteTodo: () => void;
}

const TodoDelete: React.FC<IProps> = ({ deleteTodo }) => {
    return (
        <div className="todo-button-delete">
            <Button onClick={()=> deleteTodo()}><Delete/></Button>
        </div>
    )
};

export default TodoDelete;
