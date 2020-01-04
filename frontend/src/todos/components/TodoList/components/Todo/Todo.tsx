import React, { Suspense } from 'react';
import TodoContent from "./components/TodoContent";
import TodoDelete from "./components/TodoDelete";
import { ITodo } from "../../../../common/types";
import {Button, Checkbox, ListItem} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {Info} from '@material-ui/icons';

interface IProps {
    todo: ITodo,
    switchTodo: (id: string) => void,
    deleteTodo: (id: string) => void,
    editTodo: (id: string) => void,
    updateTodo: (id: string, content: string) => Promise<void>
    updateScroll: () => any
}

export const Todo: React.FC<IProps>  = ({ todo, switchTodo, deleteTodo, editTodo, updateTodo, updateScroll }) =>{
    const handleEditTodo = () => {
        editTodo(todo.id)
    };

    const handleDeleteTodo = () => {
        deleteTodo(todo.id);
    };

    const handleSwitchIsCompleted = () => {
        switchTodo(todo.id)
    };

    const handleUpdateTodo = (content: string) => {
        updateTodo(todo.id, content);
    };

    return (
        <ListItem className = {`todo-item`}>
            <Checkbox
                checked={todo.isCompleted}
                onChange={handleSwitchIsCompleted}
                color="primary"
                inputProps={{
                    'aria-label': 'secondary checkbox',
                }}
            />
            <TodoContent
                content={todo.content}
                isCompleted={todo.isCompleted}
                isEditing={todo.isEditing}
                editTodo={handleEditTodo}
                updateTodo={handleUpdateTodo}
            />
            <Link to={`/todo/${todo.id}`}>
                <Button onClick={() => updateScroll()}>
                    <Info/>
                </Button>
            </Link>
            <TodoDelete
                deleteTodo = {handleDeleteTodo}
            />
        </ListItem>
    )
};

