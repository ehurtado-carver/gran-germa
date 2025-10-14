import React, { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import c from "../../../assets/logo.jpeg";
import { SessionService } from "./session.service";
import styles from "./sessionStyles";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const sessionService = new SessionService();

  const handleLogin = async () => {
    try {
      const login = await sessionService.loginUsuario(email, password);
      if (login) navigation.replace("HomeTabs");
      else alert("Por favor verifica tu correo antes de iniciar sesión");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      enableOnAndroid={true}
    >
      <View style={styles.container}>
        <Text style={styles.title}>GRAN GERMA</Text>
        <View style={{ alignItems: "center" }}>
          <Image
          source={c}
          style={{ width: 250, height: 145 }}
        />
        </View>
        <View style={{ marginTop: 120 }}>
          <TextInput
            placeholder="write your email..."
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={"#404040a1"}
          />
          <TextInput
            placeholder="write your password..."
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor={"#404040a1"}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={styles.registerButton}
          >
          <Text style={styles.registerText}>¿Don't have an account? Sign up</Text>
        </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
