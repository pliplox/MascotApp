import React from 'react'
import { AuthProvider } from '../context/AuthContext'
import { LanguageProvider } from '../context/LanguageContext'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { render } from '@testing-library/react-native'
import * as eva from '@eva-design/eva'
import { default as theme } from '../../custom-theme.json'
import { default as mapping } from '../../mapping.json'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { MaterialIconsPack, FeatherIconsPack } from '../../icons'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { node, shape, string } from 'prop-types'

export const renderWithProviders = ({ ...children }) =>
  render(
    <LanguageProvider>
      <AuthProvider>
        <IconRegistry
          icons={[EvaIconsPack, FeatherIconsPack, MaterialIconsPack]}
        />
        <ApplicationProvider
          {...eva}
          theme={{ ...eva.light, ...theme }}
          customMapping={mapping}>
          {children}
        </ApplicationProvider>
      </AuthProvider>
    </LanguageProvider>,
  )

const Stack = createStackNavigator()
export const MockedNavigator = ({ component, params, name }) => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name={name}
        component={component}
        initialParams={params}></Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
)

MockedNavigator.propTypes = {
  component: node.isRequired,
  params: shape({}),
  name: string,
}
MockedNavigator.defaultProps = { params: {}, name: 'MockedScreen' }
