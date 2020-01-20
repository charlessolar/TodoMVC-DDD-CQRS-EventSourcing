import { Provider } from 'use-http';

import { TodoApp } from 'app/todo';

import { config } from './config';

const debug = Debug('app');

export const App = () => {
    const [started, finishSetup] = React.useState(false) as [boolean, Function];

    const start = async () => {
        debug('start');
        await Promise.all([
            // this.preAuth(),
            new Promise(resolve => {
                setTimeout(() => resolve(), 1);
            }),
        ]);

        finishSetup(true);
    };

    // what's a better way of doing this
    if (!started) {
        start();
    }
    return (
        <Provider url={config.apiUrl}>
            <Loading display={{ loading: !started }}>
                <TodoApp />
            </Loading>
        </Provider>
    );
};
