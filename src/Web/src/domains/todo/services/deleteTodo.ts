
import useFetch from 'use-http';

import { useRef } from 'react';

const debug = Debug(FILENAME);

export const DeleteTodo = (todoId: string): [
    boolean,
    boolean,
    boolean,
    () => Promise<void>
] => {
    const fetcher = useFetch(
        { path: '/todo', method: 'DELETE' }
    );

    const isSent = useRef<boolean>(false);
    const doFetch = async () => {
        isSent.current = true;
        await fetcher.post({ todoId });
    };

    return [
        isSent.current && !fetcher.loading && !fetcher.error,
        fetcher.loading,
        fetcher.error !== undefined,
        doFetch,
    ];
};
