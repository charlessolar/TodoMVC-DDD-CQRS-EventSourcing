import { createStore } from './index';
import { onCreate } from './actions/todo';

describe('createStore', () => {
  it('should create a new instance of store', () => {
    const store = createStore();

    const state = store.getState();
    expect(state.todos).toEqual([]);
    expect(state.filter).toEqual('all');
  });

  it('should add new todo', () => {
    const store = createStore();

    store.dispatch(onCreate('Demo'));

    const state = store.getState();
    expect(state.todos).toHaveLength(1);
    expect(state.todos[0].id).toBeString();
    expect(state.todos[0].name).toEqual('Demo');
    expect(state.todos[0].completed).toEqual(false);
  });
});
