import React from 'react'
import Gradient from '../Gradient'
import { ScrollView, StyleSheet } from 'react-native'

const AuthLayout = ({ children }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Gradient styleContainer={styles.gradient}>{children}</Gradient>
    </ScrollView>
  )
}

export default AuthLayout

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  gradient: {
    flex: 1,
  },
})
