import 'react-native';
import React from 'react';
import App from '../App';
import { render } from '@testing-library/react-native';

describe('App', () => {
  describe('when token is not setted', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = render(<App />);
    });

    it('renders correctly', () => {
      expect(wrapper).toBeTruthy();
    });

    it('renders the splash screen text', () => {
      const { getByText } = wrapper;
      expect(getByText('Splash Screen XD')).toBeTruthy();
    });
  });
});
