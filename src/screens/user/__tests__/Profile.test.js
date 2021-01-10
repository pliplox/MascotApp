import 'react-native'
import React from 'react'
import { renderWithProviders } from '../../../utils/testing'
import Profile from '../Profile'
import { act, cleanup, fireEvent, waitFor } from '@testing-library/react-native'
import en from '../../../lang/en.json'
import AsyncStorage from '@react-native-community/async-storage'
import { cache } from 'swr'

const spyOnClearCache = jest.spyOn(cache, 'clear')

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
      console.log('cache \n\n\n', cache)
      await waitFor(() => {})
      const signOutButton = wrapper.getByText(signOut)

      act(() => fireEvent.press(signOutButton))

      const getToken = await AsyncStorage.getItem(tokenIdKey)

      await waitFor(() => expect(spyOnClearCache).toHaveBeenCalled())

      expect(getToken).toBeNull()
    })
  })
})
