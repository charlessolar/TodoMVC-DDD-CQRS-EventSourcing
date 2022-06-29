import { combineReducers, createStore as createReduxStore, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FILTERS } from '../constants/filter';

import { todosReducer } from './reducers/todo';
import { filterReducer } from './reducers/filter';

import * as todoActionCreators from './actions/todo';
import * as filterActionCreators from './actions/filter';

import { selectNotCompleted, selectCompleted, selectVisible } from './selectors/todo';

const reducers = combineReducers({
  todos: todosReducer,
  filter: filterReducer
});

const actionCreators = { ...todoActionCreators, ...filterActionCreators };

const mapStateToProps = state => ({
  todos: state.todos,
  filter: state.filter,
  itemsLeft: selectNotCompleted(state.todos).length,
  completedCount: selectCompleted(state.todos).length,
  visibleTodos: selectVisible(state.todos, state.filter),
  areAllCompleted: state.todos.length && state.todos.every(todo => todo.completed)
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export const withStateAndDispatch = Component => connect(mapStateToProps, mapDispatchToProps)(Component);

const storeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const defaultState = { todos: [], filter: FILTERS.all };
export const createStore = (state = defaultState) => createReduxStore(reducers, state, storeEnhancer);
