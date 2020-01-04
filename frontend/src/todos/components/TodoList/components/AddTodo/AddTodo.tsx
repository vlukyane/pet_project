import React, { useState } from 'react';
import {TextField, Tooltip, Fab} from '@material-ui/core';
import {Add} from '@material-ui/icons';

interface IProps {
    id?: string,
    content?: string,
    addTodo: (term: string) => void,
}

export const AddTodo: React.FC<IProps> = ({ content, addTodo }) =>{
    const [term, setTerm] = useState<string>(content || '');

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        if (event.target.value === null) return;
        setTerm(event.target.value);
    };

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        addTodo(term);
        setTerm('');
    };

    return (
        <form className="add-todo" onSubmit={(e) => onFormSubmit(e)}>
            <TextField className="add-todo-input" value={term} type="text"
                   onChange={e => onInputChange(e)}/>
            <Tooltip title="Add" aria-label="add">
                <Fab type="submit" color="primary" >
                    <Add />
                </Fab>
            </Tooltip>
        </form>
    )
};


