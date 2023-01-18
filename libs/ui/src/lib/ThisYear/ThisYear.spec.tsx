import { render } from '@testing-library/react';

import ThisYear from './ThisYear';

describe('ThisYear', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThisYear />);
    expect(baseElement).toBeTruthy();
  });
});
