import {useEffect} from 'react';
import {ITodo} from '../../../common/types';
import {socket, UpdateTodoData} from '../TodoList';
import {SocketService} from '../../../service/SocketService';
import {useDispatch, useSelector} from 'react-redux';

export const useTodosEffects = () => {

    const todos: ITodo[] = useSelector((state: any) => {
        return state.todos.list
    });
    const dispatcher = useDispatch();

    useEffect(() => {
        socket.on('deleteTodoById', (id: string) =>  SocketService.deleteTodoById(id, dispatcher));
        return () => socket.off('deleteTodoById');
    }, [todos]);

    useEffect(() => {
        socket.on('addTodo', (todo: ITodo) => SocketService.addTodo(todo, dispatcher));
        return () => socket.off('addTodo');
    }, [todos]);

    useEffect(() => {
        socket.on('updateTodoById', (data: UpdateTodoData) => SocketService.updateTodoById(data, dispatcher));
        return () => socket.off('updateTodoById');
    }, [todos]);

    return todos;
};
