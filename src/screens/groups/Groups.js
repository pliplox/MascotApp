import React from 'react';
import { Text, View, Button } from 'react-native';
import mascotappi from '../../api/mascotappi';
import useSWR from 'swr';

const fetchGroups = async () => {
  const response = await mascotappi.get('family/groups');
  return response.data;
};

const Groups = ({ navigation }) => {
  const { data: groups, error: groupError } = useSWR('family/groups', () =>
    fetchGroups(),
  );

  if (!groups) {
    return <Text>...loading</Text>;
  }

  if (groupError) {
    return (
      <>
        <Text>There was an error trying to get the groups.</Text>
        <Text>{groupError}</Text>
      </>
    );
  }

  return (
    <View>
      <>
        {/* TODO: map the array groups to show all the groups as list
          maybe with some redirecting route if the user is admin */}
        {groups?.length === 0 ? (
          <>
            <Text>
              There is no groups, you might want to create one pressing the
              button below
            </Text>
            <Button
              title="Go to create Group"
              onPress={() => navigation.navigate('CreateGroup')}
            />
          </>
        ) : (
          groups.map(group => <Text key={group.id}>{group.name}</Text>)
        )}
      </>
    </View>
  );
};

export default Groups;
