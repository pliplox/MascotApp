import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useStyleSheet, StyleService, Spinner } from '@ui-kitten/components'
import { useAuth } from '../../context/AuthContext'
import { useTranslation } from '../../context/LanguageContext'

const Profile = () => {
  const styles = useStyleSheet(themedStyles)
  const [loading, setLoading] = useState(false)
  const { signOut, userToken } = useAuth()
  const {
    user: { authentication },
  } = useTranslation()

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await signOut()
    } catch (error) {
      setLoading(false)
      console.error(error?.message)
    }
  }

  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={handleSignOut} style={styles.roundButton}>
        {loading ? (
          <Spinner status="basic" />
        ) : (
          <Text style={styles.signOutText}>{authentication.signOut}</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

const themedStyles = StyleService.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButton: {
    marginTop: 100,
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 300,
    backgroundColor: 'color-primary-600',
  },
  signOutText: {
    fontSize: 20,
    color: 'white',
  },
})

export default Profile
