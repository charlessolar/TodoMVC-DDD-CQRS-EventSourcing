import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HeaderContainer } from './header';
import { createStore } from '../../store/index';

describe.only('Header', () => {
  it('should add new element to store', () => {
    const store = createStore();
    const { getByTestId } = render(
      <Provider store={store}>
        <HeaderContainer />
      </Provider>
    );

    const input = getByTestId('todo-create');
    input.value = 'Demo';
    fireEvent.input(input);
    fireEvent.keyUp(input, { key: 'Enter' });

    const state = store.getState();
    expect(state.todos).toHaveLength(1);
    expect(state.todos[0].id).toBeString();
    expect(state.todos[0].name).toEqual('Demo');
    expect(state.todos[0].completed).toEqual(false);
  });
});
