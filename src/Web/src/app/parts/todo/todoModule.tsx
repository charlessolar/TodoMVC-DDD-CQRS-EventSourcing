import * as React from 'react';
import { observable, action } from 'mobx';

import asyncView from '../../components/asyncView';
import { Context } from '../../context';

import { TodoStore } from './stores/todo';

class Stores {
  public todo: TodoStore;

  constructor(private _context: Context) { }
}

export class TodoModule {
  public stores: Stores;
  public routes: UniversalRouterRoute[];

  constructor(private _context: Context) {
    this.stores = new Stores(_context);

    const AsyncView = asyncView(_context);
    this.routes = [
      {
        path: '/',
        children: [
          {
            path: '',
            component: () => ({
              title: 'Todo',
              component: (
                  <AsyncView
                    store={this.stores.todo}
                    getComponent={() => import('./views/todo')}
                  />
              )
            })
          }
        ]
      }
    ];
  }
}
