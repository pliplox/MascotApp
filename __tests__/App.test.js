import 'react-native'
import React from 'react'
import App from '../App'
import { render, fireEvent } from '@testing-library/react-native'
import AsyncStorage from '@react-native-community/async-storage'
import en from '../src/lang/en.json'

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
    beforeEach(async () => {
      await AsyncStorage.setItem('tokenId', 'fakeTokenId')
      wrapper = render(<App />)
    })

    const groupTabButton = () => wrapper.getByTestId('group-tab-button')
    const petTabButton = () => wrapper.getByTestId('pet-tab-button')
    const profileTabButton = () => wrapper.getByTestId('profile-tab-button')

    it('renders the bottom tab buttons', () => {
      expect(groupTabButton()).toBeTruthy()
      expect(petTabButton()).toBeTruthy()
      expect(profileTabButton()).toBeTruthy()
    })

    describe('when groups tab is clicked', () => {
      it('shows group list screen', () => {
        fireEvent.press(groupTabButton())
        expect(wrapper.getByText(en.groupList.title)).toBeDefined()
      })
    })

    describe('when pet tab is clicked', () => {
      it('shows pet list screen', () => {
        fireEvent.press(petTabButton())
        expect(wrapper.getByText(en.pet.petList.title)).toBeDefined()
      })
    })

    describe('when profile tab is clicked', () => {
      it('shows profile screen', () => {
        fireEvent.press(profileTabButton())
        expect(wrapper.getByText(en.profile.title)).toBeDefined()
      })
    })
  })
})
