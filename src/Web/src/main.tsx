import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { TodoModel } from 'app/models';
import { createStores } from 'app/stores';
import { App } from 'app';

// enable MobX strict mode
configure({ enforceActions: true });

// default fixtures for TodoStore
const defaultTodos = [
  new TodoModel('Use Mobx'),
  new TodoModel('Use React'),
  new TodoModel('Use CQRS'),
  new TodoModel('Use DDD'),
  new TodoModel('Use EventSourcing')
];

// prepare MobX stores
const history = createBrowserHistory();
const rootStore = createStores(history, defaultTodos);

// render react DOM
ReactDOM.render(
  <Provider {...rootStore}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);
