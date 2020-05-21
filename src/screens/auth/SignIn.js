import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const SignIn = ({ navigation }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <View>
      <Text>Email:</Text>
      <TextInput onChangeText={setEmail} autoCapitalize="none" />
      <Text>Password:</Text>
      <TextInput onChangeText={setPassword} autoCapitalize="none" />
      <Button title="Sign In" onPress={() => signIn(email, password)} />
      <View style={styles.separator} />
      <Button
        title="Go to Sign Up"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  separator: {
    margin: 5,
  },
});
