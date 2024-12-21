import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SplashScreen from './src/screens/Splashscreen'
import Dashboard from './src/screens/Dashboard'
import History from './src/screens/History'
import Detail from './src/screens/Detail';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='SplashScreen' component={SplashScreen} />
        <Stack.Screen name='Dashboard' component={Dashboard} />
        <Stack.Screen name='History' component={History} />
        <Stack.Screen name='Detail' component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App