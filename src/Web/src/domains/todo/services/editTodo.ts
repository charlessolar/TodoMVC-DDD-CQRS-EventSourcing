
import useFetch from 'use-http';

import { useRef } from 'react';

const debug = Debug(FILENAME);

export const EditTodo = (todoId: string): [
    boolean,
    boolean,
    boolean,
    (message: string) => Promise<void>
] => {
    const fetcher = useFetch(
        { path: '/todos/edit', method: 'POST' }
    );

    const isSent = useRef<boolean>(false);
    const doFetch = async (message: string) => {
        isSent.current = true;
        await fetcher.post({ todoId, message });
    };

    return [
        isSent.current && !fetcher.loading && !fetcher.error,
        fetcher.loading,
        fetcher.error !== undefined,
        doFetch,
    ];
};
