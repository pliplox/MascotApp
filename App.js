/* eslint-disable react/prop-types */
import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthProvider, useAuth } from './src/context/AuthContext'
import { useTranslation } from './src/context/LanguageContext'
import { ResetPassword, SignIn, SignUp } from './src/screens/auth'
// TODO: this must change to fed when feature has been implemented...
// and evaluate if should stay here
// import { Fed } from './src/screens/fed'
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
const GroupStackScreen = ({ titles }) => (
  <GroupStack.Navigator>
    <GroupStack.Screen
      name="Groups"
      component={GroupList}
      options={{
        title: titles.groupListTitle,
        headerTitleStyle: { fontFamily: FONT_FAMILY, fontSize: SIZE },
      }}
    />
    <GroupStack.Screen
      name="CreateGroup"
      component={CreateFamilyGroup}
      options={{
        title: titles.createGroupTitle,
        headerTitleStyle: { fontFamily: FONT_FAMILY, fontSize: SIZE },
      }}
    />
  </GroupStack.Navigator>
)

const PetStack = createStackNavigator()
const PetsStackScreen = ({ titles }) => (
  <PetStack.Navigator>
    <PetStack.Screen
      name="Pets"
      component={Pets}
      options={{
        title: titles.petListTitle,
        headerTitleStyle: { fontFamily: FONT_FAMILY, fontSize: SIZE },
      }}
    />
    <PetStack.Screen
      name="CreatePet"
      component={CreatePet}
      options={{
        title: titles.addPetTitle,
        headerTitleStyle: { fontFamily: FONT_FAMILY, fontSize: SIZE },
      }}
    />
  </PetStack.Navigator>
)

const ProfileStack = createStackNavigator()
const ProfileStackScreen = ({ titles }) => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      options={{
        title: titles.title,
        headerTitleStyle: { fontFamily: FONT_FAMILY, fontSize: SIZE },
      }}
    />
  </ProfileStack.Navigator>
)

const Tab = createBottomTabNavigator()
const Tabs = ({ groupTitles, petTitles, profileTitles }) => (
  <Tab.Navigator
    tabBarOptions={{
      labelStyle: { fontSize: 18 },
      activeTintColor: 'purple',
      inactiveTintColor: 'gray',
      showLabel: false,
    }}>
    <Tab.Screen
      name="Groups"
      children={() => <GroupStackScreen titles={groupTitles} />}
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
      children={() => <PetsStackScreen titles={petTitles} />}
      options={{
        tabBarTestID: 'pet-tab-button',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="paw" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      children={() => <ProfileStackScreen titles={profileTitles} />}
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
  const { groupList, createGroup, pet, profile } = useTranslation()

  const groupTitles = {
    groupListTitle: groupList.title,
    createGroupTitle: createGroup.title,
  }

  const petTitles = {
    addPetTitle: pet.createPet.title,
    petListTitle: pet.petList.title,
  }

  if (loadingUser) {
    return <Splash />
  }

  return (
    <NavigationContainer>
      {userToken ? (
        <Tabs
          groupTitles={groupTitles}
          petTitles={petTitles}
          profileTitles={profile}
        />
      ) : (
        <AuthScreen />
      )}
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
