import { useContext } from 'react';
import { History, Location } from 'history';

import { RouterContext } from 'utils/components/RouterProvider';

const debug = Debug('router');

export const useHistory = (): {
    location: Location<any>;
    navigate: (location: string) => void;
    history: History<any>;
} => {
    const { history } = useContext(RouterContext);

    const navigate = (location: string) => {
        history.push(location);
    };

    return { location: history.location, navigate, history };
};
