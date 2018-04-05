import { Theme } from 'material-ui/styles';
import { History } from 'history';
import createBrowserHistory from 'history/createBrowserHistory';
import { Rest } from './utils/rest';
import theme from './theme';

import { config, Config } from './config';
import { TodoModule } from './parts/todo/todoModule';

import AlertStackCreation, { AlertStack } from './components/alertStack';

interface Parts {
  todo: TodoModule;
}

export class Context {
  public rest: Rest;
  public theme: Theme;
  public history: History;
  public config: Config;
  public parts: Parts;
  public alertStack: AlertStack;

  constructor() {
    this.rest = new Rest();
    this.theme = theme();
    this.history = createBrowserHistory();
    this.config = config;
    this.alertStack = AlertStackCreation(this, { limit: 3 });

    this.parts = {
      todo: new TodoModule(this)
    };
  }
}
