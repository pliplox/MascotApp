import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { LanguageProvider } from '../context/LanguageContext';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { render } from '@testing-library/react-native';
import * as eva from '@eva-design/eva';
import { default as theme } from '../../custom-theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { MaterialIconsPack, FeatherIconsPack } from '../../icons';

export const renderWithProviders = ({ ...children }) =>
  render(
    <LanguageProvider>
      <AuthProvider>
        <IconRegistry
          icons={[EvaIconsPack, FeatherIconsPack, MaterialIconsPack]}
        />
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          {children}
        </ApplicationProvider>
      </AuthProvider>
    </LanguageProvider>,
  );
