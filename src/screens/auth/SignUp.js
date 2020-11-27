import React, { useState } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import {
  Text,
  Button,
  Input,
  Icon,
  Spinner,
  useStyleSheet,
  StyleService,
} from '@ui-kitten/components';
import { lightBlueMascotLogo } from '../../images';
import {
  AuthLayout,
  Avatar,
  FooterImages,
  OtherAccess,
} from '../../components/auth';
import { ShowSnackBar, SnackBarDismiss } from '../../components/SnackBar';
import emojis from '../../../emojis';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';

const SignUp = ({ navigation }) => {
  const { signUp } = useAuth();
  const styles = useStyleSheet(themedStyles);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const { user } = useTranslation();
  const toggleShowPassword = () => setSecureTextEntry(!secureTextEntry);

  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={toggleShowPassword}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const loadingSpinner = () => (
    <Spinner size="small" style={{ borderColor: 'white' }} />
  );

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const message = await signUp(name, email, password);
      if (message) {
        ShowSnackBar({
          message: `${emojis.sadFace} ${message}`,
          backgroundColor: 'rgba(96, 102, 175, 0.90)',
        });
      }
      setLoading(false);
    } catch (e) {
      console.error('There was an error trying to sign up: ', e.message);
    }
  };

  const handleNavigationToSignIn = () => {
    SnackBarDismiss();
    navigation.navigate('SignIn');
  };

  return (
    <AuthLayout>
      <Avatar avatar={lightBlueMascotLogo} />
      <View>
        <Text status="info" style={styles.crendencials}>
          {user.authentication.label.createAccount}
        </Text>
        <Input
          onChangeText={setName}
          autoCapitalize="none"
          value={name}
          placeholder={user.name}
          style={[styles.input, { marginBottom: 10 }]}
          size="large"
          accessibilityRole="text"
          keyboardAppearance="dark"
        />
        <Input
          onChangeText={setEmail}
          autoCapitalize="none"
          value={email}
          placeholder={user.placeholders.email}
          style={[styles.input, { marginBottom: 10 }]}
          size="large"
          accessibilityRole="text"
          textContentType="emailAddress"
          autoCompleteType="email"
          keyboardType="email-address"
          keyboardAppearance="dark"
        />
        <Input
          onChangeText={setPassword}
          autoCapitalize="none"
          value={password}
          placeholder={user.placeholders.password}
          style={[styles.input, { marginBottom: 10 }]}
          size="large"
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          accessibilityRole="text"
          textContentType="password"
          keyboardAppearance="dark"
          onSubmitEditing={handleSignUp}
        />
        <Button
          style={[styles.button, { marginTop: 10 }]}
          title={user.authentication.signUp}
          onPress={handleSignUp}>
          {loading ? loadingSpinner : user.authentication.signUp}
        </Button>
      </View>
      <View style={{ marginTop: 20 }}>
        <OtherAccess label={user.authentication.label.loginWith} />
        <Text
          onPress={handleNavigationToSignIn}
          status="info"
          style={styles.withUser}>
          {user.authentication.link.withAccount}
        </Text>
        <FooterImages />
      </View>
    </AuthLayout>
  );
};

export default SignUp;

const themedStyles = StyleService.create({
  input: {
    marginHorizontal: 50,
    borderRadius: 10,
  },
  button: {
    marginHorizontal: 50,
    marginBottom: 5,
    backgroundColor: 'color-button-100',
    borderRadius: 10,
  },
  crendencials: {
    marginBottom: 5,
    color: 'white',
    marginHorizontal: 50,
  },
  withUser: {
    marginHorizontal: 50,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5,
  },
});
