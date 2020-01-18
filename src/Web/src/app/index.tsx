import { MuiThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';

import theme from './theme';

import {
    ScrollReset,
    ServiceStackProvider,
    AuthProvider,
    LayoutProvider,
    RouterProvider,
} from 'utils/components';

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
        <MuiThemeProvider theme={theme}>
            <Loading display={{ loading: !started }}>
                <SnackbarProvider
                    maxSnack={3}
                    autoHideDuration={6000}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                </SnackbarProvider>
            </Loading>
        </MuiThemeProvider>
    );
};
