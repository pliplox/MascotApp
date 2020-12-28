/* eslint-disable react/prop-types */
import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthProvider, useAuth } from './src/context/AuthContext'
import { ResetPassword, SignIn, SignOut, SignUp } from './src/screens/auth'
import Home from './src/screens/Home'
import Splash from './src/screens/Splash'
import { CreateFamilyGroup, GroupList } from './src/screens/groups'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { default as theme } from './custom-theme.json'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { LanguageProvider } from './src/context/LanguageContext'
import { MaterialIconsPack, FeatherIconsPack } from './icons'
import { CreatePet } from './src/screens/pets'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const AuthStack = createStackNavigator()
const AuthScreen = ({ userToken }) => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      component={SignIn}
      name="SignIn"
      options={{
        animationTypeForReplace: userToken ? 'push' : 'pop',
        headerShown: false,
      }}
    />
    <AuthStack.Screen
      name="SignUp"
      component={SignUp}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
  </AuthStack.Navigator>
)

const GroupStack = createStackNavigator()
const GroupStackScreen = () => (
  <GroupStack.Navigator>
    <GroupStack.Screen name="Groups" component={GroupList} />
    <GroupStack.Screen name="CreateGroup" component={CreateFamilyGroup} />
  </GroupStack.Navigator>
)

const PetStack = createStackNavigator()
const PetsStackScreen = () => (
  <PetStack.Navigator>
    <PetStack.Screen name="Pets" component={Home} />
    <PetStack.Screen
      name="CreatePet"
      component={CreatePet}
      options={{ title: 'Add Pet' }}
    />
  </PetStack.Navigator>
)

const ProfileStack = createStackNavigator()
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={SignOut} />
  </ProfileStack.Navigator>
)

const Tab = createBottomTabNavigator()
const Tabs = () => (
  <Tab.Navigator
    tabBarOptions={{
      labelStyle: { fontSize: 18 },
      activeTintColor: 'purple',
      inactiveTintColor: 'gray',
      showLabel: false,
    }}>
    <Tab.Screen
      name="Groups"
      component={GroupStackScreen}
      options={{
        tabBarTestID: 'group-tab-button',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="account-group"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Pets"
      component={PetsStackScreen}
      options={{
        tabBarTestID: 'pet-tab-button',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="paw" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="SignOut"
      component={ProfileStackScreen}
      options={{
        tabBarTestID: 'profile-tab-button',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="user-circle" solid color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
)

const App = () => {
  const { loadingUser, userToken } = useAuth()

  if (loadingUser) {
    return <Splash />
  }

  console.log('USER TOKEN', userToken)
  return (
    <NavigationContainer>
      {userToken ? <Tabs /> : <AuthScreen userToken={userToken} />}
    </NavigationContainer>
  )
}

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
)
