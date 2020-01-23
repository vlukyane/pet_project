import React from 'react';
import TodoContent from "./components/TodoContent";
import TodoDelete from "./components/TodoDelete";
import { ITodo } from "../../../../common/types";
import {Button, Checkbox, ListItem} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {Info} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import LastUpdated from "./components/LastUpdated";

interface IProps {
    todo: ITodo,
    switchTodo: (id: string) => void,
    deleteTodo: (id: string) => void,
    editTodo: (id: string) => void,
    updateTodo: (id: string, content: string) => Promise<void>
    updateScroll: () => any
}

const useStyles = makeStyles({
    completed: {
        textDecoration: 'line-through'
    },
    todoItem: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        minWidth: '240px',
        '& .todo-content': {
            maxWidth: '160px',
            width: '60%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }
    },
});


export const Todo: React.FC<IProps>  = ({ todo, switchTodo, deleteTodo, editTodo, updateTodo, updateScroll }) =>{

    const classes = useStyles();

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
        <ListItem className = {classes.todoItem}>
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
            <LastUpdated email={todo.ctx? todo.ctx : ''}/>
        </ListItem>
    )
};

