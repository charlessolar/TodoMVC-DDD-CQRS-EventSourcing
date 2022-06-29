import { render, fireEvent } from '@testing-library/react';
import { Item } from './item';

describe('Item', () => {
  it('should display todo item', () => {
    const todo = { id: 'e2bb892a-844a-47fb-a2b3-47f491af9d88', name: 'Demo', completed: false };
    const onUpdate = jest.fn();
    const onRemove = jest.fn();
    const { getByTestId } = render(<Item todo={todo} onUpdate={onUpdate} onRemove={onRemove} />);

    expect(getByTestId('todo-name')).toHaveTextContent(todo.name);
  });

  it('should mark todo item as completed', () => {
    const todo = { id: 'e2bb892a-844a-47fb-a2b3-47f491af9d88', name: 'Demo', completed: true };
    const onUpdate = jest.fn();
    const onRemove = jest.fn();
    const { getByTestId } = render(<Item todo={todo} onUpdate={onUpdate} onRemove={onRemove} />);

    expect(getByTestId('todo-item')).toHaveClass('completed');
  });

  it('should notify about delete button', () => {
    const todo = { id: 'e2bb892a-844a-47fb-a2b3-47f491af9d88', name: 'Demo', completed: false };
    const onUpdate = jest.fn();
    const onRemove = jest.fn();
    const { getByTestId } = render(<Item todo={todo} onUpdate={onUpdate} onRemove={onRemove} />);

    fireEvent.click(getByTestId('todo-remove'));

    expect(onRemove).toHaveBeenCalledWith(todo.id);
  });
});
