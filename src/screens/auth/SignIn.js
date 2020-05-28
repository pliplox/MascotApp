import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text, Button, Divider, Input, Icon } from '@ui-kitten/components';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';

const SignIn = ({ navigation }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleShowPassword = () => setSecureTextEntry(!secureTextEntry);

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleShowPassword}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout>
      <Text category="h6">Email:</Text>
      <Input
        onChangeText={setEmail}
        autoCapitalize="none"
        value={email}
        placeholder="example@mail.com"
        style={styles.input}
      />
      <Text category="h6">Password:</Text>
      <Input
        onChangeText={setPassword}
        autoCapitalize="none"
        value={password}
        placeholder="Enter your password here"
        style={styles.input}
        accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
      />
      <Button onPress={() => signIn(email, password)}>Sign In</Button>
      <Divider />
      <Button onPress={() => navigation.navigate('SignUp')}>
        Go to Sign Up
      </Button>
    </Layout>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 50,
    marginVertical: 15,
  },
});
