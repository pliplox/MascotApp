import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const SignUp = () => {
  const { signUp, signIn } = useAuth();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    const response = await signUp(name, email, password);
    if (response?.status === 201) {
      signIn(email, password);
    } else {
      setError(response);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labels}>Name:</Text>
      <TextInput
        style={styles.inputs}
        placeholder="Min 6 char"
        onChangeText={setName}
      />
      <Text style={styles.labels}>Email:</Text>
      <TextInput
        style={styles.inputs}
        onChangeText={setEmail}
        placeholder="email@sample.com"
      />
      <Text style={styles.labels}>Password:</Text>
      <TextInput
        style={styles.inputs}
        onChangeText={setPassword}
        placeholder="Password"
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      {error && <Text style={styles.labels}>{error}</Text>}
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  labels: {
    marginLeft: 5,
    marginBottom: 1,
  },
  inputs: {
    borderWidth: 1,
    margin: 5,
  },
});
