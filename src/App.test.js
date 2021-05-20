import { render, screen } from '@testing-library/react';
import App from './App';

test('Home', () => {
  render(<App />);
  const linkElement = screen.getByText('Home');
  expect(linkElement).toBeInTheDocument();
});
