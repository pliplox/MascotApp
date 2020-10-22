import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text, Button, Divider, Input, Icon } from '@ui-kitten/components';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';

const SignIn = ({ navigation }) => {
  const { signIn, errorMessage,setErrorMessage} = useAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { user } = useTranslation();

  const toggleShowPassword = () => setSecureTextEntry(!secureTextEntry);

  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={toggleShowPassword}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const handleSignIn = async () => {
    try {
     await signIn(email, password);
    

      // signIn(email, password);
    } catch (e) {
      console.error('There was an error trying to sign in: ', e.message);
    }
  };

  const handleNavigationToSignup = () => {
    setErrorMessage('')
    navigation.navigate('SignUp')
  }
  return (
    <Layout>
      <Text category="h6">{user.email}</Text>
      <Input
        onChangeText={setEmail}
        autoCapitalize="none"
        value={email}
        placeholder={user.placeholders.email}
        style={styles.input}
        size="large"
        accessibilityRole="text"
        textContentType="emailAddress"
        autoCompleteType="email"
        keyboardType="email-address"
        keyboardAppearance="dark"
      />
      <Text category="h6">{user.password}</Text>
      <Input
        onChangeText={setPassword}
        autoCapitalize="none"
        value={password}
        placeholder={user.placeholders.password}
        style={styles.input}
        size="large"
        accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
        accessibilityRole="text"
        textContentType="password"
        keyboardAppearance="dark"
        onSubmitEditing={handleSignIn}
      />
      <Text style={styles.text} status='danger'>{errorMessage}</Text>
      <Button onPress={handleSignIn}>{user.authentication.signIn}</Button>
      <Divider />
      <Button onPress={handleNavigationToSignup}>
        {user.authentication.signUp}
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
  text: {
    marginBottom: 10
  }
});
