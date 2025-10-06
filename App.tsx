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
    <Tab.Navigator>
      <Tab.Screen name="Usuarios" component={UserChats} />
      <Tab.Screen name="Grupos" component={groupChats} />
      <Tab.Screen name="Perfil" component={userProfile} />
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
