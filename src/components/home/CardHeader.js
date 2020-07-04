import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';

const CardHeader = ({ name, birthdate }) => (
  <View style={styles.header}>
    <Text>
      {`${name}, birthdate: ${moment.utc(birthdate).format('DD/MM/YYYY')}`}
    </Text>
  </View>
);

export default CardHeader;

const styles = StyleSheet.create({
  header: { padding: 15 },
});
