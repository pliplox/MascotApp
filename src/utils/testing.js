import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { LanguageProvider } from '../context/LanguageContext';
import { ApplicationProvider } from '@ui-kitten/components';
import { render } from '@testing-library/react-native';
import * as eva from '@eva-design/eva';
import { default as theme } from '../../custom-theme.json';

export const renderWithProviders = ({ ...children }) =>
  render(
    <LanguageProvider>
      <AuthProvider>
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          {children}
        </ApplicationProvider>
      </AuthProvider>
    </LanguageProvider>,
  );
