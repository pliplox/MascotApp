import React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import mascotappi from '../../api/mascotappi';
import useSWR from 'swr';
import { Spinner, Button, Icon, List, ListItem } from '@ui-kitten/components';
import { useTranslation } from '../../context/LanguageContext';
import { randomInt } from '../../utils/random';

const fetchGroups = async () => {
  const response = await mascotappi.get('family/groups');
  return response.data;
};

const Groups = ({ navigation }) => {
  const { data: groupsData, error: groupError } = useSWR('family/groups', () =>
    fetchGroups(),
  );
  const { group, placeholders } = useTranslation();

  if (!groupsData) {
    return (
      <View style={styles.loadingContainer}>
        <Spinner size="large" />
        <Text>{placeholders.loadingDots}</Text>
      </View>
    );
  }

  if (groupError) {
    return (
      <>
        <Text>There was an error trying to get the groups.</Text>
        <Text>{groupError}</Text>
      </>
    );
  }

  const renderItemAccessory = () => <Button size="small">DETAIL</Button>;

  const renderItemIcon = props => <Icon {...props} name="person" />;

  const renderItem = ({ item }) => (
    <ListItem
      title={`${item.name}`}
      description={`Miembros: ${randomInt(10)} Mascotas: ${randomInt(10)}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
      style={styles.listItem}
    />
  );

  const Listita = () => {
    return (
      <List
        style={styles.listContainer}
        data={groupsData}
        renderItem={renderItem}
      />
    );
  };

  return (
    <View>
      {/* TODO: map the array groups to show all the groups as list
          maybe with some redirecting route if the user is admin */}
      {groupsData?.length === 0 ? (
        <>
          <Text>
            There is no groups, you might want to create one pressing the button
            below
          </Text>
          <Button onPress={() => navigation.navigate('CreateGroup')}>
            Go to create Group
          </Button>
        </>
      ) : (
        <Listita />
      )}
    </View>
  );
};

export default Groups;

const styles = StyleSheet.create({
  listContainer: { maxHeight: 192 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listItem: { borderWidth: 1, borderColor: 'red', height: 120 },
});
