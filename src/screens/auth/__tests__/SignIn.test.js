import 'react-native';
import React from 'react';
import { renderWithProviders } from '../../../utils/testing';
import SignIn from '../SignIn';
import {
  fireEvent,
  waitFor,
  cleanup,
  act,
} from '@testing-library/react-native';
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

  afterEach(cleanup);
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
    expect(getByTestId('casita-png')).toBeTruthy();
    expect(getByTestId('patitas-png')).toBeTruthy();
  });

  describe('When user sign in', () => {
    describe('using correct data', () => {
      it('calls mascotappi with post request', async () => {
        const { getByText, getByPlaceholderText, getByTestId } = wrapper;
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

        const { post } = mascotappiMock;
        const promise = Promise.resolve({
          data: {
            ok: true,
            userId: 'userId',
            name: 'name',
            email: 'email',
            tokenId: 'token',
            expiresIn: 14400,
          },
          status: 200,
        });

        post.mockImplementation(() => promise);

        // wait for the promise to be resolved
        await waitFor(() => expect(mascotappiMock.post).toHaveBeenCalled());
        wrapper.debug();
      });
    });

    describe('using incorrect data', () => {
      it('renders an error message', async () => {
        //console.log(wrapper);
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

        act(() => fireEvent.changeText(emailInput, 'l@l.cl'));
        act(() => fireEvent.changeText(passwordInput, '12345'));
        act(() => fireEvent.press(signInButton));

        /**TODO: No funca... pendiente */
        const promise = Promise.resolve({
          response: {
            data: {
              ok: false,
              message: 'cualquier cosa',
            },
            status: 400,
          },
        });
        /**Fin todo */

        mascotappiMock.post.mockImplementation(() => promise);
        // wait for the promise to be resolved
        await waitFor(() => expect(mascotappiMock.post).toHaveBeenCalled());
      });

      it.todo('shows a snackbar error message');
    });
  });
});
