// src/screens/RegisterScreen.tsx
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SessionService } from "./session.service";
import styles from "./sessionStyles";

export default function RegisterScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sessionService = new SessionService()

  const handleRegister = async () => {
    try {
      await sessionService.registrarUsuario(email, password, username);
      Alert.alert("Registro correcto", "Ahora puedes iniciar sesión");
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nombre de usuario" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Correo" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Registrarse" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.registerText}>Ya tengo cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}
