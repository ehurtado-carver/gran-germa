import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, increment, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default class ChatRoomService {

    //ESCUCHAR MENSAJES
    public escucharMensajes = (roomId: string, callback: (mensajes: any[]) => void) => {
      const q = query(
        collection(db, "rooms", roomId, "messages"),
        orderBy("createdAt", "asc")
      );
    
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const mensajes: any[] = [];
        snapshot.forEach((doc) => {
          mensajes.push({ id: doc.id, ...doc.data() });
        });
        callback(mensajes);
      });
    
      return unsubscribe;
    };
    
    //ENVIAR MENSAJE
    public enviarMensaje = async (roomId: string, texto: string, uid: string, group: boolean) => {
      const roomRef = doc(db, "rooms", roomId);
      const roomSnap = await getDoc(roomRef);
    
      if (!roomSnap.exists()) return;
    
      const roomData = roomSnap.data();

      const qMyMessages = query(
        collection(db, "rooms", roomId, "messages"),
        where("createdBy", "==", uid)
      );
      const snapshotMyMessages = await getDocs(qMyMessages);

      if (!roomData.participants.includes(uid)) {
        await updateDoc(doc(db, "rooms", roomId), {
            participants: arrayUnion(uid)
        });
      }
    
      // Modificar estadisticas
      if (snapshotMyMessages.empty) {

        console.log(group);
        
        if (!group) {
          await updateDoc(doc(db, "users", uid), {
            personasEncontradas: increment(1)
          });
          if (!roomData.participants.includes(uid)) {
            await updateDoc(doc(db, "users", uid), {
              matches: increment(1)
            });
    
            const otherUserId = roomData.participants.find((u: string) => u !== uid);
    
            await updateDoc(doc(db, "users", otherUserId), {
              matches: increment(1)
            });
          }
        }
        else {
          await updateDoc(doc(db, "users", uid), {
            gruposEncontrados: increment(1)
          });
        }
      }
    
      await addDoc(collection(db, "rooms", roomId, "messages"), {
        text: texto,
        createdBy: uid,
        createdAt: serverTimestamp(),
      });
    };
}