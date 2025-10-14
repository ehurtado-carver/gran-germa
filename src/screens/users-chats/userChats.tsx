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
    if (distancia < 100) return "#ecea70ff";
    if (distancia < 200) return "#f3a0a0ff";
    return "#ccc";
  };


  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("ChatRoomPrivate", {
          roomId: generarRoomId(item.id),
          userChat: item.id,
          distance: item.distancia,
          peerId: item.id,
        })
      }
    >
      <View style={[styles.avatarContainer, {borderColor: getColorByDistance(item.distancia)}]}>
        <Image
          source={{ uri: item.photoURL || "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.displayName || "Anónimo"}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
          <Image
            source={require("../../../assets/medio-logo-izq.jpeg")}
            style={{ width: 16, height: 21, marginRight: 5 }}
          />
          <Text style={styles.distance}>~{Math.round(item.distancia)} m</Text>
        </View>
      </View>

      <View style={styles.iconContainer}>
        <Ionicons name="chevron-forward" size={20} color="#FBF1E4" />
      </View>
    </TouchableOpacity>
  );

  return (
      <View style={styles.container}>
        {usuarios.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No users near 😔</Text>
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
