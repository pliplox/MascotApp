import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  View,
  ScrollView,
} from 'react-native';
import { Text, Button, Input, Icon, Spinner } from '@ui-kitten/components';
import { logoMascotaCeleste, casita, patitas } from '../../images';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import Snackbar from 'react-native-snackbar';

const SignIn = ({ navigation }) => {
  const { signIn } = useAuth();
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

  const googleIcon = props => <Icon {...props} name="google" />;
  const facebookIcon = props => <Icon {...props} name="facebook" />;
  const loadingSpinner = () => (
    <Spinner size="small" style={{ borderColor: 'white' }} />
  );

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const message = await signIn(email, password);
      if (message) {
        ShowSnackBar(`\u{1F625} ${message}`);
      }
      setLoading(false);
    } catch (e) {
      console.error('There was an error trying to sign in: ', e.message);
    }
  };

  const handleNavigationToSignUp = () => {
    Snackbar.dismiss();
    navigation.navigate('SignUp');
  };

  const ShowSnackBar = message => {
    Snackbar.show({
      text: `${message}`,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: 'rgba(94,102,174, 0.90)',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={['#390350', '#3a0252', '#52007c', '#3a0252', '#390350']}>
        <View>
          <Image
            testID="logo-png"
            source={logoMascotaCeleste}
            style={styles.avatar}
          />
        </View>
        <View>
          <Text status="info" style={styles.crendencials}>
            {user.authentication.label.account}
          </Text>
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
          <Button
            onPress={handleSignIn}
            style={[styles.button, { marginTop: 10 }]}>
            {loading ? loadingSpinner : user.authentication.signIn}
          </Button>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text status="info" style={styles.others}>
            {user.authentication.label.loginWith}
          </Text>
          <View
            style={{
              marginHorizontal: 50,
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <View style={{ flex: 1 }}>
              <Button
                accessoryLeft={googleIcon}
                style={[styles.otherAcces, { marginEnd: 5 }]}>
                Google
              </Button>
            </View>
            <View style={{ flex: 1 }}>
              <Button
                accessoryLeft={facebookIcon}
                style={[styles.otherAcces, { marginStart: 5 }]}>
                Facebook
              </Button>
            </View>
          </View>
          <Text
            onPress={handleNavigationToSignUp}
            status="info"
            style={styles.noUser}>
            {user.authentication.link.withoutAccount}
          </Text>
          <Image testID="casita-png" source={casita} style={styles.casita} />
          <Image testID="patitas-png" source={patitas} style={styles.patitas} />
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#390350',
  },
  input: {
    marginHorizontal: 50,
    borderRadius: 10,
  },
  button: {
    marginHorizontal: 50,
    marginBottom: 5,
    backgroundColor: '#6066af',
    borderRadius: 10,
  },
  otherAcces: {
    backgroundColor: '#6066af',
    borderRadius: 10,
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
  others: {
    marginBottom: 5,
    color: 'white',
    marginHorizontal: 50,
  },
  noUser: {
    marginHorizontal: 50,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5,
  },
  casita: {
    width: 85,
    height: 80,
    resizeMode: 'stretch',
    marginTop: 10,
    alignSelf: 'center',
  },
  patitas: {
    width: 130,
    height: 50,
    resizeMode: 'stretch',
    marginBottom: 10,
    marginHorizontal: 30,
  },
  avatar: {
    width: 115,
    height: 100,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
});
