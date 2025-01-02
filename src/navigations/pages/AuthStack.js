import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../../pages/auth/LoginScreen'
import RegisterScreen from '../../pages/auth/RegisterScreen'

const AuthStack = createStackNavigator()


const AuthNavigator = () => {
  return (
    <AuthStack.Navigator 
      initialRouteName="Login"
    >
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  )
}

export default AuthNavigator