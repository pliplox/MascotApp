import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { FacebookSignIn } from '../../components/auth'
import { useAuth } from '../../context/AuthContext'

const FacebookSignin = () => {
  const { signInFacebook } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleFacebookSignIn = async () => {
    setLoading(true)
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile'])
      if (result.isCancelled) {
        setLoading(false)
      } else {
        const data = await AccessToken.getCurrentAccessToken()
        await signInFacebook(data.accessToken)
      }
    } catch (error) {
      setLoading(false)
      console.error('Login fail with error: ' + error)
    }
  }

  return (
    <View style={styles.facebookButton}>
      <FacebookSignIn signIn={handleFacebookSignIn} disabled={loading} />
    </View>
  )
}

const styles = StyleSheet.create({
  facebookButton: {
    marginHorizontal: 50,
  },
})

export default FacebookSignin
