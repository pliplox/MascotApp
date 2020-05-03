import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ResetPassword, SignIn, SignOut, SignUp } from './src/screens/auth';
import Home from './src/screens/Home';
import Splash from './src/screens/Splash';

const Stack = createStackNavigator();

const App = () => {
  const { loadingUser, user } = useAuth();

  if (loadingUser) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <>
            <Stack.Screen
              component={SignIn}
              name="SignIn"
              options={{ animationTypeForReplace: user ? 'push' : 'pop' }}
            />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SignOut" component={SignOut} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
