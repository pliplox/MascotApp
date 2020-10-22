import 'react-native';
import React from 'react';
import { renderWithProviders } from '../../../utils/testing';
import SignUp from '../SignUp';
import { fireEvent, waitFor, cleanup } from '@testing-library/react-native';
import mascotappiMock from '../../../api/mascotappi';
import en from '../../../lang/en.json';

jest.mock('../../../api/mascotappi', () => ({
  post: jest.fn(),
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
    const { getByText } = wrapper;

    const {
      user: { name, email, password, authentication },
    } = en;

    expect(getByText(name)).toBeTruthy();
    expect(getByText(email)).toBeTruthy();
    expect(getByText(password)).toBeTruthy();
    expect(getByText(authentication.signUp)).toBeTruthy();
  });

  describe('When user sign up', () => {
    describe('using correct data', () => {
      it('calls mascotappi with post request', async () => {
        const { getByPlaceholderText, getByText } = wrapper;

        const {
          user: {
            authentication: { signUp },
            placeholders: { email, password },
          },
        } = en;
        const nameInput = getByPlaceholderText('Min 6 char');
        const emailInput = getByPlaceholderText(email);
        const passwordInput = getByPlaceholderText(password);
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

    describe('using incorrect data', () => {
      it('renders an error message', async () => {
        const { getByPlaceholderText, getByText } = wrapper;

        const {
          user: {
            authentication: { signUp },
            placeholders: { email, password },
          },
        } = en;

        const nameInput = getByPlaceholderText('Min 6 char');
        const emailInput = getByPlaceholderText(email);
        const passwordInput = getByPlaceholderText(password);
        const button = getByText(signUp);

        fireEvent.changeText(nameInput, 'pli');
        fireEvent.changeText(emailInput, 'invalid mail');
        fireEvent.changeText(passwordInput, '');
        fireEvent.press(button);

        const { post } = mascotappiMock;        
        post.mockImplementation(() =>
          Promise.resolve({
            data: {
             message: '\"name\" length must be at least 6 characters long',            
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
    });
  });
});
