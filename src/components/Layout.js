import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout as KittenLayout } from '@ui-kitten/components';

const Layout = ({ children }) => {
  return <KittenLayout style={styles.layout}>{children}</KittenLayout>;
};

export default Layout;

const styles = StyleSheet.create({
  layout: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
