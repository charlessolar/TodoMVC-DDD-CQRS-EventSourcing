
import * as ReactDOM from 'react-dom';
import Debug from 'debug';

import { Context } from './context';
import { Client } from './client';

const debug = new Debug('app');

export class App {
  public context: Context;

  constructor() {
    this.context = new Context();
  }

  public render() {
    const client = new Client(this.context);
  }

  public async start() {
    debug('start');
    await Promise.all([
      new Promise((resolve) => {
        setTimeout(() => resolve(), 1000);
      })
    ]);
  }
}
