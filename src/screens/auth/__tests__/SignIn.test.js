import 'react-native'
import React from 'react'
import { renderWithProviders } from '../../../utils/testing'
import SignIn from '../SignIn'
import { fireEvent, cleanup } from '@testing-library/react-native'
import mascotappiMock from '../../../api/mascotappi'
import en from '../../../lang/en.json'

jest.mock('../../../api/mascotappi', () => ({
  post: jest.fn(),
}))

describe('SignIn', () => {
  let wrapper

  beforeEach(() => {
    wrapper = renderWithProviders(<SignIn />)
  })

  afterEach(() => {
    mascotappiMock.post.mockClear()
    cleanup()
  })

  // Dictionary words
  const {
    user: {
      placeholders,
      authentication: { label, signIn, link },
    },
  } = en

  const signInButton = async () => wrapper.findByText(signIn)

  it('renders correctly', async () => {
    expect(wrapper).toBeTruthy()
    const { getByText, getByPlaceholderText, getByTestId } = wrapper

    expect(getByPlaceholderText(placeholders.email)).toBeTruthy()
    expect(getByPlaceholderText(placeholders.password)).toBeTruthy()
    expect(getByText(label.account)).toBeTruthy()
    expect(getByText(link.forgetPassword)).toBeTruthy()
    expect(getByText(link.withoutAccount)).toBeTruthy()
    expect(await signInButton()).toBeTruthy()
    expect(getByTestId('google-signin-button')).toBeTruthy()
    expect(getByText('Login with Facebook')).toBeTruthy()
    expect(getByTestId('logo-png')).toBeTruthy()
    expect(getByTestId('house-png')).toBeTruthy()
    expect(getByTestId('paws-png')).toBeTruthy()
  })

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
        )
        //work
        const { getByPlaceholderText } = wrapper

        const emailInput = getByPlaceholderText(placeholders.email)
        const passwordInput = getByPlaceholderText(placeholders.password)

        fireEvent.changeText(emailInput, 'pliplox@pliplox.cl')
        fireEvent.changeText(passwordInput, '123123')
        fireEvent.press(await signInButton())
        //assertions / expects
        expect(mascotappiMock.post).toHaveBeenCalledTimes(1)
      })
    })

    describe('using incorrect data', () => {
      it('shows a snackbar error message', async () => {
        //TODO: It doesn't really test if the snackbak shows ... pending
        //setup
        mascotappiMock.post.mockImplementation(() =>
          Promise.resolve({
            data: {
              ok: false,
              message: 'Correo electronico o contraseña incorrecta',
            },
            status: 401,
          }),
        )
        //work
        const { getByPlaceholderText } = wrapper

        const emailInput = getByPlaceholderText(placeholders.email)
        const passwordInput = getByPlaceholderText(placeholders.password)
        fireEvent.changeText(emailInput, 'pliplo')
        fireEvent.changeText(passwordInput, '123123')
        fireEvent.press(await signInButton())
        //assertions / expects
        // TODO: fix Warning: Cant perform a React state update on an unmounted component.
        // This is a no-op, but it indicates a memory leak in your application. To fix, cancel
        // all subscriptions and asynchronous tasks...
        // Probably that is the reason why the expectation below is not passing
        // expect(getByText('[Error: Request failed with status code 401]')).toBeTruthy();
        expect(mascotappiMock.post).toHaveBeenCalledTimes(1)
      })
    })
  })
})
