
import useFetch from 'use-http';

import { useRef } from 'react';

const debug = Debug(FILENAME);

export const MarkAllActive = (todoIds: string[]): [
    boolean,
    boolean,
    boolean,
    () => Promise<void>
] => {
    const fetcher = useFetch(
        { path: `/todo/mark_active`, method: 'POST' }
    );

    const isSent = useRef<boolean>(false);
    const doFetch = async () => {
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
