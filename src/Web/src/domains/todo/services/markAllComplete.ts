
import useFetch from 'use-http';

import { useRef } from 'react';

const debug = Debug(FILENAME);

export const MarkAllComplete = (): [
    boolean,
    boolean,
    boolean,
    (todoIds: string[]) => Promise<void>
] => {
    const fetcher = useFetch(
        { path: `/todo/mark_complete`, method: 'POST' }
    );

    const isSent = useRef<boolean>(false);
    const doFetch = async (todoIds: string[]) => {
        isSent.current = true;

        const promises = todoIds.map(x => fetcher.post({ todoId: x }));

        await Promise.all(promises);
    };

    return [
        isSent.current && !fetcher.loading && !fetcher.error,
        fetcher.loading,
        fetcher.error !== undefined,
        doFetch,
    ];
};
