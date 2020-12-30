/* eslint-disable react/prop-types */
import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthProvider, useAuth } from './src/context/AuthContext'
import { ResetPassword, SignIn, SignUp } from './src/screens/auth'
// TODO: this must change to fed when feature has been implemented...
// and evaluate if should stay here
// import Home from './src/screens/Home'
import Splash from './src/screens/Splash'
import { CreateFamilyGroup, GroupList } from './src/screens/groups'
import { Profile } from './src/screens/user'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { default as theme } from './custom-theme.json'
import { default as mapping } from './mapping.json'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { LanguageProvider } from './src/context/LanguageContext'
import { MaterialIconsPack, FeatherIconsPack } from './icons'
import { CreatePet, Pets } from './src/screens/pets'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
const SIZE = mapping.strict['text-font-size-nav']
const FONT_FAMILY = mapping.strict['text-font-family']

const AuthStack = createStackNavigator()
const AuthScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      component={SignIn}
      name="SignIn"
      options={{ headerShown: false }}
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
    <GroupStack.Screen
      name="Groups"
      component={GroupList}
      options={{
        headerTitleStyle: { fontFamily: FONT_FAMILY, fontSize: SIZE },
      }}
    />
    <GroupStack.Screen name="CreateGroup" component={CreateFamilyGroup} />
  </GroupStack.Navigator>
)

const PetStack = createStackNavigator()
const PetsStackScreen = () => (
  <PetStack.Navigator>
    <PetStack.Screen
      name="Pets"
      component={Pets}
      options={{
        headerTitleStyle: { fontFamily: FONT_FAMILY, fontSize: SIZE },
      }}
    />
    <PetStack.Screen
      name="CreatePet"
      component={CreatePet}
      options={{
        title: 'Add Pet',
        headerTitleStyle: { fontFamily: FONT_FAMILY, fontSize: SIZE },
      }}
    />
  </PetStack.Navigator>
)

const ProfileStack = createStackNavigator()
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerTitleStyle: { fontFamily: FONT_FAMILY, fontSize: SIZE },
      }}
    />
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
      name="Profile"
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

  return (
    <NavigationContainer>
      {userToken ? <Tabs /> : <AuthScreen />}
    </NavigationContainer>
  )
}

export default () => (
  <LanguageProvider>
    <AuthProvider>
      <IconRegistry
        icons={[EvaIconsPack, FeatherIconsPack, MaterialIconsPack]}
      />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...theme }}
        customMapping={mapping}>
        <App />
      </ApplicationProvider>
    </AuthProvider>
  </LanguageProvider>
)
