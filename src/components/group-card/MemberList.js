import React from 'react';
import { Icon, List, ListItem } from '@ui-kitten/components';
// import ButtonAccesory from './ButtonAccessory';
import { StyleSheet } from 'react-native';
import faker from 'faker';
import { randomInt } from '../../utils/random';

const MemberList = () => {
  // fake data in each render, because backend request does not bring the members
  // data from the groups requests YET
  let members = [];
  const randomNumber = randomInt(10);
  for (let i = 0; i < randomNumber; i++) {
    members.push({ name: faker.name.findName() });
  }

  const renderItemIcon = props => (
    <Icon {...props} name="person" style={styles.memberIcon} />
  );

  const renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      accessoryLeft={renderItemIcon}
      // TODO: uncomment this when edit and or remove features are ready
      // accessoryRight={ButtonAccesory}
    />
  );

  return (
    <List style={styles.container} data={members} renderItem={renderItem} />
  );
};

export default MemberList;

const styles = StyleSheet.create({
  container: { maxHeight: 192 },
  memberIcon: {
    width: 27,
    height: 27,
    tintColor: '#000',
    marginHorizontal: 0,
  },
});
