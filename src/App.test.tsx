import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

const {show, setshow}= useState(false);
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});





/////Shoaib Khurshid


/////