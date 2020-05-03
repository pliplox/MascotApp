import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const SignIn = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <View>
      <Text>Email:</Text>
      <TextInput onChangeText={setEmail} />
      <Text>Password:</Text>
      <TextInput onChangeText={setPassword} />
      <Button title="Sign In" onPress={() => signIn(email, password)} />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
