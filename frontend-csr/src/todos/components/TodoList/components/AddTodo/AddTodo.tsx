import React, { useState } from 'react';
import {TextField, Tooltip, Fab, makeStyles} from '@material-ui/core';
import {Add} from '@material-ui/icons';

interface IProps {
    id?: string,
    addTodo: (term: string) => void,
}

const useStyles = makeStyles({
    addTodoItem: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '15px',
    },
    addTodoInput: {
        width: '160px'
    }
});

export const AddTodo: React.FC<IProps> = ({ addTodo }) =>{
    const [term, setTerm] = useState<string>('');
    const classes = useStyles();

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
        <form className={classes.addTodoItem} onSubmit={(e) => onFormSubmit(e)}>
            <TextField className={classes.addTodoInput} value={term} type="text"
                   onChange={e => onInputChange(e)}/>
            <Tooltip title="Add" aria-label="add">
                <Fab type="submit" color="primary" >
                    <Add />
                </Fab>
            </Tooltip>
        </form>
    )
};


