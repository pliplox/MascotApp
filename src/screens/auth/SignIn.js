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

const SignIn = ({ navigation }) => {
  const { signIn, errorMessage, setErrorMessage } = useAuth();
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
  const loadingSpinner = props => (
    <Spinner size="small" style={{ borderColor: 'white' }} />
  );
  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signIn(email, password);
      setLoading(false);
    } catch (e) {
      console.error('There was an error trying to sign in: ', e.message);
    }
  };

  const handleNavigationToSignUp = () => {
    setErrorMessage('');
    navigation.navigate('SignUp');
  };

  return (
    <LinearGradient
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      colors={['#390350', '#3a0252', '#52007c', '#3a0252', '#390350']}
      style={styles.container}>
      <ScrollView>
        <View>
          <Image source={logoMascotaCeleste} style={styles.avatar} />
        </View>
        <View>
          <Text status="info" style={styles.crendencials}>
            Cuenta
          </Text>
          <Input
            onChangeText={setEmail}
            autoCapitalize="none"
            value={email}
            placeholder={user.placeholders.email}
            style={[styles.input, { marginBottom: 10 }]}
            size="medium"
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
            size="medium"
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            accessibilityRole="text"
            textContentType="password"
            keyboardAppearance="dark"
            onSubmitEditing={handleSignIn}
          />
          <Text status="info" style={styles.forgetPassword}>
            Olvidaste tu contraseña?
          </Text>
          <Button
            onPress={handleSignIn}
            style={[styles.button, { marginTop: 10 }]}>
            {loading ? loadingSpinner : user.authentication.signIn}
          </Button>
          <Text
            status="danger"
            style={{ marginBottom: 40, marginHorizontal: 50, fontSize: 16 }}>
            {errorMessage}
          </Text>
        </View>
        <View>
          <Text status="info" style={styles.others}>
            Ingresar con
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
                onPress={handleNavigationToSignUp}
                style={[styles.button2, { marginEnd: 5 }]}>
                Google
              </Button>
            </View>
            <View style={{ flex: 1 }}>
              <Button
                accessoryLeft={facebookIcon}
                onPress={handleNavigationToSignUp}
                style={[styles.button2, { marginStart: 5 }]}>
                Facebook
              </Button>
            </View>
          </View>
          <Text status="info" style={styles.noUser}>
            No tienes una cuenta?
          </Text>
          <Image source={casita} style={styles.casita} />
          <Image source={patitas} style={styles.patitas} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
  button2: {
    backgroundColor: '#6066af',
    borderRadius: 10,
  },
  text: {
    marginBottom: 5,
    marginHorizontal: 50,
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
    textAlign: 'right',
    marginTop: 10,
  },
  casita: {
    width: 85,
    height: 80,
    resizeMode: 'stretch',
    marginTop: 30,
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
