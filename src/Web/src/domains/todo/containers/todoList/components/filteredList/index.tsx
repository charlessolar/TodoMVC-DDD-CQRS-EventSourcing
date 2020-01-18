
import { useState } from 'react';

import { Todo } from '../../../../models/todo';
import { TodoItem } from './components';

interface Props {
    todos: Todo[];
    stateFilter: number;

    onChangeStateFilter: (filter: number) => void;
    onToggle: (todo: Todo) => void;
    onDestroy: (todo: Todo) => void;
    onSave: (todo: Todo) => void;
}

export const FilteredList = (props: Props) => {
    const { todos, stateFilter, onChangeStateFilter, onToggle, onDestroy, onSave, ...rest } = props;

    const [editing, setEditing] = useState();


    return (
        <div>
            {todos.map(todo =>
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle.bind(todo)}
                    onDestroy={onDestroy.bind(todo)}
                    onEdit={() => setEditing(todo.id)}
                    editing={editing === todo.id}
                    onSave={onSave.bind(todo)}
                    onCancel={() => setEditing(undefined)}
                />)}

        </div>
    );
};
