import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { lightBlueMascotLogo } from '../images/';
import LinearGradient from 'react-native-linear-gradient';

const COLOR = {
  veryDarkViolet: '#390350',
  darkViolet: '#3a0252',
  violet: '#52007c',
};

const Splash = () => {
  const { veryDarkViolet, darkViolet, violet } = COLOR;
  return (
    <LinearGradient
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      colors={[veryDarkViolet, darkViolet, violet, darkViolet, veryDarkViolet]}
      style={styles.container}>
      <Image testID="splash-logo-png" style={styles.image} source={lightBlueMascotLogo} />
    </LinearGradient>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: 115, height: 100, margin: 100 },
});
