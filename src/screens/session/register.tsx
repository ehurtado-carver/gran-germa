import React, { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import cder from "../../../assets/medio-logo-der.jpeg";
import cIzq from "../../../assets/medio-logo-izq.jpeg";
import { SessionService } from "./session.service";
import styles from "./sessionStyles";

export default function RegisterScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const sessionService = new SessionService();

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
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      enableOnAndroid={true}
    >
      <View style={styles.container}>
        <View style={styles.headRegister}>
          <Image
            source={cIzq}
            style={{ width: 25, height: 35, marginRight: 25 }}
          />
          <Text style={styles.titleRegister}>SIGN UP</Text>
          <Image
            source={cder}
            style={{ width: 25, height: 35, marginLeft: 25 }}
          />
        </View>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.registerText}>I already have an account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
