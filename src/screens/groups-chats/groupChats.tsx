import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../firebaseConfig";
import useUbicacion from "../../hooks/useUbication";
import SharedService from "../shared-services/shared.services";
import GroupChatService from "./groupChat.service";
import styles from "./groupChatStyles";

type StackParamList = {
  HomeTabs: undefined;
  ChatRoom: { roomId: string, group: boolean };
};

type ChatsGruposProps = {
  navigation: NativeStackNavigationProp<StackParamList, "HomeTabs">;
};

export const groupChats = ({ navigation }: ChatsGruposProps) => {
  const [grupos, setGrupos] = useState<any[]>([]);
  const coords = useUbicacion();
  const groupChatService = new GroupChatService();
  const sharedService = new SharedService();

  useEffect(() => {
    if (coords) {
      (async () => {
        const data = await groupChatService.obtenerGruposCercanos(coords.lat, coords.lng);
        setGrupos(data);
      })();
    }
  }, [coords]);

  const handleCrearGrupo = async () => {
    if (!coords) return;
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const snap = await getDoc(doc(db, "users", uid));
    if (snap.exists()) {
      console.log(snap.data().gruposDisponibles);
      if (snap.data().gruposDisponibles == 0) return;}
      

    await sharedService.crearRoom(uid, coords.lat, coords.lng, 2, true, "");
    const data = await groupChatService.obtenerGruposCercanos(coords.lat, coords.lng);
    setGrupos(data);
  };

  const getUserById = async ({ item }: any) => {
    console.log(item);
    const snap = await getDoc(doc(db, "users", item.createdBy));
    if (snap.exists())
      return snap.data().displayName;
    return "Anonimo";
  }

  const getColorByDistance = (distancia: number) => {
    if (distancia < 50) return "#4CAF50";
    if (distancia < 100) return "#8BC34A";
    if (distancia < 200) return "#CDDC39";
    return "#ccc";
  };

  const renderItem = ({ item }: any) => {
    const tiempoRestante = item.expiresAt
    ? Math.max(0, Math.floor((item.expiresAt.toMillis() - Date.now()) / 1000))
    : 0;

    const horas = Math.floor(tiempoRestante / 3600);
    const minutos = Math.floor((tiempoRestante % 3600) / 60);

    const tiempoStr = tiempoRestante > 0
      ? `${horas > 0 ? horas + "h " : ""}${minutos}m`
      : "Expirado";
    
    return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: getColorByDistance(item.distancia), borderLeftWidth: 6 }]}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("ChatRoom", { roomId: item.id, group: true })}
    >
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Grupo en ~{Math.round(item.distancia)} m</Text>
        <Text style={styles.creator}>Creador: {item.createdByName}</Text>
        <Text style={styles.expire}>
          ⏱ {tiempoStr}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#007AFF" />
    </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {grupos.length === 0 ? (
        <View style={styles.emptyState}>
          <Text>No hay grupos cerca 😔</Text>
        </View>
      ) : (
        <FlatList
          data={grupos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={handleCrearGrupo}>
        <Text style={{ color: "#fff", fontSize: 28 }}>＋</Text>
      </TouchableOpacity>
    </View>
  );
};
