import * as React from 'react';

import { Context } from '../../../context';
import { TodoStore } from '../stores/todo';

import page from '../../../components/page';

interface TodoProps {
  store: TodoStore;
}

export default function Todo(context: Context) {

  const Page = page();

  return class extends React.Component<TodoProps, {}> {
    public render() {
      return (
        <div></div>
      );
    }
  };
}
