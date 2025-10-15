import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import ImageViewing from "react-native-image-viewing";
import c from "../../../assets/logo.jpeg";
import { db } from "../../firebaseConfig";
import styles from "./userProfileStyles";


const IMG_BB_API_KEY = "5fbc55d7808939e808df8477c8eaefb4";

export default function OtherUserProfile({ route, navigation }: any) {
  const { uid } = route.params;
  const [userData, setUserData] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!uid) return;

    const unsub = onSnapshot(doc(db, "users", uid), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setUserData(data);
      }
    });

    return () => unsub();
  }, [uid]);

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  const handleShowImage = async () => {
    setVisible(true);
  }

  const calculteYears = (date: any) => {
    if (!date) return null;
    const birthDate = date.seconds ? new Date(date.seconds * 1000) : date;
    const hoy = new Date();
    let edad = hoy.getFullYear() - birthDate.getFullYear();
    const mes = hoy.getMonth() - birthDate.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < birthDate.getDate())) edad--;
    return edad;
};

  return (
    <ScrollView style={styles.container}>
      {/* Sección 1: Perfil e info */}
      <View style={styles.topSection}>
        <View  style={styles.leftSection}>
          <Pressable onPress={handleShowImage}>
            <Image
              source={{ uri: userData.photoURL || "https://i.pravatar.cc/150" }}
              style={styles.avatar}
            />
            <ImageViewing
              images={[{ uri: userData.photoURL }]}
              imageIndex={0}
              visible={visible}
              onRequestClose={() => setVisible(false)}
            />
          </Pressable>
        </View>
          
        <View style={styles.rightSection}>
          <Text style={styles.username}>{userData.displayName}</Text>
          <Text style={styles.infoText}>{userData.email}</Text>
          <Text style={styles.infoText}>{userData.name ?? ""}</Text>
          <Text style={styles.infoText}>{calculteYears(userData.birthDate)} years</Text>
        </View>
          
      </View>

      {/* Sección 2: Estadísticas */}
      <View style={styles.statsColumn}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>USERS FOUND</Text>
          <Text style={styles.statNumber}>{userData.personasEncontradas || 0}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>MATCHES</Text>
          <Text style={styles.statNumber}>{userData.matches || 0}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>GROUPS FOUND</Text>
          <Text style={styles.statNumber}>{userData.gruposEncontrados || 0}</Text>
        </View>
      </View>

      <View style={{ alignItems: "center", marginTop: 50 }}>
          <Image
          source={c}
          style={{ width: 250, height: 145 }}
        />
        </View>
    </ScrollView>
  );
}
