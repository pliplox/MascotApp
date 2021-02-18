import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { lightBlueMascotLogo } from '../images/'
import Gradient from '../components/Gradient'

const Splash = () => {
  return (
    <Gradient styleContainer={styles.container}>
      <Image
        testID="splash-logo-png"
        style={styles.image}
        source={lightBlueMascotLogo}
      />
    </Gradient>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: 115, height: 100, margin: 100 },
})
