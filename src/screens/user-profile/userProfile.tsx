import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { doc, onSnapshot, updateDoc, } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { auth, db } from "../../firebaseConfig";
import styles from "./userProfileStyles";


const IMG_BB_API_KEY = "5fbc55d7808939e808df8477c8eaefb4";

export default function UserProfile({ navigation }: any) {
  const [userData, setUserData] = useState<any>(null);
  const [tiempoRestante, setTiempoRestante] = useState<number>(0);

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;

    const unsub = onSnapshot(doc(db, "users", uid), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setUserData(data);

        if (data.lastGroupCreatedAt && data.gruposDisponibles === 0) {
          const last = data.lastGroupCreatedAt.toDate();
          const now = new Date();
          const diff = 24 * 60 * 60 * 1000 - (now.getTime() - last.getTime());
          const remaining = Math.max(diff, 0);
          setTiempoRestante(remaining);

          if (remaining <= 0) {
            const userRef = doc(db, "users", uid);
            updateDoc(userRef, { gruposDisponibles: 1, lastGroupCreatedAt: null });
          }
        } else {
          setTiempoRestante(0);
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
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const imageUrl = response.data.data.url;

      if (uid) {
        await updateDoc(doc(db, "users", uid), { photoURL: imageUrl });
        setUserData({ ...userData, photoURL: imageUrl });
      }

      Alert.alert("¡Éxito!", "Tu foto de perfil se ha actualizado.");
    } catch (error) {
      console.error("Error al cambiar imagen:", error);
      Alert.alert("Error", "No se pudo actualizar la foto. Intenta de nuevo.");
    }
  };

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  // Cálculo del progreso circular
  const progress = tiempoRestante
    ? 100 - (tiempoRestante / (24 * 60 * 60 * 1000)) * 100
    : 100;

  const horas = Math.floor(tiempoRestante / (1000 * 60 * 60));
  const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <ScrollView style={styles.container}>
      {/* Sección 1: Perfil e info */}
      <View style={styles.topSection}>
        <View style={styles.leftSection}>
          <Pressable onPress={handleChangeImage}>
            <Image
              source={{ uri: userData.photoURL || "https://i.pravatar.cc/150" }}
              style={styles.avatar}
            />
          </Pressable>
        <Text style={styles.username}>{userData.displayName || "Usuario"}</Text>
      </View>

      {/* DERECHA */}
      <View style={styles.rightSection}>

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
          <Image
            source={require("../../../assets/medio-logo-izq.jpeg")}
            style={{ width: 16, height: 21, marginRight: 5 }}
          />
          <Text style={styles.infoText}>Age</Text>
        </View>
        <Text style={styles.infoTextResult}>24</Text>

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
          <Image
            source={require("../../../assets/medio-logo-izq.jpeg")}
            style={{ width: 16, height: 21, marginRight: 5 }}
          />
          <Text style={styles.infoText}>City</Text>
        </View>
        <Text style={styles.infoTextResult}>Badalona, Barcelona</Text>

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
          <Image
            source={require("../../../assets/medio-logo-izq.jpeg")}
            style={{ width: 16, height: 21, marginRight: 5 }}
          />
          <Text style={styles.infoText}>Est</Text>
        </View>
        <Text style={styles.infoTextResult}>13/10/2025</Text>
      </View>
    </View>

      {/* Sección 2: Estadísticas */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userData.personasEncontradas || 0}</Text>
          <Text style={styles.statLabel}>Users found</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userData.matches || 0}</Text>
          <Text style={styles.statLabel}>Matches</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userData.gruposEncontrados || 0}</Text>
          <Text style={styles.statLabel}>Groups</Text>
        </View>
      </View>

      {/* Sección 3: Grupos y contador */}
      <View style={styles.bottomSection}>
        <Text style={styles.groupLabel}>GROUPS</Text>
        <View style={styles.groupCircle}>
          <Text style={styles.groupCount}>{userData.gruposDisponibles}</Text>
          
        </View>

        <View style={styles.timerContainer}>
          <AnimatedCircularProgress
            size={100}
            width={8}
            fill={progress}
            tintColor="#ffffffff"
            backgroundColor="#404040"
          >
            {() => (
              <Text style={styles.timerText}>
                {tiempoRestante > 0 ? `${horas}h ${minutos}m` : "✔️"}
              </Text>
            )}
          </AnimatedCircularProgress>
        </View>
      </View>

      {/* Logout */}
      <View style={styles.logoutContainer}>
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
          <Text style={styles.logoutButtonText}>Log out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
