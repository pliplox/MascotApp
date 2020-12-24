import React from 'react';
import Gradient from '../Gradient';
import { useStyleSheet, StyleService } from '@ui-kitten/components';
import { ScrollView } from 'react-native';

const AuthLayout = ({ children }) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <ScrollView style={styles.container}>
      <Gradient>{children}</Gradient>
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
