import { Component } from 'react';
import PropTypes from 'prop-types';
import { TodoLocal } from '../../services/todo-local';
import { withStateAndDispatch } from '../../store';
import { HeaderContainer } from '../header/header';
import { ListContainer } from '../list/list';
import { FooterContainer } from '../footer/footer';
import { CopyRight } from '../copy-right/copy-right';

export class App extends Component {
    async componentDidMount() {
        var todos = await TodoLocal.loadTodos();
        this.props.onLoad(todos);
    }

    render() {
        return (
            <div id="app">
                <section className="todoapp">
                    <HeaderContainer />
                    {!!this.props.todos.length && <ListContainer />}
                    {!!this.props.todos.length && <FooterContainer />}
                </section>
                <CopyRight />
            </div>
        );
    }
}

App.propTypes = {
    todos: PropTypes.array.isRequired,
    onLoad: PropTypes.func.isRequired
};

export const AppContainer = withStateAndDispatch(App);
