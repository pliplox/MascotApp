import 'react-native';
import React from 'react';
import { renderWithProviders } from '../../../utils/testing';
import SignIn from '../SignIn';
import { fireEvent, cleanup } from '@testing-library/react-native';
import mascotappiMock from '../../../api/mascotappi';
import en from '../../../lang/en.json';

jest.mock('../../../api/mascotappi', () => ({
  post: jest.fn(),
}));

describe('SignIn', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderWithProviders(<SignIn />);
  });

  afterEach(() => {
    cleanup();
    mascotappiMock.post.mockClear();
  });

  it('renders correctly', () => {
    expect(wrapper).toBeTruthy();
    const { getByText, getByPlaceholderText, getByTestId } = wrapper;

    const {
      user: {
        placeholders,
        authentication: { label, signIn, link },
      },
    } = en;

    expect(getByPlaceholderText(placeholders.email)).toBeTruthy();
    expect(getByPlaceholderText(placeholders.password)).toBeTruthy();
    expect(getByText(label.account)).toBeTruthy();
    expect(getByText(link.forgetPassword)).toBeTruthy();
    expect(getByText(label.loginWith)).toBeTruthy();
    expect(getByText(link.withoutAccount)).toBeTruthy();
    expect(getByText(signIn)).toBeTruthy();
    expect(getByText('Facebook')).toBeTruthy();
    expect(getByText('Google')).toBeTruthy();
    expect(getByTestId('logo-png')).toBeTruthy();
    expect(getByTestId('house-png')).toBeTruthy();
    expect(getByTestId('paws-png')).toBeTruthy();
  });

  describe('When user sign in', () => {
    describe('using correct data', () => {
      it('calls mascotappi with post request', async () => {
        //setup
        mascotappiMock.post.mockImplementation(() =>
          Promise.resolve({
            data: {
              ok: true,
              userId: 'userExist.id',
              name: 'userExist.name',
              email: 'userExist.email',
              tokenId: 'token',
              expiresIn: 14400,
            },
            status: 200,
          }),
        );
        //work
        const { getByText, getByPlaceholderText } = wrapper;
        const {
          user: {
            placeholders,
            authentication: { signIn },
          },
        } = en;

        const emailInput = getByPlaceholderText(placeholders.email);
        const passwordInput = getByPlaceholderText(placeholders.password);
        const signInButton = getByText(signIn);

        fireEvent.changeText(emailInput, 'pliplox@pliplox.cl');
        fireEvent.changeText(passwordInput, '123123');
        fireEvent.press(signInButton);

        // wait for the promise to be resolved
        expect(mascotappiMock.post).toHaveBeenCalledTimes(1);
      });
    });

    describe('using incorrect data', () => {
      it('shows a snackbar error message', async () => {
        //TODO: It doesn't really test if the snackbak shows ... pending
        //setup
        mascotappiMock.post.mockImplementation(() =>
          Promise.resolve({
            data: {
              ok: false,
              message: `Correo electronico o contraseña incorrecta`,
            },
            status: 401,
          }),
        );
        //work
        const { getByText, getByPlaceholderText } = wrapper;
        const {
          user: {
            placeholders,
            authentication: { signIn },
          },
        } = en;

        const emailInput = getByPlaceholderText(placeholders.email);
        const passwordInput = getByPlaceholderText(placeholders.password);
        const signInButton = getByText(signIn);
        fireEvent.changeText(emailInput, 'pliplo');
        fireEvent.changeText(passwordInput, '123123');
        fireEvent.press(signInButton);

        //assertions / expects
        expect(mascotappiMock.post).toHaveBeenCalledTimes(1);
      });
    });
  });
});
