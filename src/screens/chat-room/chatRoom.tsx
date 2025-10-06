import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../firebaseConfig";
import SharedService from "../shared-services/shared.services";
import ChatRoomService from "./chatRoom.service";
import styles from "./chatRoomStyles";

interface ChatRoomProps {
  roomId: string;
}

export default function ChatRoom({ route, navigation }: any) {
  const { roomId, group } = route.params;
  const [mensajes, setMensajes] = useState<any[]>([]);
  const [texto, setTexto] = useState("");
  const flatListRef = useRef<FlatList>(null);
  const uid = auth.currentUser?.uid;

  const sharedService = new SharedService();
  const chatRoomService = new ChatRoomService();

  useEffect(() => {
    const unsub = chatRoomService.escucharMensajes(roomId, setMensajes);
    return () => unsub();
  }, [roomId]);

  const handleEnviar = async () => {
    if (texto.trim() === "") return;

    
    const currentUid = auth.currentUser?.uid;
    if (!currentUid) return;

    //crear sala privada
    if (!group) {
      const roomRef = doc(db, "rooms", roomId);
      const roomSnap = await getDoc(roomRef);

      if (!roomSnap.exists()) {
        sharedService.crearRoom(currentUid, null, null, 0, false, roomId)
      }
    }

    await chatRoomService.enviarMensaje(roomId, texto, currentUid, group);
    setTexto("");
};

    const renderItem = ({ item }: { item: any }) => {
    const esMio = item.createdBy === uid;

    return (
      <View
        style={[
          styles.mensajeWrapper,
          esMio ? { alignSelf: "flex-end" } : { alignSelf: "flex-start" },
        ]}
      >
        {!esMio && (
          <Text style={styles.nombreUsuario}>
            {item.createdBy?.substring(0, 6) || "Usuario"}
          </Text>
        )}
        <View
          style={[
            styles.mensajeContainer,
            esMio ? styles.mensajeDerecha : styles.mensajeIzquierda,
          ]}
        >
          <Text style={[styles.mensajeText, esMio && styles.mensajeTextMio]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          data={mensajes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 10 }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={texto}
            onChangeText={setTexto}
            placeholder="Escribe un mensaje..."
          />
          <TouchableOpacity style={styles.boton} onPress={handleEnviar}>
            <Text style={{ color: "#fff" }}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}