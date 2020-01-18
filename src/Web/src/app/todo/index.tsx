import { useState } from 'react';

import { TodoList, AddTodo } from 'domains/todo/containers';
import { ALL, COMPLETED, ACTIVE } from 'domains/todo/constants';

interface Props {

}

export const TodoApp => (props: Props) => {

    const [filter, setFilter] = useState(ALL);

    const onSubmit = () => {

    };

    const

    return (
        <div>
            <header className="header">
                <h1>todos</h1>
                <AddTodo onSubmit={onSubmit} />
            </header>
            <TodoList onChangeStateFilter={setFilter} />
        </div>
    );
}