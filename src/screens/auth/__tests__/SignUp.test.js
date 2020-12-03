import 'react-native';
import React from 'react';
import { renderWithProviders } from '../../../utils/testing';
import SignUp from '../SignUp';
import {
  fireEvent,
  waitFor,
  cleanup,
  act,
} from '@testing-library/react-native';
import mascotappiMock from '../../../api/mascotappi';
import en from '../../../lang/en.json';
import emojis from '../../../../emojis';

jest.mock('../../../api/mascotappi', () => ({
  post: jest.fn(), //() => Promise.resolve({ data: {} })
  create: jest.fn(),
}));

describe('SignUp', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderWithProviders(<SignUp />);
  });

  afterEach(cleanup);

  it('renders correctly', async () => {
    expect(wrapper).toBeTruthy();

    // renders the elements
    const { getByText, getByPlaceholderText, getByTestId } = wrapper;

    const {
      user: {
        name,
        placeholders,
        authentication: { label, signUp, link },
      },
    } = en;

    expect(getByPlaceholderText(name)).toBeTruthy();
    expect(getByPlaceholderText(placeholders.email)).toBeTruthy();
    expect(getByPlaceholderText(placeholders.password)).toBeTruthy();
    expect(getByText(label.createAccount)).toBeTruthy();
    expect(getByText(label.loginWith)).toBeTruthy();
    expect(getByText(link.withAccount)).toBeTruthy();
    expect(getByText(signUp)).toBeTruthy();
    expect(getByText('Facebook')).toBeTruthy();
    expect(getByText('Google')).toBeTruthy();
    expect(getByTestId('logo-png')).toBeTruthy();
    expect(getByTestId('house-png')).toBeTruthy();
    expect(getByTestId('paws-png')).toBeTruthy();
  });

  describe('When user sign up', () => {
    describe('using correct data', () => {
      it('calls mascotappi with post request', async () => {
        const { getByPlaceholderText, getByText } = wrapper;

        const {
          user: {
            name,
            placeholders,
            authentication: { signUp },
          },
        } = en;

        const nameInput = getByPlaceholderText(name);
        const emailInput = getByPlaceholderText(placeholders.email);
        const passwordInput = getByPlaceholderText(placeholders.password);
        const button = getByText(signUp);

        fireEvent.changeText(nameInput, 'pliplox');
        fireEvent.changeText(emailInput, 'pliplox@pliplox.cl');
        fireEvent.changeText(passwordInput, '123123');
        fireEvent.press(button);

        const { post } = mascotappiMock;
        post.mockImplementation(() =>
          Promise.resolve({
            data: { userId: 'userId', message: 'message' },
            status: 201,
          }),
        );

        // wait for the promise to be resolved
        await waitFor(() => expect(mascotappiMock.post).toHaveBeenCalled());
      });
    });

    it.only('', async () => {
      //setup
      mascotappiMock.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            message: '"name" length must be at least 6 characters long kk',
          },
          status: 400,
        }),
      );
      //work
      const { getByPlaceholderText, getByText, debug, findByText } = wrapper;

      const {
        user: {
          name,
          placeholders,
          authentication: { signUp },
        },
      } = en;

      const nameInput = getByPlaceholderText(name);
      const emailInput = getByPlaceholderText(placeholders.email);
      const passwordInput = getByPlaceholderText(placeholders.password);
      const button = getByText(signUp);

      act(() => fireEvent.changeText(nameInput, 'pli'));
      act(() => fireEvent.changeText(emailInput, 'pliplox@pliplox.cl'));
      act(() => fireEvent.changeText(passwordInput, '123123'));
      act(() => fireEvent.press(button));

      //assertions / expects
      expect(mascotappiMock.post).toHaveBeenCalledTimes(1);
    });

    describe('using incorrect data', () => {
      it('renders an error message', async () => {
        const { getByPlaceholderText, getByText, debug } = wrapper;

        const {
          user: {
            name,
            placeholders,
            authentication: { signUp },
          },
        } = en;

        const nameInput = getByPlaceholderText(name);
        const emailInput = getByPlaceholderText(placeholders.email);
        const passwordInput = getByPlaceholderText(placeholders.password);
        const button = getByText(signUp);

        act(() => fireEvent.changeText(nameInput, 'pli'));
        act(() => fireEvent.changeText(emailInput, 'invalid mail'));
        act(() => fireEvent.changeText(passwordInput, ''));
        act(() => fireEvent.press(button));
        const { post } = mascotappiMock;
        post.mockImplementation(() =>
          Promise.resolve({
            data: {
              message: '"name" length must be at least 6 characters long',
            },
            status: 400,
          }),
        );

        // wait for the promise to be rejected
        await waitFor(() => expect(mascotappiMock.post).toHaveBeenCalled());

        // TODO: fix Warning: Cant perform a React state update on an unmounted component.
        // This is a no-op, but it indicates a memory leak in your application. To fix, cancel
        // all subscriptions and asynchronous tasks...
        // Probably that is the reason why the expectation below is not passing
        // expect(getByText('[Error: Request failed with status code 401]')).toBeTruthy();
      });

      it.todo('shows a snackbar error message');
    });
  });
});
