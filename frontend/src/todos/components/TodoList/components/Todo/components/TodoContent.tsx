import React, {useState} from 'react';
import {Button, ClickAwayListener, makeStyles, TextField} from '@material-ui/core';
import TodoEdit from './TodoEdit';
import {Done} from '@material-ui/icons';

interface IProps {
    content: string,
    isCompleted: boolean,
    isEditing: boolean,
    editTodo: () => void,
    updateTodo: (content: string) => void
}

const useStyles = makeStyles({
    completed: {
        textDecoration: 'line-through'
    },
});

const TodoContent: React.FC<IProps> = ({ content, isCompleted, isEditing, editTodo, updateTodo }) => {
    const [term, setTerm] = useState<string>(content || '');

    const classes = useStyles();

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        if (event.target.value === null) return;
        setTerm(event.target.value);
    };
    const onFormSubmit = (event: React.FormEvent<HTMLFormElement  | HTMLButtonElement> | React.MouseEvent<Document, MouseEvent>): void => {
        event.preventDefault();
        updateTodo(term);
    };

    const handleEdit = () => {
        if (!isCompleted) editTodo()
    };

    return (!isEditing
        ?
        <>
            <div className={`todo-content ${isCompleted ? classes.completed : ''}`} onClick={() => handleEdit() }>
                {content}
            </div>
        </>

        :
        <>
            <ClickAwayListener onClickAway={ (e) => onFormSubmit(e)}>
            <form onSubmit={(e) => onFormSubmit(e)}>
                <TextField
                    value={term}
                    type="text"
                   onChange={e => onInputChange(e)}
                />
            </form>
            </ClickAwayListener>
        </>
    )
};

export default TodoContent;
