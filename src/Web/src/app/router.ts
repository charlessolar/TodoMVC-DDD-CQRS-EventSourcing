import * as React from 'react';
import Router from 'universal-router';
import Debug from 'debug';

import asyncView from './components/asyncView';
import { Context } from './context';

const debug = new Debug('router');

export function createRouter(context: Context) {
  const AsyncView = asyncView(context);

  function createPart(partName: string, partCreate: any, routerContext: any) {
    const part = partCreate.default(context);
    context.parts[partName] = part;
    routerContext.route.children = part.routes();
    return routerContext.next();
  }

  const routes: UniversalRouterRoute = {
    path: '',
    children: [
      ...context.parts.todo.routes,
      // {
      //   path: '/profile',
      //   action: async (routerContext) => {
      //     isAuthenticated(routerContext);
      //     const partCreate = await import('./parts/profile/profileModule');
      //     return createPart('profile', partCreate, routerContext);
      //   }
      // },
      // {
      //   path: '/users',
      //   action: async (routerContext) => {
      //     isAuthenticated(routerContext);
      //     const partCreate = await import('./parts/admin/adminModule');
      //     return createPart('admin', partCreate, routerContext);
      //   }
      // }
    ]
  };

  return new Router(routes, {
    resolveRoute(routerContext: UniversalRouterContext, params: any) {
      const { route } = routerContext;

      if (typeof route.action === 'function') {
        route.action(routerContext, params);
      }

      if (typeof route.component === 'function') {
        return route.component(routerContext);
      }
    }
  });
}
