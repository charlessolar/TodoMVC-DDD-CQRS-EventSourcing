import { useState } from 'react';

import { FilteredList, TodoFooter, TodoToggling } from './components';
import { Todos, AddTodo } from '../../services';
import { Todo } from '../../models/todo';

import { ALL, COMPLETED, ACTIVE } from '../../constants';

const ENTER_KEY = 13;

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

    const [inputField, setInput] = useState();
    const { todos, loading, error, refresh } = Todos();
    const [processing, adding, failure, execute] = AddTodo();

    const shownTodos = todos.filter((todo) => {
        switch (filterParams && filterParams.stateFilter) {
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
        refresh();
    }
    const onSave = () => {
        // edits a todo
        refresh();
    }
    const onToggle = () => {

    }

    const handleNewTodoKeyDown = async (e: React.KeyboardEvent) => {
        if (e.keyCode !== ENTER_KEY) {
            return;
        }

        e.preventDefault();

        const val = inputField.trim();

        if (!val) {
            return;
        }

        await execute(val);
        setInput(undefined);
        refresh();
    }

    return (
        <div>
            <Loading display={{ loading, error }}>
                <header className="header">
                    <h1>Todos</h1>
                    <input
                        className="new-todo"
                        placeholder="What needs to be done?"
                        onKeyDown={e => handleNewTodoKeyDown(e)}
                        onChange={e => setInput(e.target.value)}
                        autoFocus={true}
                        disabled={adding}
                    />
                </header>
                {todos.length && <section className="main">
                    <TodoToggling activeTodoCount={activeTodoCount} todoIds={filtered.map(x => x.id)} />
                    <ul className="todo-list">
                        <FilteredList todos={filtered} stateFilter={filterParams && filterParams.stateFilter || ALL} onChangeStateFilter={onChangeStateFilter} onDestroy={onDestroy} onSave={onSave} onToggle={onToggle} />
                    </ul>
                </section>
                }

                {
                    (activeTodoCount || completedCount) &&
                    <TodoFooter
                        count={activeTodoCount}
                        completedCount={completedCount}
                        shownFilter={filterParams && filterParams.stateFilter}
                        onClearCompleted={() => onClearCompleted()}
                        onChangeFilter={onChangeStateFilter}
                    />
                }
            </Loading>
        </div>


    );
};
