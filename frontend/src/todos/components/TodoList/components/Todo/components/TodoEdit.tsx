import React from 'react';
import {Button} from '@material-ui/core';
import {Edit} from '@material-ui/icons';

interface IProps {
    editTodo: () => void,
    enableButton: boolean
}

const TodoEdit: React.FC<IProps> = ({ editTodo, enableButton}) => {
    return (
        <div className="todo-button-edit">
            {enableButton ? (
                <Button onClick={() => editTodo()}>
                    <Edit/>
                </Button>
            ) : (
                <Button>
                    <Edit color={'disabled'}/>
                </Button>
            )}
        </div>
    )
};

export default TodoEdit;
