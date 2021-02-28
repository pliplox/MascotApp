import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Icon, Text, Spinner } from '@ui-kitten/components'
import { useTranslation } from '../../../context/LanguageContext'
import { func, bool } from 'prop-types'

const FacebookIcon = props => <Icon {...props} name="facebook" />

const FacebookSingIn = ({ signIn, disabled, loading }) => {
  const { user } = useTranslation()

  const loadingSpinner = () => (
    <Spinner size="small" style={{ borderColor: 'white' }} />
  )

  return (
    <Button
      onPress={signIn}
      style={styles.button}
      accessoryLeft={loading ? loadingSpinner : FacebookIcon}
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
  loading: bool,
}

FacebookSingIn.defaultProps = { disabled: false, loading: false }
