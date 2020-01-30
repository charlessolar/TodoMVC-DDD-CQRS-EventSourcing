
import useFetch from 'use-http';

import { useRef } from 'react';

const debug = Debug(FILENAME);

export const MarkActive = (): [
    boolean,
    boolean,
    boolean,
    (todoId: string) => Promise<void>
] => {
    const fetcher = useFetch(
        { path: `/todo/active`, method: 'POST' }
    );

    const isSent = useRef<boolean>(false);
    const doFetch = async (todoId: string) => {
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
