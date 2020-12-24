import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
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
  //  TODO: temorary commented, as it is not implemented yet, remove comment when facebook access is ready
  // OtherAccess,
} from '../../components/auth';
import { ShowSnackBar, dismissSnackBar } from '../../components/SnackBar';
import emojis from '../../../emojis';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin'
import GoogleButton from './google/GoogleSignIn'

const SignIn = ({ navigation }) => {
  const { signIn, signInGoogle } = useAuth();
  const styles = useStyleSheet(themedStyles);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const { user } = useTranslation();
  const showPasswordIcon = () => setSecureTextEntry(!secureTextEntry);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '473036889467-niatcbo3v3bucf442gsfg2qle2dfhca5.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    })
  }, [])

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      await signInGoogle(userInfo.idToken)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.error(error)
      }
    }
  }

  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={showPasswordIcon}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const loadingSpinner = () => (
    <Spinner size="small" style={{ borderColor: 'white' }} />
  );

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const message = await signIn(email, password);
      if (message) {
        ShowSnackBar({
          message: `${emojis.sadFace} ${message}`,
          backgroundColor: 'rgba(96, 102, 175, 0.90)',
        });
      }
      setLoading(false);
    } catch (e) {
      console.error('There was an error trying to sign in: ', e.message);
    }
  };

  const handleNavigationToSignUp = () => {
    dismissSnackBar();
    navigation.navigate('SignUp');
  };

  return (
    <AuthLayout>
      <Avatar img={lightBlueMascotLogo} />
      <View>
        <Text status="info" style={styles.crendencials}>
          {user.authentication.label.account}
        </Text>
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
        <Text status="info" style={styles.forgetPassword}>
          {user.authentication.link.forgetPassword}
        </Text>
        <Button onPress={handleSignIn} style={styles.button}>
          {loading ? loadingSpinner : user.authentication.signIn}
        </Button>
        <GoogleButton
          signIn={handleGoogleSignIn}
          moreStyles={styles.googleButton}
          disabled={loading}
        />
      </View>
      {/* TODO: temorary commented, as it is not implemented yet, remove comment when facebook access is ready */}
      {/* <OtherAccess /> */}
      <Text
        onPress={handleNavigationToSignUp}
        status="info"
        style={styles.noUser}>
        {user.authentication.link.withoutAccount}
      </Text>
      <FooterImages />
    </AuthLayout>
  );
};

export default SignIn;

const themedStyles = StyleService.create({
  input: {
    marginHorizontal: 50,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    marginHorizontal: 50,
    marginBottom: 5,
    backgroundColor: 'color-button-100',
    borderRadius: 10,
    marginTop: 10,
  },
  googleButton: {
    marginTop: 15,
    marginLeft: 50,
  },
  crendencials: {
    marginBottom: 5,
    color: 'white',
    marginHorizontal: 50,
  },
  forgetPassword: {
    marginHorizontal: 50,
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'right',
  },
  noUser: {
    marginHorizontal: 50,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5,
  },
});
