import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import AuthNavigator from './pages/AuthStack';
import OnboardingNavigator from './pages/OnboardingStack';
import MainNavigator from './pages/MainStack';
import { getUserData } from '../services/storage/UserStorage';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import PageNavigator from './pages/PageStack';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const [isLoading, setIsLoading] = useState(true); 
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData(); // Pastikan getUserData mengembalikan data
        if (data?.userId) {
          setIsLogin(true); // Update login status jika data ditemukan
        }
      } catch (error) {
        console.error('Error fetching user data:', error); // Menangani error
      } finally {
        setIsLoading(false); // Pastikan isLoading diatur menjadi false
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    // Render loading spinner jika masih memuat
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <RootStack.Navigator
      initialRouteName={isLogin ? 'MainStack' : 'OnboardingStack'} // Tentukan initial route
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen name="Auth" component={AuthNavigator} />
      <RootStack.Screen name="OnboardingStack" component={OnboardingNavigator} />
      <RootStack.Screen name="MainStack" component={MainNavigator} />
      <RootStack.Screen name="PagesStack" component={PageNavigator} />
    </RootStack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RootNavigator;
