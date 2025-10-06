// src/screens/LoginScreen.tsx
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SessionService } from "./session.service";
import styles from "./sessionStyles";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sessionService = new SessionService()

  const handleLogin = async () => {
    try {
      await sessionService.loginUsuario(email, password);
      navigation.replace("HomeTabs");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />

      {/* Botón de registro */}
      <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.registerButton}>
        <Text style={styles.registerText}>¿No tienes cuenta? Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}
