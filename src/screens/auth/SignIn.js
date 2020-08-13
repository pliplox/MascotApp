import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text, Button, Divider, Input, Icon } from '@ui-kitten/components';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';

const SignIn = ({ navigation }) => {
  const { signIn } = useAuth();
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

  return (
    <Layout>
      <Text category="h6">{user.email}</Text>
      <Input
        onChangeText={setEmail}
        autoCapitalize="none"
        value={email}
        placeholder={user.placeholders.email}
        style={styles.input}
        accessibilityRole="text"
        textContentType="emailAddress"
        autoCompleteType="email"
        keyboardType="email-address"
      />
      <Text category="h6">{user.password}</Text>
      <Input
        onChangeText={setPassword}
        autoCapitalize="none"
        value={password}
        placeholder={user.placeholders.password}
        style={styles.input}
        accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
        accessibilityRole="text"
        textContentType="password"
        keyboardAppearance="dark"
        onSubmitEditing={() => signIn(email, password)}
      />
      <Button onPress={() => signIn(email, password)}>
        {user.authentication.signIn}
      </Button>
      <Divider />
      <Button onPress={() => navigation.navigate('SignUp')}>
        {user.authentication.signUp}
      </Button>
      <Divider />
      <Text category="h6">{process.env.MOBILE_NODE_ENV}</Text>
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
