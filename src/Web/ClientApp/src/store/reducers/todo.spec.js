import { todosReducer } from './todo';
import { onCreate, onLoad, onRemove, onUpdate } from '../actions/todo';

describe('todosMutations', () => {
  it('should set list of items on load', () => {
    const state = [];
    const todos = [{ id: 'e2bb892a', name: 'Demo', completed: false }];

    const newState = todosReducer(state, onLoad(todos));

    expect(newState).toEqual(todos);
    expect(newState).toHaveLength(1);
    expect(newState).toContain(todos[0]);
  });

  it('should create new todo', () => {
    const state = [];

    const newState = todosReducer(state, onCreate('Demo'));

    expect(newState).toHaveLength(1);
    expect(newState[0].id).toBeString();
    expect(newState[0].name).toEqual('Demo');
    expect(newState[0].completed).toEqual(false);
  });

  it('should update existing todo', () => {
    const state = [{ id: 'e2bb892a', name: 'Demo', completed: false }];

    const newState = todosReducer(state, onUpdate({ id: 'e2bb892a', name: 'Demo2' }));

    expect(newState[0].name).toEqual('Demo2');
  });

  it('should remove existing todo', () => {
    const state = [{ id: 'e2bb892a', name: 'Demo', completed: false }];

    const newState = todosReducer(state, onRemove('e2bb892a'));

    expect(newState).toHaveLength(0);
  });
});
