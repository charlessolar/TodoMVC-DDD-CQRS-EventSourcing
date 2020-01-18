import { useEffect, useRef } from 'react';

// https://github.com/streamich/react-use/blob/master/src/useMountedState.ts
export const useMounted = (): (() => boolean) => {
    const mountedRef = useRef<boolean>(false);

    useEffect(() => {
        mountedRef.current = true;

        return () => {
            mountedRef.current = false;
        };
    });

    return () => mountedRef.current;
};
