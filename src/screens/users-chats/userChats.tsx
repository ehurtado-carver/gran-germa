// src/screens/UserChats.tsx
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebaseConfig";
import { useUsuariosCerca } from "../../hooks/useUsuariosCerca";

export default function UserChats({ navigation }: any) {
  const usuarios = useUsuariosCerca(100);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
            onPress={() =>
              navigation.navigate("ChatRoom", {
                roomId: generarRoomId(item.id),
                peerId: item.id,
                group: false
              })
            }
          >
            <Text style={{ fontWeight: "bold" }}>
              {item.displayName || "Anonimo"}
            </Text>
            <Text>A ~{Math.round(item.distancia)} m</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function generarRoomId(peerId: string) {
  const uid = auth.currentUser?.uid;
  if (uid == undefined) return;
  return uid < peerId ? `${uid}_${peerId}` : `${peerId}_${uid}`;
}
