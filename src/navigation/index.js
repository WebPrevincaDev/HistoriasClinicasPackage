import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import ConfirmEmail from '../screens/ConfirmEmail'
import ForgotPassword from '../screens/ForgotPassword'
import NewPassword from '../screens/NewPassword'
import Home from '../screens/Home'
import Signature from '../screens/Signature';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='SignIn' component={SignIn} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='ConfirmEmail' component={ConfirmEmail} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        <Stack.Screen name='NewPassword' component={NewPassword} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Signature' component={Signature} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;