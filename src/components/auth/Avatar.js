import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { oneOfType, number, string, object } from 'prop-types'

const Avatar = ({ style, img }) => {
  return <Image testID="logo-png" source={img} style={style || styles.avatar} />
}

const styles = StyleSheet.create({
  avatar: {
    width: 115,
    height: 100,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
})

Avatar.propTypes = {
  style: object,
  img: oneOfType([number, string]).isRequired,
}

Avatar.defaultProps = { style: null }

export default Avatar
