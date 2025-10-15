import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import ChatRoom from "./src/screens/chat-room/chatRoom";
import ChatRoomPrivate from "./src/screens/chat-room/chatRoomPrivate";
import { GroupChats } from "./src/screens/groups-chats/groupChats";
import LoginScreen from "./src/screens/session/login";
import RegisterScreen from "./src/screens/session/register";
import UserProfile from "./src/screens/user-profile/userProfile";
import UserChats from "./src/screens/users-chats/userChats";
import { theme } from "./src/themeStyles";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        let backgroundColor = "#d3a074ff";
        let titleColor = theme.colors.input;

        if (route.name === "PROFILE") {
          backgroundColor = theme.colors.background;
          titleColor = theme.colors.input;
        }

        return {
          headerStyle: {
            backgroundColor: backgroundColor,
            borderColor: backgroundColor,
            borderWidth: 0,
            shadowColor: backgroundColor

          },
          headerTintColor: titleColor,
          tabBarStyle: {
            backgroundColor: theme.colors.input,
            borderTopColor: "transparent",
          },
          tabBarActiveTintColor: "#dd883eff",
          tabBarInactiveTintColor: "#2b2b2bff",
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "home";

            if (route.name === "USERS IN 500M") iconName = "chatbubble-outline";
            else if (route.name === "GROUPS IN 500M") iconName = "chatbubbles-outline";
            else if (route.name === "PROFILE") iconName = "person-circle-outline";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        };
      }}
    >
      <Tab.Screen name="USERS IN 500M" component={UserChats} />
      <Tab.Screen name="GROUPS IN 500M" component={GroupChats} />
      <Tab.Screen name="PROFILE" component={UserProfile} />
    </Tab.Navigator>
  );
}

export default function App() {
  
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* Pantallas de autenticación */}
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

          {/* Pantalla principal con tabs */}
          <Stack.Screen name="HomeTabs" component={Tabs} options={{ headerShown: false }} />

          {/* Pantalla de chat individual */}
          <Stack.Screen
            name="ChatRoom"
            component={ChatRoom}
            options={({ navigation }) => ({
              header: () => (
                <View
                  style={{
                    backgroundColor: "#404040",
                    borderBottomColor: "#404040",
                    borderBottomWidth: 0,
                    paddingTop: 50,
                    paddingBottom: 10,
                    paddingHorizontal: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={26} color="#FBF1E4" />
                  </TouchableOpacity>

                  <View style={{ width: 26 }} />
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="ChatRoomPrivate"
            component={ChatRoomPrivate}
            options={({ navigation }) => ({
              header: () => (
                <View
                  style={{
                    backgroundColor: "#404040",
                    borderBottomColor: "#404040",
                    borderBottomWidth: 0,
                    paddingTop: 50,
                    paddingBottom: 10,
                    paddingHorizontal: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={26} color="#FBF1E4" />
                  </TouchableOpacity>

                  <View style={{ width: 26 }} />
                </View>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
