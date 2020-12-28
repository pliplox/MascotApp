import 'react-native'
import React from 'react'
import App from '../App'
import { render, waitFor } from '@testing-library/react-native'
import AsyncStorage from '@react-native-community/async-storage'

describe('App', () => {
  describe('when token is not setted', () => {
    let wrapper
    beforeEach(() => {
      wrapper = render(<App />)
    })

    it('renders correctly', () => {
      expect(wrapper).toBeTruthy()
    })

    it('renders the splash screen', () => {
      const { getByTestId } = wrapper
      expect(getByTestId('splash-logo-png')).toBeTruthy()
    })
  })

  describe('when token is setted', () => {
    let wrapper
    beforeEach(() => (wrapper = render(<App />)))

    it('renders the bottom tab buttons', async () => {
      await AsyncStorage.setItem('tokenId', 'fakeTokenId')
      await waitFor(() => {
        const { getByTestId } = wrapper
        expect(getByTestId('group-tab-button')).toBeTruthy()
        expect(getByTestId('pet-tab-button')).toBeTruthy()
        expect(getByTestId('profile-tab-button')).toBeTruthy()
      })
    })
  })
})
