import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Divider } from '@ui-kitten/components';
import GroupHeader from './GroupHeader';
import MemberList from './MemberList';
import PetList from './PetList';
import { string } from 'prop-types';

const GroupCard = ({ name }) => (
  <Card header={() => <GroupHeader name={name} />} style={styles.container}>
    <Text category="h3">Members</Text>
    <MemberList />
    <Divider style={styles.divider} />
    <Text category="h3">Pets</Text>
    <PetList />
  </Card>
);

export default GroupCard;

const styles = StyleSheet.create({
  container: { margin: 15 },
  divider: { height: 2 },
});

GroupCard.defaultProps = {
  name: 'Undefined',
};

GroupCard.propTypes = {
  name: string,
};
