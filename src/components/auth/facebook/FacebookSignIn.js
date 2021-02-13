import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Icon, Text } from '@ui-kitten/components'
import { useTranslation } from '../../../context/LanguageContext'
import { func, bool } from 'prop-types'

const FacebookIcon = props => <Icon {...props} name="facebook" />

const FacebookSingIn = ({ signIn, disabled }) => {
  const { user } = useTranslation()

  return (
    <Button
      onPress={signIn}
      style={styles.button}
      accessoryLeft={FacebookIcon}
      disabled={disabled}>
      <Text style={styles.textButton}>
        {user.authentication.signInFacebook}
      </Text>
    </Button>
  )
}

export default FacebookSingIn

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#4064ac',
    marginTop: 10,
  },
  textButton: {
    color: 'white',
  },
})

FacebookSingIn.propTypes = {
  signIn: func.isRequired,
  disabled: bool,
}

FacebookSingIn.defaultProps = { disabled: false }
