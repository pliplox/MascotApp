import React from 'react'
import { StyleSheet, View } from 'react-native'
import { GoogleSigninButton } from '@react-native-community/google-signin'
import { func, shape, bool } from 'prop-types'

const GoogleButton = ({ signIn, moreStyles, disabled }) => {
  return (
    <View testID="google-signin-button">
      <GoogleSigninButton
        style={[styles.size, moreStyles]}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        disabled={disabled}
      />
    </View>
  )
}

export default GoogleButton

const styles = StyleSheet.create({ size: { width: 290, height: 50 } })

GoogleButton.propTypes = {
  signIn: func.isRequired,
  moreStyles: shape({}),
  disabled: bool,
}
GoogleButton.defaultProps = { moreStyles: {}, disabled: false }
