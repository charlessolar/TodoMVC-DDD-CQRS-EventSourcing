import { render } from '@testing-library/react';
import { CopyRight } from './copy-right';

describe('CopyRight', () => {
  it('should render component', () => {
    const { getByTestId } = render(<CopyRight />);

    expect(getByTestId('instruction')).toHaveTextContent('Double-click to edit a todo');
  });
});
