import React from 'react'
import { View, StyleSheet } from 'react-native'
import { LoginButton, AccessToken } from 'react-native-fbsdk'

const FacebookSignin = () => {
  return (
    <View>
      <LoginButton
        onLoginFinished={(error, result) => {
          console.log(error)
          if (error) {
            console.log('login has error: ' + result.error)
          } else if (result.isCancelled) {
            console.log('login is cancelled.')
          } else {
            const token = AccessToken.getCurrentAccessToken().then(data => {
              console.log(data.accessToken.toString())
            })
            console.log(token)
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default FacebookSignin
