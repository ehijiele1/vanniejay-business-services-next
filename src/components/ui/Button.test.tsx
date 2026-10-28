import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

test('renders button with children', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});
