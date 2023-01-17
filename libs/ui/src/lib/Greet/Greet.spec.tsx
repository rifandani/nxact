import { render } from '@testing-library/react';

import Greet, { GreetProps } from './Greet';

describe('Greet', () => {
  it('should render successfully', () => {
    const greetProps: GreetProps = {
      name: 'test',
    };

    const { baseElement } = render(<Greet {...greetProps} />);
    expect(baseElement).toBeTruthy();
  });
});
