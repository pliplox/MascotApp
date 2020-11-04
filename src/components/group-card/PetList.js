import React from 'react';
import { List, ListItem } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import faker from 'faker';
import { randomInt } from '../../utils/random';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PetList = () => {
  // fake data in each render, because backend request does not bring the members
  // data from the groups requests YET
  let pets = [];
  const randomNumber = randomInt(1, 5);
  for (let i = 0; i < randomNumber; i++) {
    pets.push({ name: faker.name.firstName() });
  }
  const renderItemIcon = () => <Icon name="pets" size={25} />;

  const renderItem = ({ item }) => (
    <ListItem title={item.name} accessoryLeft={renderItemIcon} />
  );

  return <List style={styles.container} data={pets} renderItem={renderItem} />;
};

export default PetList;

const styles = StyleSheet.create({
  container: { maxHeight: 192 },
});
