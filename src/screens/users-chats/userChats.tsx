import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebaseConfig";
import { useUsuariosCerca } from "../../hooks/useUsuariosCerca";
import styles from "./userChatsStyles";

export default function UserChats({ navigation }: any) {
  const usuarios = useUsuariosCerca(500);

  const getColorByDistance = (distancia: number) => {
    if (distancia < 50) return "#95e798ff";
    if (distancia < 100) return "#f3a0a0ff";
    if (distancia < 200) return "#ecea70ff";
    return "#ccc";
  };


  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: getColorByDistance(item.distancia), borderLeftWidth: 6 }]}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("ChatRoom", {
          roomId: generarRoomId(item.id),
          peerId: item.id,
          group: false,
        })
      }
    >
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: item.photoURL || "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.displayName || "Anónimo"}</Text>
        <Text style={styles.distance}>📍 A ~{Math.round(item.distancia)} m</Text>
      </View>

      <View style={styles.iconContainer}>
        <Ionicons name="chevron-forward" size={20} color="#fdfdfdff" />
      </View>
    </TouchableOpacity>
  );

  return (
      <View style={styles.container}>
        {usuarios.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No hay usuarios cerca 😔</Text>
          </View>
        ) : (
          <FlatList
            data={usuarios}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
  );
}

function generarRoomId(peerId: string) {
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  return uid < peerId ? `${uid}_${peerId}` : `${peerId}_${uid}`;
}
