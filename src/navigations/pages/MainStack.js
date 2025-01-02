import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import HomeScreen from '../../pages/main/HomeScreen'
import ProfileScreen from '../../pages/main/ProfileScreen'
import FaIcon from 'react-native-vector-icons/FontAwesome'

const MainTab = createBottomTabNavigator()

const MainNavigator = () => {
    return (
        <MainTab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                BottomTabBar: ({ color, size }) => {
                    let iconName
                    if (route.name === 'Home') {
                        iconName = 'home'
                    } else if (route.name === 'Profile') {
                        iconName = 'user'
                    }
                    return <FaIcon name={iconName} size={size} color={color} />
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <MainTab.Screen name="Home" component={HomeScreen} />
            <MainTab.Screen name="Profile" component={ProfileScreen} />
        </MainTab.Navigator>
    )
}

export default MainNavigator