import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Avatar = props => {
  const {
    style,
    avatar,
  } = props;

  return (
    <>
      <Image
        testID="logo-png"
        source={avatar}
        style={style || styles.avatar}
      />
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 115,
    height: 100,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
});

export default Avatar;
