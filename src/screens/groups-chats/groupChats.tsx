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
    if (snap.exists())
      if (snap.data().gruposDisponibles == 0) return;

    await sharedService.crearRoom(uid, coords.lat, coords.lng, 2, true, ""); // 2h de duración
    const data = await groupChatService.obtenerGruposCercanos(coords.lat, coords.lng);
    setGrupos(data);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={grupos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate("ChatRoom", { roomId: item.id, group: true })}>
            <Text style={styles.chatTitle}>Grupo en {Math.round(item.distancia)}m</Text>
            <Text style={styles.chatSubtitle}>
              Creador: {item.createdBy?.substring(0, 6)}...
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No hay grupos cerca
          </Text>
        }
      />

      <TouchableOpacity style={styles.fab} onPress={handleCrearGrupo}>
        <Text style={{ color: "#fff", fontSize: 24 }}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}
