import { collection, doc, getDoc, serverTimestamp, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default class SharedService {

    //CREAR UNA SALA
    public crearRoom = async (uid: string, lat: number|null, lng: number|null, horas = 2, isGroup: boolean, roomId: string, groupName: string) => {
        try {
        const ref = roomId ? doc(db, "rooms", roomId) : doc(collection(db, "rooms"));
        const expiresAt = Timestamp.fromMillis(Date.now() + horas * 60 * 60 * 1000);
        let userName = "";
        const snap = await getDoc(doc(db, "users", uid));
        if (snap.exists()) userName = snap.data().displayName;
        await setDoc(ref, {
            createdBy: uid,
            createdByName: userName,
            location: { lat, lng },
            createdAt: serverTimestamp(),
            expiresAt,
            hasMatch: false,
            isGroup: isGroup,
            groupName: groupName,
            participants: [uid],
        });
        console.log("Room creada:", ref.id);
    
        if (isGroup) {
            await updateDoc(doc(db, "users", uid), {
            gruposDisponibles: 0,
            lastGroupCreatedAt: serverTimestamp(),
            });
        }
    
        return ref.id;
        } catch (e) {
        console.error("crearRoom error:", e);
        throw e;
        }
    };
}