import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import mascotappi from '../../api/mascotappi';

const Groups = ({ navigation }) => {
  const [groups, setGroups] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchGroups = async () => {
      try {
        const response = await mascotappi.get('family/groups');
        setGroups(response.data);
      } catch (errored) {
        console.log(errored);
        setError(errored);
      }
    };

    fetchGroups();
    setLoading(false);
  }, []);

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
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
            <Text>{groups[0]?.name}</Text>
          )}
        </>
      )}
    </View>
  );
};

export default Groups;

const styles = StyleSheet.create({});
