import { Ionicons } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../firebaseConfig";
import SharedService from "../shared-services/shared.services";
import ChatRoomService from "./chatRoom.service";
import styles from "./chatRoomStyles";

interface ChatRoomProps {
  roomId: string;
}

interface UserData {
  name: string;
  image: string;
}

export default function ChatRoomPrivate({ route, navigation }: any) {
  const { roomId, userChat, distance } = route.params;
  const [mensajes, setMensajes] = useState<any[]>([]);
  const [texto, setTexto] = useState("");
  const [otherUser, setOtherUser] = useState<UserData>({name: "", image: ""});
  const flatListRef = useRef<FlatList>(null);
  const uid = auth.currentUser?.uid;

  const sharedService = new SharedService();
  const chatRoomService = new ChatRoomService();

  useEffect(() => {
    (async () => {
      const userRef = doc(db, "users", userChat);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) return;

      const user: UserData = {
        name: userSnap.data().displayName,
        image: userSnap.data().photoURL
      }
      setOtherUser(user);
    })();
  }, [roomId]);

  useEffect(() => {
    const unsub = chatRoomService.escucharMensajes(roomId, setMensajes);
    return () => unsub();
  }, [roomId]);

  const handleEnviar = async () => {
    if (texto.trim() === "") return;

    
    const currentUid = auth.currentUser?.uid;
    if (!currentUid) return;

    //crear sala privada
    const roomRef = doc(db, "rooms", roomId);
    const roomSnap = await getDoc(roomRef);

    if (!roomSnap.exists()) {
      sharedService.crearRoom(currentUid, null, null, 0, false, roomId, "")
    }

    await chatRoomService.enviarMensaje(roomId, texto, currentUid, false);
    setTexto("");
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const año = date.getFullYear();
    return `${dia}/${mes}/${año}`;
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
        {!esMio}
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
        <Text style={[{fontSize: 8, color: "#404040"}, esMio ? { alignSelf: "flex-end" } : { alignSelf: "flex-start" }]}>
            {formatDate(item.createdAt)}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#FBF1E4" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      
    >
      <View style={{backgroundColor: "#404040", borderWidth: 0, borderColor: "#404040", flexDirection: "row", alignItems: "center", padding: 10}}>
        <View style={ styles.avatarContainer }>
          <Image
            source={{ uri: otherUser.image || "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />
        </View>
        <Text style={{fontSize: 20, fontWeight: "bold", color: "#FCAF6B", flex: 1}}>{otherUser.name}</Text>
        <Image
          source={require("../../../assets/medio-logo-izq.jpeg")}
          style={{ width: 16, height: 21, marginRight: 5 }}
        />
        <Text style={{ color: "#FBF1E4" }}>~{Math.round(distance)} m</Text>
      </View>
      <View style={{ flex: 1 }}>
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
            placeholder="Write a message..."
            placeholderTextColor={"#FBF1E4"}
          />
          <TouchableOpacity style={styles.boton} onPress={handleEnviar}>
            <Ionicons name="chevron-forward" size={20} color="#FBF1E4"/>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}