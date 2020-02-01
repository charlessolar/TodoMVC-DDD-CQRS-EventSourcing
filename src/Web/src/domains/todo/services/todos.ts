import { useState } from 'react';
import useFetch from 'use-http';

import { Todo } from '../models/todo';

const debug = Debug(FILENAME);

export const Todos = () => {

    const [refresher, changeRefresher] = useState(0);

    const refresh = () => {
        changeRefresher(refresher + 1);
    };

    const { loading, error, data } = useFetch(
        {
            path: '/todo',
            data: []
        }, [refresher]);

    return { loading, error, todos: data && data.records && data.records.map(x => new Todo(x)) || [], refresh };
};
