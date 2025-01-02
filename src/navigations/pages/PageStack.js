import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import DetailBusiness from '../../pages/main/detail/DetailBusiness'
import InvestmentScreen from '../../pages/main/detail/InvestmentScreen'

const PageStack = createStackNavigator()

const PageNavigator = () => {
  return (
    <PageStack.Navigator>
      <PageStack.Screen
        name="Detail Business"
        component={DetailBusiness}
        options={{ headerShown: false }}
      />
      <PageStack.Screen
        name="Investment"
        component={InvestmentScreen}
        options={{ headerShown: false }}
      />
    </PageStack.Navigator>
  )
}

export default PageNavigator