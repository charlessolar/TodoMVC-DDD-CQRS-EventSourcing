import { Component } from 'react';

export class CopyRight extends Component {
  render() {
    return (
      <footer className="info">
        <p data-testid="instruction">Double-click to edit a todo</p>
        <p>
          Created by <a href="http://github.com/blacksonic/">blacksonic</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    );
  }
}
