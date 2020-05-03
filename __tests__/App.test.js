import 'react-native';
import React from 'react';
import App from '../App';
import { render, wait, act } from '@testing-library/react-native';

describe('App', () => {
  describe('when token is not setted', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = render(<App />);
    });

    it('renders correctly', async () => {
      expect(wrapper).toBeTruthy();
    });

    it('renders the splash screen text', () => {
      const { getByText } = wrapper;
      expect(getByText('Splash Screen XD')).toBeTruthy();
    });
  });
});
