import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStateAndDispatch } from '../../store';

const ENTER_KEY = 'Enter';

export class Header extends Component {
  state = {
    name: ''
  };

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    if (event.key !== ENTER_KEY) {
      return;
    }

    this.props.onCreate(this.state.name);
    this.setState({ name: '' });
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.name}
          onInput={e => this.handleChange(e)}
          onKeyUp={e => this.handleSubmit(e)}
          onChange={() => {}}
          data-testid="todo-create"
        />
      </header>
    );
  }
}

Header.propTypes = {
  onCreate: PropTypes.func.isRequired
};

export const HeaderContainer = withStateAndDispatch(Header);
