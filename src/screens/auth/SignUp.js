import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';

const SignUp = () => {
  const { signUp,  errorMessage} = useAuth();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);  
  const { user } = useTranslation();

  const handleSignUp = async () => {
    await signUp(name, email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labels}>{user.name}</Text>
      <TextInput
        style={styles.inputs}
        placeholder="Min 6 char"
        onChangeText={setName}
      />
      <Text style={styles.labels}>{user.email}</Text>
      <TextInput
        style={styles.inputs}
        onChangeText={setEmail}
        placeholder={user.placeholders.email}
      />
      <Text style={styles.labels}>{user.password}</Text>
      <TextInput
        style={styles.inputs}
        onChangeText={setPassword}
        placeholder={user.placeholders.password}
      />
      <Button title={user.authentication.signUp} onPress={handleSignUp} />
      <Text style={styles.errorText}>{errorMessage}</Text>
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
  errorText: {
    marginBottom: 10,
    color: 'red'
  }
});
