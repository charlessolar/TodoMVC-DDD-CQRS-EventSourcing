import { useState } from 'react';

import { FilteredList, TodoFooter, TodoToggling } from './components';
import { Todos, MarkActive, MarkComplete } from '../../services';
import { Todo } from '../../models/todo';

import { ALL, COMPLETED, ACTIVE } from '../../constants';

// filter params here so that we could (in theory) pass these to Todo GET service
interface FilterParams {
    stateFilter?: number;
    search?: string;
}

interface Props {
    filterParams?: FilterParams;

    onChangeStateFilter: (state: number) => void;

}
export const TodoList = (props: Props) => {
    const { filterParams, onChangeStateFilter } = props;

    // cheap way to refresh todo list when todos change (typically useFetch would have a "refresh" option)
    const [refresh, setRefresh] = useState(0);
    const { todos, loading, error } = Todos();

    const shownTodos = todos.filter((todo) => {
        switch (filterParams.stateFilter) {
            case ACTIVE:
                return todo.active;
            case COMPLETED:
                return !todo.active;
            default:
                return true;
        }
    });

    const filtered = shownTodos.filter(x => {
        return (
            !filterParams ||
            !filterParams.search ||
            x.name.toLowerCase().indexOf(filterParams.search.toLowerCase()) !==
            -1
        );
    });
    const activeTodoCount = todos.reduce((accum, todo) => {
        return todo.active ? accum + 1 : accum;
    }, 0);
    const completedCount = todos.length - activeTodoCount;

    const onClearCompleted = () => {
        // this should 'delete' completed todos
        // but there is no delete service yet
    }
    const onDestroy = () => {
        // same above
    }
    const onSave = () => {
        // edits a todo
    }
    const onToggle = () => {

    }

    return (
        <div>
            <Loading display={{ loading, error }}>
                <header className="header">
                    <h1>todos</h1>
                    <input
                        ref="newField"
                        className="new-todo"
                        placeholder="What needs to be done?"
                        onKeyDown={e => this.handleNewTodoKeyDown(e)}
                        autoFocus={true}
                    />
                </header>
                {todos.length && <section className="main">
                    <TodoToggling activeTodoCount={activeTodoCount} todoIds={filtered.map(x => x.id)} />
                    <ul className="todo-list">
                        <FilteredList todos={filtered} stateFilter={filterParams.stateFilter || ALL} onChangeStateFilter={onChangeStateFilter} onDestroy={onDestroy} onSave={onSave} onToggle={onToggle} />
                    </ul>
                </section>
                }

                {
                    (activeTodoCount || completedCount) &&
                    <TodoFooter
                        count={activeTodoCount}
                        completedCount={completedCount}
                        shownFilter={filterParams.stateFilter}
                        onClearCompleted={() => onClearCompleted()}
                        onChangeFilter={onChangeStateFilter}
                    />
                }
            </Loading>
        </div>


    );
};
