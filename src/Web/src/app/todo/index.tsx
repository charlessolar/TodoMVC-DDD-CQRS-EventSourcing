import { useState } from 'react';

import { TodoList, AddTodo } from 'domains/todo/containers';
import { ALL, COMPLETED, ACTIVE } from 'domains/todo/constants';

interface Props {

}

export const TodoApp = (props: Props) => {

    const [filter, setFilter] = useState(ALL);


    return (
        <div className="todoapp">
            <TodoList onChangeStateFilter={setFilter} />
        </div>
    );
}
