import { render } from 'test/test-utils';
import { Logo } from './Logo';

describe('Logo', () => {
  test('renders components styled with CSS Modules', () => {
    render(<Logo />);
  });
});
