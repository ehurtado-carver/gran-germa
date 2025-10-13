import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { doc, onSnapshot, updateDoc, } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { auth, db } from "../../firebaseConfig";
import styles from "./userProfileStyles";

const IMG_BB_API_KEY = "5fbc55d7808939e808df8477c8eaefb4";

export default function userProfile({ navigation }: any) {
  const [userData, setUserData] = useState<any>(null);
  const [tiempoRestante, setTiempoRestante] = useState<string>("");

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;

    const unsub = onSnapshot(doc(db, "users", uid), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setUserData(data);

        // Calcular tiempo restante si no tiene grupo disponible
        if (data.lastGroupCreatedAt && data.gruposDisponibles === 0) {
          const last = data.lastGroupCreatedAt.toDate();
          const now = new Date();
          const diff = 24 * 60 * 60 * 1000 - (now.getTime() - last.getTime());

          if (diff > 0) {
            const horas = Math.floor(diff / (1000 * 60 * 60));
            const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            setTiempoRestante(`${horas}h ${minutos}m`);
          } else {
            setTiempoRestante("");
            data.gruposDisponibles = 1;
            const userRef = doc(db, "users", uid);
            updateDoc(userRef, { gruposDisponibles: 1, lastGroupCreatedAt: null });
            setUserData(data);
          }
        } else {
          setTiempoRestante("");
        }
      }
    });

    return () => unsub();
  }, [uid]);

  const handleChangeImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      if (result.canceled || !result.assets[0].base64) return;

      const base64Image = result.assets[0].base64;

      const formData = new FormData();
      formData.append("image", base64Image);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMG_BB_API_KEY}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const imageUrl = response.data.data.url;

      if (uid) {
        await updateDoc(doc(db, "users", uid), { photoURL: imageUrl });
        setUserData({ ...userData, photoURL: imageUrl });
      }

      Alert.alert("¡Éxito!", "Tu foto de perfil se ha actualizado.");
    } catch (error) {
      console.error("Error al cambiar imagen:", error);
      Alert.alert("Error", "No se pudo actualizar la foto. Intenta de nuevo.");//as
    }
  };


  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}
      showsVerticalScrollIndicator={false}
      bounces={true}>
        <View style={{ alignItems: "center" }}>
          <Pressable onPress={handleChangeImage}>
            <Image
              source={{ uri: userData.photoURL || "https://i.pravatar.cc/150" }}
              style={styles.avatar}
            />
          </Pressable>

          <Text style={styles.username}>{userData.displayName || "Usuario"}</Text>
        </View>

          {/* Estadísticas */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Grupos</Text>
            <Text style={styles.statValue}>
              {userData.gruposDisponibles}
            </Text>
            {userData.gruposDisponibles === 0 && (
              <Text style={styles.counterText}>{tiempoRestante}</Text>
            )}
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Personas encontradas</Text>
            <Text style={styles.statValue}>{userData.personasEncontradas || 0}</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Matches</Text>
            <Text style={styles.statValue}>{userData.matches || 0}</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Grupos encontrados</Text>
            <Text style={styles.statValue}>{userData.gruposEncontrados || 0}</Text>
          </View>
        </View>
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <Pressable
            style={styles.logoutButton}
            onPress={async () => {
              try {
                await auth.signOut();
                navigation.replace("Login");
              } catch (error) {
                Alert.alert("Error", "No se pudo cerrar sesión");
              }
            }}
          >
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
