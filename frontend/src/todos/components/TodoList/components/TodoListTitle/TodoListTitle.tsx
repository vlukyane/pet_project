import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Box} from '@material-ui/core';

const TodoListTitle = () => {
    return (
        <Typography component="h1" align='center'>
            <Box fontSize={40}>
                Todo List
            </Box>
        </Typography>
    )
};

export default TodoListTitle;
