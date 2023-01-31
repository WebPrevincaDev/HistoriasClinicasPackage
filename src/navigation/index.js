import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../screens/SingIn'
import SignUp from '../screens/SingUp'
import ConfirmEmail from '../screens/ConfirmEmail'
import ForgotPassword from '../screens/ForgotPassword'
import NewPassword from '../screens/NewPassword'

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
      </Stack.Navigator>
    </NavigationContainer>
  )
}
//https://www.youtube.com/watch?v=_Fi86az2OV4 32'
export default Navigation;