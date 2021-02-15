import React, { createContext, useState, useEffect, useMemo } from 'react'
import mascotappi from '../api/mascotappi'
import AsyncStorage from '@react-native-community/async-storage'
import { node } from 'prop-types'
import { GoogleSignin } from '@react-native-community/google-signin'
import { cache } from 'swr'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [loadingUser, setLoadingUser] = useState(true)
  const [userToken, setUserToken] = useState()

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let tokenFromAsyncStorage
      try {
        tokenFromAsyncStorage = await AsyncStorage.getItem('tokenId')
      } catch (e) {
        console.error(e.message)
        // Restoring token failed
      }
      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setLoadingUser(false)
      setUserToken(tokenFromAsyncStorage)
    }

    bootstrapAsync()
  }, [userToken])

  const signIn = async (email, password) => {
    try {
      const response = await mascotappi.post('signin', { email, password })
      setUser(response.data) // For now: all data is set to the user
      if (response.status >= 400) {
        return response.data.message
      } else {
        setErrorMessage('')
        setUserToken(response?.data?.tokenId)
        await AsyncStorage.setItem('tokenId', response.data.tokenId)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  /**
   * Sign out from google
   */
  const googleSignOut = async () => {
    try {
      const isGoogleSignedIn = await GoogleSignin.isSignedIn()
      if (isGoogleSignedIn) {
        await GoogleSignin.revokeAccess()
        await GoogleSignin.signOut()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('tokenId')
      await googleSignOut()
      cache.clear()
      setUserToken(null)
      setUser(null)
    } catch (error) {
      console.error(error)
      return error
    }
  }

  const signUp = async (name, email, password) => {
    try {
      const response = await mascotappi.post('signup', {
        name,
        email,
        password,
      })
      if (response.status >= 400) {
        return response.data.message
      } else {
        setErrorMessage('')
        await signIn(email, password)
      }
    } catch (error) {
      return error.message
    }
  }

  /**
   * Authenticate with google
   * @param {string} tokenId The token id from the google sign in response
   *
   */
  const signInGoogle = async tokenId => {
    try {
      const response = await mascotappi.post('signingoogle', { token: tokenId })
      const responseToken = response?.data?.token?.jwtoken

      if (response.status >= 400) {
        return response.data.message
      }

      if (responseToken) {
        setErrorMessage('')
        setUserToken(responseToken)

        setUser(response?.data?.user)

        await AsyncStorage.setItem('tokenId', responseToken)
      }

      return response
    } catch (error) {
      console.error('error', error)
      return setErrorMessage(error?.message)
    }
  }

  /**
   * Athenticate with facebook
   * @param {string} accessToken
   */
  const signInFacebook = async accessToken => {
    try {
      const response = await mascotappi.post('signinfacebook', {
        access_token: accessToken,
      })
      const responseToken = response?.data?.token?.jwtoken

      if (response.status >= 400) {
        return response.data.message
      }

      if (responseToken) {
        setErrorMessage('')
        setUserToken(responseToken)
        setUser(response?.data?.user)

        await AsyncStorage.setItem('tokenId', responseToken)
      }
      return response
    } catch (error) {
      console.error('error', error)
      return setErrorMessage(error?.message)
    }
  }

  // TODO: connect this function
  // const resetPassword = () => {};

  const value = useMemo(() => {
    return {
      user,
      loadingUser,
      signIn,
      signOut,
      signUp,
      userToken,
      errorMessage,
      setErrorMessage,
      signInGoogle,
      signInFacebook,
    }
  }, [user, loadingUser, userToken, errorMessage, setErrorMessage])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be inside AuthContext provider')
  }
  return context
}

AuthProvider.propTypes = {
  children: node.isRequired,
}
