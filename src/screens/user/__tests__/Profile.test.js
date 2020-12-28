import 'react-native'
import React from 'react'
import { renderWithProviders } from '../../../utils/testing'
import Profile from '../Profile'
import { act, cleanup, fireEvent, waitFor } from '@testing-library/react-native'
import en from '../../../lang/en.json'
import AsyncStorage from '@react-native-community/async-storage'

describe('Profile', () => {
  let wrapper
  beforeEach(() => {
    wrapper = renderWithProviders(<Profile />)
  })

  afterEach(cleanup)

  describe('When pressing sign out button', () => {
    it('Sets user token to null', async () => {
      const {
        user: {
          authentication: { signOut },
        },
      } = en

      const tokenIdKey = 'tokenId'
      await AsyncStorage.setItem(tokenIdKey, 'fakeTokenId')
      await waitFor(() => {})
      const signOutButton = wrapper.getByText(signOut)

      act(() => fireEvent.press(signOutButton))

      await waitFor(() => {})
      await waitFor(() => {})

      const getToken = await AsyncStorage.getItem(tokenIdKey)

      expect(getToken).toBeNull()
    })
  })
})
