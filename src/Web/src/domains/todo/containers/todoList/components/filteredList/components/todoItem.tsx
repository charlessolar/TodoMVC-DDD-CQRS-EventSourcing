import { useState } from 'react';
import classNames from 'classnames';

import { EditTodo, DeleteTodo, MarkActive, MarkComplete } from '../../../../../services';
import { Todo } from '../../../../../models/todo';



interface Props {
    todo: Todo;
    editing: boolean;
    onToggle: Function;
    onDestroy: Function;
    onCancel: Function;
    onSave: Function;
    onEdit: Function;
}

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

export const TodoItem = (props: Props) => {
    const { todo, editing, onToggle, onDestroy, onCancel, onSave, onEdit } = props;

    const [editText, setEditText] = useState(todo.message);
    const [processing, loading, error, perform] = EditTodo(todo.id);
    const [processingDestroy, loadingDestroy, errorDestroy, performDestroy] = DeleteTodo(todo.id);

    // again not ideal should be own component
    const [processActive, loadingActive, errorActive, performActive] = MarkActive(todo.id);
    const [processComplete, loadingComplete, errorComplete, performComplete] = MarkComplete(todo.id);


    const handleSubmit = async () => {
        const val = editText.trim();
        if (val) {
            await perform(val);
            todo.message = val;
            onSave();
            setEditText(val);
        } else {
            onDestroy();
        }
    }

    const handleEdit = () => {
        onEdit();
        setEditText(todo.message);
    }
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.keyCode === ESCAPE_KEY) {
            setEditText(todo.message);
            onCancel(event);
        } else if (e.keyCode === ENTER_KEY) {
            handleSubmit();
        }
    }
    const handleChange = (e: React.ChangeEvent) => {
        setEditText((e.target as any).value);
    }
    const handleDestroy = async () => {
        await performDestroy();
        onDestroy();
    }
    const handleToggle = async () => {
        if (todo.active) {
            await performComplete();
            todo.active = false;
        } else {
            await performActive();
            todo.active = true;
        }
        onToggle();
    }

    return (
        <li className={classNames({
            completed: !todo.active,
            editing
        })}>
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    checked={!todo.active}
                    onChange={() => handleToggle()}
                />
                <label onDoubleClick={e => handleEdit()}>
                    {todo.message}
                </label>
                <button className="destroy" onClick={() => handleDestroy()} />
            </div>
            <input
                className="edit"
                value={editText}
                onBlur={() => handleSubmit()}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </li>
    );
}