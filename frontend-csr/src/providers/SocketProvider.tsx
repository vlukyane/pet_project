import React, {useEffect} from "react";
import {SocketService} from "../todos/service/SocketService";
import {ITodo} from "../todos/common/types";
import {useDispatch, useSelector} from "react-redux";
import {UpdateTodoData} from "../todos/components/TodoList/TodoList";

interface IProps {
    children: React.ReactNode;
}

const socket = SocketService.init();

const SocketProvider: React.FC<IProps> = ({children}) => {
    const todos: ITodo[] = useSelector((state: any) => {
        return state.todos.list
    });
    const dispatcher = useDispatch();

    useEffect(() => {
        socket.on('deleteTodoById', (id: string) =>  SocketService.deleteTodoById(id, dispatcher));
        return () => socket.off('deleteTodoById');
    }, [todos]);

    useEffect(() => {
        socket.on('addTodo', (todo: ITodo) => {
            console.log('OPA');
            SocketService.addTodo(todo, dispatcher)
        });
        return () => socket.off('addTodo');
    }, [todos]);

    useEffect(() => {
        socket.on('updateTodoById', (data: UpdateTodoData) => SocketService.updateTodoById(data, dispatcher));
        return () => socket.off('updateTodoById');
    }, [todos]);

    return <>
        {children}
    </>
};

export default SocketProvider;
