import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReportsScreen from './screens/ReportsScreen';       // New Week 4 Screen
import ApiIntegrationScreen from './screens/ApiIntegrationScreen'; // New Week 5 Screen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Create Account' }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Student Portal' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Profile' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
        <Stack.Screen name="Reports" component={ReportsScreen} options={{ title: 'Reports Control Panel' }} />
        <Stack.Screen name="ApiIntegration" component={ApiIntegrationScreen} options={{ title: 'API Live Terminal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}