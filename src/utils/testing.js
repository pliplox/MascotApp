import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { render } from '@testing-library/react-native';

export const renderWithAuthContext = ({ ...children }) =>
  render(<AuthProvider>{children}</AuthProvider>);
