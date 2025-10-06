import { collection, getDocs, query, where } from "firebase/firestore";
import { calcularDistancia, db } from "../../firebaseConfig";

export default class GroupChatService {
    
    //OBTENER GRUPOS CERCA
    public obtenerGruposCercanos = async (lat: number, lng: number, radio = 100) => {
      try {
        const roomsRef = collection(db, "rooms");
        const q = query(roomsRef, where("isGroup", "==", true));
        const snapshot = await getDocs(q);
    
        const ahora = Date.now();
        const grupos: any[] = [];
    
        snapshot.forEach((docu) => {
          const data = docu.data();
    
          let expiresAtMillis: number | null = null;
          if (data.expiresAt) {
            if (typeof data.expiresAt.toMillis === "function") {
              expiresAtMillis = data.expiresAt.toMillis();
            } else if (data.expiresAt.seconds !== undefined) {
              expiresAtMillis = data.expiresAt.seconds * 1000 + Math.floor((data.expiresAt.nanoseconds || 0) / 1e6);
            }
          }
    
          if (expiresAtMillis && expiresAtMillis <= ahora) return;
    
          let roomLat: number;
          let roomLng: number;
    
          if (data.location && typeof data.location.lat === "number" && typeof data.location.lng === "number") {
            roomLat = data.location.lat;
            roomLng = data.location.lng;
          } else if (typeof data.lat === "number" && typeof data.lng === "number") {
            roomLat = data.lat;
            roomLng = data.lng;
          } else {
            return;
          }
    
          if (roomLat === undefined || roomLng === undefined) return;
    
          const distancia = calcularDistancia(lat, lng, roomLat, roomLng);
          if (distancia <= radio) {
            grupos.push({ id: docu.id, ...data, distancia });
          }
        });
    
        grupos.sort((a, b) => a.distancia - b.distancia);
        return grupos;
      } catch (e) {
        console.error("obtenerGruposCercanos error:", e);
        return [];
      }
    };
}