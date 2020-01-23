import React, {useEffect, useState} from 'react';
import {Todo} from "./components/Todo/Todo";
import {AddTodo} from "./components/AddTodo/AddTodo";
import TodoListTitle from "./components/TodoListTitle/TodoListTitle";
import {ITodo} from "../../common/types";
import {TodoService} from '../../service/TodoService';
import {List as VirtualizedList} from 'react-virtualized';
import {useDispatch, useSelector} from 'react-redux';
import {allActions} from '../../actions';
import {CookieService} from "../../../auth/service/CookieService";
import TodoHeader from "../TodoHeader/TodoHeader";
import {Button, makeStyles} from "@material-ui/core";


export interface UpdateTodoData {
    updatedTodo: ITodo,
    id: string,
    ctx?: string,
}

const useStyles = makeStyles({
    buttonLogOut: {
        border: 'solid black 0.5px'
    },
});

const TodoList: React.FC = () => {
    const scroll = useSelector((state: any) => state.scroll.scrollStatus);
    const jwt = useSelector((state: any) => state.user.token);
    const todos: ITodo[] = useSelector((state: any) => {
        return state.todos.list
    });
    const dispatcher = useDispatch();
    const needToFirstLoadTodos = todos.length <= 0;

    const [isFetching, setIsFetching] = useState(needToFirstLoadTodos);
    const [listScroll, setListScroll] = useState(scroll);

    const classes = useStyles();

    const logOutEvent = () => {
        dispatcher(allActions.user.logOut());
        CookieService.remove('sign_in');
    };

    const switchTodo = async (id: string) => {
        await TodoService.switchTodo(id, todos);
    };

    const deleteTodo = async (id: string) => {
        await TodoService.deleteTodo(id, todos);
    };

    const editTodo = (id: string) => {
        TodoService.editTodo(id, todos, dispatcher);
    };

    const addTodo = async (content: string) => {
        if (content === '') return;
        await TodoService.addTodo(content);
    };

    const updateTodo = async (id: string, content: string) => {
        if (content === '') {
            return;
        }
        await TodoService.updateTodo(content, id, todos);
    };

    // @ts-ignore
    const listRenderer = ({key, index, style}) =>
    {
        const todo = todos[index];
        return (<div style={style} key={key}>
                <Todo
                    key={todo.id}
                    todo={todo}
                    switchTodo={switchTodo}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}
                    updateScroll={setGlobalScrollStatus}
                    editTodo={editTodo}
                />
            </div>
        );
    };

    const setGlobalScrollStatus = () => {
      dispatcher(allActions.scroll.updateScroll(listScroll));
    };

    const scrollHandler = (e: any) => {
        const {clientHeight, scrollHeight, scrollTop} = e;
        setListScroll(scrollTop);
        if (clientHeight + scrollTop !== scrollHeight || isFetching) return;
        setIsFetching(true);
    };

    useEffect(() => {
        if (!isFetching) return;
        fetchMoreTodos();
    }, [isFetching]);

    function fetchMoreTodos() {
        const lastId = todos.length > 0 ? todos[todos.length - 1].id : '';
        dispatcher(allActions.todo.fetch(lastId, jwt));
        setIsFetching(false);
    }

    const rowHeight = 50;
    const height = 600;
    const width = 500;

    return (
        <>
            <TodoHeader/>
            <Button className={classes.buttonLogOut} onClick={() => logOutEvent() }> Log out </Button>
            <TodoListTitle/>
            <AddTodo
                addTodo={addTodo}
            />
            <VirtualizedList
                rowCount={todos.length}
                rowHeight={rowHeight}
                width={width}
                height={height}
                scrollTop={listScroll}
                rowRenderer={listRenderer}
                onScroll={(e: any) => scrollHandler(e)}
            />
        </>
    )
};

export default TodoList;
