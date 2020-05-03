import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Text>Hello world from home screen component!</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
