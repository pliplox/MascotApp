import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { FacebookSignIn } from '../../components/auth'
import { useAuth } from '../../context/AuthContext'

const FacebookSignin = () => {
  const { signInFacebook } = useAuth()
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const handleFacebookSignIn = async () => {
    setDisabled(true)
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile'])
      if (result.isCancelled) {
        setDisabled(false)
      } else {
        setLoading(true)
        const data = await AccessToken.getCurrentAccessToken()
        await signInFacebook(data.accessToken)
      }
    } catch (error) {
      setDisabled(false)
      console.error(`Login with Facebook failed: ${error}`)
    }
  }

  return (
    <View style={styles.facebookButton}>
      <FacebookSignIn
        signIn={handleFacebookSignIn}
        disabled={disabled}
        loading={loading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  facebookButton: {
    marginHorizontal: 50,
  },
})

export default React.memo(FacebookSignin)
