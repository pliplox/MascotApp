import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ResetPassword, SignIn, SignOut, SignUp } from './src/screens/auth';
import Home from './src/screens/Home';
import Splash from './src/screens/Splash';
import { CreateFamilyGroup, Groups } from './src/screens/groups';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './custom-theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

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
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Groups" component={Groups} />
            <Stack.Screen
              name="CreateGroup"
              component={CreateFamilyGroup}></Stack.Screen>
          </>
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
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <App />
    </ApplicationProvider>
  </AuthProvider>
);
