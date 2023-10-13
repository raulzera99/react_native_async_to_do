import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";
import HomeScreen from "../screens/HomeScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import SettingsScreen from "../screens/SettingsScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen";
import EditTaskScreen from "../screens/EditTaskScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: "blue",
      tabBarInactiveTintColor: "gray",
      tabBarVisible:
        route.name === "Login" || route.name === "Register" ? false : true,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = focused ? "ios-home" : "ios-home-outline";
        } else if (route.name === "Add Task") {
          iconName = focused ? "ios-add-circle" : "ios-add-circle-outline";
        } else if (route.name === "TaskDetails") {
          iconName = focused ? "ios-list" : "ios-list-outline";
        } else if (route.name === "Settings") {
          iconName = focused ? "ios-settings" : "ios-settings-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Add Task"
      component={AddTaskScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

const AppNavigator = (isAuthenticated) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? "MainTabs" : "Login"}>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
        <Stack.Screen name="EditTaskScreen" component={EditTaskScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
