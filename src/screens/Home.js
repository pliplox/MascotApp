import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';
import mascotappi from '../api/mascotappi';

const Home = ({ navigation }) => {
  const { signOut } = useAuth();

  const [groups, setGroups] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [pet, setPet] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchGroups = async () => {
      try {
        const response = await mascotappi.get('family/groups');
        setGroups(response.data);
        if (response.data.length > 0) {
          const petsResponse = await mascotappi.get(
            `pets/${response?.data[0]?.id}`,
          );
          setPet(petsResponse?.data?.pets[0]);
        }
      } catch (errored) {
        console.log(errored);
        setError(errored);
      }
    };

    fetchGroups();
    setLoading(false);
  }, []);

  const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  return (
    <View>
      <Text>Pet info: </Text>
      {pet && (
        <>
          <Text>{`id: ${pet._id}, name: ${pet.name}, birthdate: ${pet.birthdate}`}</Text>
          <View style={styles.separator} />
          <Text>
            {capitalize(
              new Date().toLocaleString('es-CL', { weekday: 'long' }),
            )}
          </Text>
          {/* This should be replaced with checkbox or switches when the team settle
          the design library to use */}
          <Text>
            AM Checked:
            {pet.feds[0]?.currentDateTime
              ? pet.feds[0]?.currentDateTime
              : ' No'}
          </Text>
          <Text>
            PM Checked:
            {pet.feds[1]?.currentDateTime
              ? pet.feds[1]?.currentDateTime
              : ' No'}
          </Text>
        </>
      )}
      <View style={styles.separator} />
      <View style={styles.separator} />
      <View style={styles.separator} />
      <Button
        title="Go to groups"
        onPress={() => navigation.navigate('Groups')}
      />
      <View style={styles.separator} />
      {/* <Button title="Go to pets" onPress={navigation.navigate()} /> */}
      <View style={styles.separator} />
      <Button title="Sign Out" onPress={signOut} />
      <View style={styles.separator} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  separator: {
    padding: 5,
  },
});
