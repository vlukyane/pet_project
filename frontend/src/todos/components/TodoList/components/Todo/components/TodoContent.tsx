import React, {useState} from 'react';
import {Button, ListItemText, TextField} from '@material-ui/core';
import TodoEdit from './TodoEdit';
import {Done} from '@material-ui/icons';

interface IProps {
    content: string,
    isCompleted: boolean,
    isEditing: boolean,
    editTodo: () => void,
    updateTodo: (content: string) => void
}

const TodoContent: React.FC<IProps> = ({ content, isCompleted, isEditing, editTodo, updateTodo }) => {
    const [term, setTerm] = useState<string>(content || '');

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        if (event.target.value === null) return;
        setTerm(event.target.value);
    };
    const onFormSubmit = (event: React.FormEvent<HTMLFormElement  | HTMLButtonElement>): void => {
        event.preventDefault();
        updateTodo(term);
    };

    const handleEdit = () => {
        if (!isCompleted) editTodo()
    };

    return (!isEditing
        ?
        <>
            <div className={`todo-content ${isCompleted ? 'completed' : ''}`} onClick={() => handleEdit() }>
                {content}
            </div>

            <TodoEdit
                editTodo = {editTodo}
                enableButton = {!isCompleted}
            />
        </>

        :
        <>
            <form onSubmit={(e) => onFormSubmit(e)}>
                <TextField
                    value={term}
                    type="text"
                   onChange={e => onInputChange(e)}
                />
                <Button onClick={ (e) => onFormSubmit(e)}> <Done/> </Button>
            </form>
        </>
    )
};

export default TodoContent;
