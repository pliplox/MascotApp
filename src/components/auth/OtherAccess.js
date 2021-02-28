import React from 'react'
import { StyleService, useStyleSheet } from '@ui-kitten/components'
import { View } from 'react-native'
import GoogleSignIn from '../../screens/auth/GoogleSignIn'
import FacebookSignin from '../../screens/auth/FacebookSignin'

const OtherAccess = () => {
  const styles = useStyleSheet(themedStyles)

  return (
    <View style={styles.container}>
      <GoogleSignIn />
      <FacebookSignin />
    </View>
  )
}

const themedStyles = StyleService.create({
  container: {
    marginTop: 20,
    marginBottom: 5,
  },
})

export default OtherAccess
