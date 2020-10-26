import React from "react";
import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import LoginScreen from "./app/screens/LoginScreen";
import { AllState } from "./app/store";
import { useSelector } from "react-redux";
import AppListScreen from "./app/screens/AppListScreen";
import { LogBox } from "react-native";
import AppScreen from "./app/screens/AppScreen";
import GridStatsScreen from "./app/screens/GridStatsScreen";
import EventDetailsScreen from "./app/screens/EventDetailsScreen";

LogBox.ignoreLogs(["Require cycle", "VirtualizedLists should never"]);
enableScreens();
const Stack = createNativeStackNavigator();

const App = () => {
  const logged = useSelector((state: AllState) => state.user.logged);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {logged ? (
          <>
            <Stack.Screen name="AppList" component={AppListScreen} />
            <Stack.Screen name="App" component={AppScreen} />
            <Stack.Screen name="GridStats" component={GridStatsScreen} />
            <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
