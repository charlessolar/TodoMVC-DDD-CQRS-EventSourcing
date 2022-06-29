import 'todomvc-app-css/index.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { AppContainer } from './components/app/app';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import { createStore } from './store/index';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const container = document.querySelector('app-root');
const root = createRoot(container);

root.render(
    <BrowserRouter basename={baseUrl}>
        <Provider store={createStore()}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
