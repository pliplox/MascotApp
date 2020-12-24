import React from 'react'
import {
  StyleService,
  useStyleSheet,
  Icon,
  Button,
} from '@ui-kitten/components'

const OtherAccess = ({ ...props }) => {
  const styles = useStyleSheet(themedStyles)

  const FacebookIcon = facebookIconProps => (
    <Icon {...facebookIconProps} name="facebook" />
  )

  return (
    <Button
      accessoryLeft={FacebookIcon}
      style={styles.btnOtherAcces}
      {...props}>
      Facebook
    </Button>
  )
}

const themedStyles = StyleService.create({
  btnOtherAcces: {
    backgroundColor: 'color-button-100',
    borderRadius: 10,
    alignItems: 'center',
    width: 290,
    marginLeft: 50,
    marginTop: 3,
  },
})

export default OtherAccess
