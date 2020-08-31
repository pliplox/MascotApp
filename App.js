import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ResetPassword, SignIn, SignOut, SignUp } from './src/screens/auth';
import Home from './src/screens/Home';
import Splash from './src/screens/Splash';
import { CreateFamilyGroup, GroupList } from './src/screens/groups';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './custom-theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { LanguageProvider } from './src/context/LanguageContext';
import { MaterialIconsPack, FeatherIconsPack } from './icons';
import useIsSignedIn from './src/utils/useIsSignedIn';

const Stack = createStackNavigator();

const App = () => {
  const { loadingUser } = useAuth();
  const [isSignedIn] = useIsSignedIn();

  if (loadingUser) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Groups" component={GroupList} />
            <Stack.Screen
              name="CreateGroup"
              component={CreateFamilyGroup}></Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              component={SignIn}
              name="SignIn"
              options={{
                animationTypeForReplace: isSignedIn ? 'push' : 'pop',
              }}
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
  <LanguageProvider>
    <AuthProvider>
      <IconRegistry
        icons={[EvaIconsPack, FeatherIconsPack, MaterialIconsPack]}
      />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <App />
      </ApplicationProvider>
    </AuthProvider>
  </LanguageProvider>
);
