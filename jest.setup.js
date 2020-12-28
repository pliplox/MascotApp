/* eslint-disable no-undef */

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

/**
 * Google Sign In Mocks
 */
import { NativeModules } from 'react-native'

NativeModules.RNGoogleSignin = {
  SIGN_IN_CANCELLED: '0',
  IN_PROGRESS: '1',
  PLAY_SERVICES_NOT_AVAILABLE: '2',
  SIGN_IN_REQUIRED: '3',
}

export { NativeModules }

const mockGoogleUserInfo = {
  idToken: 'mockIdToken',
  accessToken: null,
  accessTokenExpirationDate: null, // DEPRECATED, on iOS it's a time interval since now in seconds, on Android it's always null
  serverAuthCode: 'mockServerAuthCode',
  scopes: [], // on iOS this is empty array if no additional scopes are defined
  user: {
    email: 'mockEmail',
    id: 'mockId',
    givenName: 'mockGivenName',
    familyName: 'mockFamilyName',
    photo: 'mockPhotoUrl',
    name: 'mockFullName',
  },
}

jest.mock('@react-native-community/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(() => Promise.resolve(true)),
    signIn: jest.fn(() => Promise.resolve(mockGoogleUserInfo)),
    signInSilently: jest.fn(() => Promise.resolve(mockGoogleUserInfo)),
    isSignedIn: jest.fn(() => Promise.resolve(true)),
    revokeAccess: jest.fn(() => Promise.resolve(true)),
    signOut: jest.fn(() => Promise.resolve(true)),
  },
  GoogleSigninButton: jest.requireActual(
    '@react-native-community/google-signin',
  ).GoogleSigninButton,
}))
