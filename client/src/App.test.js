import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingP from './components/LandingP/LandingP.jsx';
 
describe('LandingP', () => {
  test('renders LandingP component', () => {
    // render(<LandingP />);
    render(LandingP)
 
    expect(screen.getByText(/Henry Videogames/)).toBeInTheDocument();
  });
});