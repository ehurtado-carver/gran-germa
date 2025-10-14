import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Button, Dialog, Divider, Portal, TextInput } from 'react-native-paper';
import { auth, db } from "../../firebaseConfig";
import useUbicacion from "../../hooks/useUbication";
import SharedService from "../shared-services/shared.services";
import GroupChatService from "./groupChat.service";
import styles from "./groupChatStyles";

type StackParamList = {
  HomeTabs: undefined;
  ChatRoom: { roomId: string, distance: string, name: string, time: string };
};

type ChatsGruposProps = {
  navigation: NativeStackNavigationProp<StackParamList, "HomeTabs">;
};

export const GroupChats = ({ navigation }: ChatsGruposProps) => {
  const [grupos, setGrupos] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [groupName, setGroupName] = useState("Group");
  const coords = useUbicacion();
  const groupChatService = new GroupChatService();
  const sharedService = new SharedService();

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    if (coords) {
      (async () => {
        const data = await groupChatService.obtenerGruposCercanos(coords.lat, coords.lng);
        setGrupos(data);
      })();
    }
  }, [coords]);

  const handleConfirmGroup = async () => {
    if (!groupName.trim()) return;

    const uid = auth.currentUser?.uid;
    if (!uid || !coords) return;

    const snap = await getDoc(doc(db, "users", uid));
    if (snap.exists() && snap.data().gruposDisponibles === 0) {
      hideDialog();
      return;
    }

    await sharedService.crearRoom(uid, coords.lat, coords.lng, 2, true, "", groupName);
    const data = await groupChatService.obtenerGruposCercanos(coords.lat, coords.lng);
    setGrupos(data);

    setGroupName("");
    hideDialog();
  };

  const handleCrearGrupo = async () => {
    showDialog();
  };

  const getBorderColorByAuthor = (createdBy: string) => {
    const uid = auth.currentUser?.uid;
    if (createdBy == uid) return "#68b36b94";
    else return "#ffba3acb"
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

    const progressTime = tiempoRestante
      ? 100 - (tiempoRestante / (2 * 60 * 60)) * 100
      : 100;

    const progressDistance = Math.min(100, Math.max(0, (1 - item.distancia / 500) * 100));
    
    return (
      <View>
        <TouchableOpacity
          style={[styles.card, { borderColor: getBorderColorByAuthor(item.createdBy) }]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("ChatRoom", { roomId: item.id, distance: item.distancia, name: item.groupName, time: tiempoStr })}
        >
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{item.groupName}</Text>
            <View style={{flexDirection: "row"}}>
              <Text style={styles.creator}>Creator:</Text>
              <Text style={styles.creatorName}>{item.createdByName}</Text>
            </View>
          </View>
          <View style={styles.timerContainer}>
            <AnimatedCircularProgress
              size={50}
              width={5}
              fill={progressDistance}
              tintColor="#FCAF6B"
              backgroundColor="#404040"
            >
              {() => (
                <Text style={styles.timerText}>
                  ~{Math.round(item.distancia)} m
                </Text>
              )}
            </AnimatedCircularProgress>
          </View>
          <View style={styles.timerContainer}>
            <AnimatedCircularProgress
              size={50}
              width={5}
              fill={progressTime}
              tintColor="#FCAF6B"
              backgroundColor="#404040"
            >
              {() => (
                <Text style={styles.timerText}>
                  {tiempoStr}
                </Text>
              )}
            </AnimatedCircularProgress>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#404040" />
        </TouchableOpacity>
        <Divider bold style={{ marginVertical: 5, backgroundColor: "#FBF1E4" }}/>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {grupos.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No groups near 😔</Text>
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
        <Text style={{ color: "#FBF1E4", fontSize: 30, fontWeight: "bold" }}>＋</Text>
      </TouchableOpacity>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{backgroundColor: "#FBF1E4"}}>
          <Dialog.Title style={{color: "#404040"}}>Create group</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Group name"
              value={groupName}
              onChangeText={setGroupName}
              mode="flat"
              style={{backgroundColor: "white"}}
              activeUnderlineColor="#404040"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button textColor="#404040" onPress={hideDialog}>Cancel</Button>
            <Button textColor="#404040" onPress={handleConfirmGroup}>Create</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
