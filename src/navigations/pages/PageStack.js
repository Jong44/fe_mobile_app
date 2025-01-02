import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import DetailBusiness from '../../pages/main/detail/DetailBusiness'

const PageStack = createStackNavigator()

const PageNavigator = () => {
  return (
    <PageStack.Navigator>
      <PageStack.Screen
        name="Detail Business"
        component={DetailBusiness}
        options={{ headerShown: false }}
      />
    </PageStack.Navigator>
  )
}

export default PageNavigator