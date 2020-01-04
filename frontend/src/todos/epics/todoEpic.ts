import {ofType} from 'redux-observable';
import {todoActionsNames} from '../actions/todo';
import {mergeMap, switchMap} from 'rxjs/operators';
import {allActions} from '../actions';
import {sendRequest} from '../../utils/utils';

export const todoFetchEpic = (action$: any) => action$.pipe(
    ofType(todoActionsNames.FETCH_TODOS),
    mergeMap((action: any) =>
            sendRequest(`todos/${action.payload}`, 'GET')
            .then(res => res.json())
            .then(jsonTodos => {
                const fetchedTodos = Array.isArray(jsonTodos.data) ? jsonTodos.data : [];
                return allActions.todo.fetchFulfilled(fetchedTodos);
            })
    )
);
