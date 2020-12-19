import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useStyleSheet, StyleService } from '@ui-kitten/components';
import { ScrollView } from 'react-native';

const COLOR = {
  veryDarkViolet: '#390350',
  darkViolet: '#3a0252',
  violet: '#52007c',
};

const AuthLayout = ({ children }) => {
  const styles = useStyleSheet(themedStyles);
  const { veryDarkViolet, darkViolet, violet } = COLOR
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={[
          veryDarkViolet,
          darkViolet,
          violet,
          darkViolet,
          veryDarkViolet,
        ]}>
        {children}
      </LinearGradient>
    </ScrollView>
  );
};

export default AuthLayout;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'color-primary-600',
  },
});
