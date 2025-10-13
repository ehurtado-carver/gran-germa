import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ChatRoom from "./src/screens/chat-room/chatRoom";
import { groupChats } from "./src/screens/groups-chats/groupChats";
import LoginScreen from "./src/screens/session/login";
import RegisterScreen from "./src/screens/session/register";
import userProfile from "./src/screens/user-profile/userProfile";
import UserChats from "./src/screens/users-chats/userChats";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
  screenOptions={({ route }) => ({
    headerStyle: {
      backgroundColor: "#470275ff",
      borderWidth: 2,
    },
    headerTintColor: "#fff",
    tabBarStyle: {
      backgroundColor: "#182848",
      borderTopColor: "transparent",
    },
    tabBarActiveTintColor: "#fff",
    tabBarInactiveTintColor: "#aaa",
    tabBarIcon: ({ color, size }) => {
      let iconName: keyof typeof Ionicons.glyphMap = "home";

      if (route.name === "USERS IN 500M") iconName = "chatbubble-outline";
      else if (route.name === "GROUPS IN 500M") iconName = "chatbubbles-outline";
      else if (route.name === "PROFILE") iconName = "person-circle-outline";

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}
>
  <Tab.Screen name="USERS IN 500M" component={UserChats} />
  <Tab.Screen name="GROUPS IN 500M" component={groupChats} />
  <Tab.Screen name="PROFILE" component={userProfile} />
</Tab.Navigator>
  );
}

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Pantallas de autenticación */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

        {/* Pantalla principal con tabs */}
        <Stack.Screen name="HomeTabs" component={Tabs} options={{ headerShown: false }} />

        {/* Pantalla de chat individual */}
        <Stack.Screen name="ChatRoom" component={ChatRoom} options={{ title: "Chat" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
