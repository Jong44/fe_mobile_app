import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "../../pages/onboarding/OnboardingScreen";

const OnboardingStack = createStackNavigator();

const OnboardingNavigator = () => {
  return (
    <OnboardingStack.Navigator>
      <OnboardingStack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
    </OnboardingStack.Navigator>
  );
};

export default OnboardingNavigator;
