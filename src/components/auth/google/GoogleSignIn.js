import React from 'react'
import { StyleSheet } from 'react-native'
import { GoogleSigninButton } from '@react-native-community/google-signin'
import { func, shape, bool } from 'prop-types'

const GoogleButton = ({ signIn, moreStyles, disabled }) => {
  return (
    <GoogleSigninButton
      testID="google-signin-button"
      style={[moreStyles, styles.size]}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
      disabled={disabled}
    />
  )
}

export default GoogleButton

const styles = StyleSheet.create({
  size: {
    width: '100%',
    height: 45,
  },
})

GoogleButton.propTypes = {
  signIn: func.isRequired,
  moreStyles: shape({}),
  disabled: bool,
}
GoogleButton.defaultProps = { moreStyles: {}, disabled: false }
