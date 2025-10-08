import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { auth, db } from "../../firebaseConfig";
import styles from "./userProfileStyles";

export default function userProfile() {
  const [userData, setUserData] = useState<any>(null);
  const [tiempoRestante, setTiempoRestante] = useState<string>("");

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    const fetchData = async () => {
      if (!uid) return;
      const snap = await getDoc(doc(db, "users", uid));
      if (snap.exists()) {
        const data = snap.data();
        setUserData(data);

        // Calcular tiempo restante si no tiene grupo disponible
        if (data.lastGroupCreatedAt && data.gruposDisponibles == 0) {
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
            setUserData(data);
          }
        }
      }
    };

    fetchData();
  }, [uid]);

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Imagen del usuario */}
      <Image
        source={{ uri: userData.photoURL || "https://i.pravatar.cc/150" }}
        style={styles.avatar}
      />

      {/* Nombre de usuario */}
      <Text style={styles.username}>{userData.displayName || "Usuario"}</Text>

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
    </View>
  );
}
