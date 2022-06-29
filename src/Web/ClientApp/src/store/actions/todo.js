import { v4 as uuidv4 } from 'uuid';
import { ACTION_TYPES } from '../../constants/action-type';
import { TodoLocal } from '../../services/todo-local';

// Note note 
// Api calls shoehorned into this project here
// not technically how redux should work but completes the example

export const onLoad = todos => ({ type: ACTION_TYPES.load, todos });
export const onCreate = name => {
    let todo = { id: uuidv4(), name: name, completed: false };
    TodoLocal.createTodo(todo);

    return ({ type: ACTION_TYPES.create, todo });
}
export const onRemove = id => {
    let todo = { id };
    TodoLocal.removeTodo(todo);

    return ({ type: ACTION_TYPES.remove, todo });
}
export const onUpdate = values => {
    if (values.completed)
        TodoLocal.markComplete({ id: values.id });
    else if (!values.completed)
        TodoLocal.markActive({ id: values.id });

    return ({ type: ACTION_TYPES.update, values });
}

export const onCompleteAll = () => ({ type: ACTION_TYPES.completeAll });
export const onClearCompleted = () => ({ type: ACTION_TYPES.clearCompleted });
