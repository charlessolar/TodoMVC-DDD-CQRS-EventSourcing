import useFetch from 'use-http';

import { Todo } from '../models/todo';

const debug = Debug(FILENAME);

export const Todos = () => {
    const { loading, error, data } = useFetch(
        {
            path: '/todos',
            data: []
        }, []);

    return { loading, error, todos: data.records.map(x => new Todo(x)) };
};
