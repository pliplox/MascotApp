import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';
import mascotappi from '../api/mascotappi';
import Layout from '../components/Layout';
import { Text, Card, Toggle } from '@ui-kitten/components';
import moment from 'moment';

const Home = ({ navigation }) => {
  const { signOut } = useAuth();

  const [groups, setGroups] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [pet, setPet] = useState(null);

  const [amChecked, setAmChecked] = useState(false);
  const [pmChecked, setPmChecked] = useState(false);

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

  const CardHeader = () => (
    <>
      <Text>Pet info:</Text>
      {pet && (
        <Text>{`id: ${pet._id}, name: ${pet.name}, birthdate: ${moment
          .utc(pet.birthdate)
          .format('DD/MM/YYYY')}`}</Text>
      )}
    </>
  );
  return (
    <Layout>
      <Card header={CardHeader}>
        {pet && (
          <>
            <Text>
              {capitalize(
                new Date().toLocaleString('es-CL', { weekday: 'long' }),
              )}
            </Text>
            <Text>
              AM Checked:
              {pet.feds[0]?.currentDateTime
                ? pet.feds[0]?.currentDateTime
                : ' No'}
            </Text>
            <Toggle
              checked={amChecked}
              onChange={() => setAmChecked(!amChecked)}
            />
            <Text>
              PM Checked:
              {pet.feds[1]?.currentDateTime
                ? pet.feds[1]?.currentDateTime
                : ' No'}
            </Text>
            <Toggle
              checked={pmChecked}
              onChange={() => setPmChecked(!pmChecked)}
            />
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
      </Card>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  separator: {
    padding: 5,
  },
});
