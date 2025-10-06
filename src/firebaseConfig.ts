import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, serverTimestamp, updateDoc } from "firebase/firestore";

//CONFIGURACION FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyCpsLDF7wRr8N2Lp99bYyU2r3HhHYStKQo",
  authDomain: "gran-hermanov1-2dc5c.firebaseapp.com",
  projectId: "gran-hermanov1-2dc5c",
  storageBucket: "gran-hermanov1-2dc5c.firebasestorage.app",
  messagingSenderId: "428608274567",
  appId: "1:428608274567:web:f59bafc7602606806f3822"
};

//INICIALIZAR FIREBASE
const app = initializeApp(firebaseConfig);

//INICIALIZAR SERVICIOS
export const auth = getAuth(app);
export const db = getFirestore(app);

//CALCULAR DISTANCIA
export function calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

//ACTUALIZAR UBICACION
export const actualizarUbicacionUsuario = async (lat: number, lng: number) => {
  const uid = auth.currentUser?.uid;
  if (!uid) return;

  await updateDoc(doc(db, "users", uid), {
    lastLocation: { lat, lng },
    updatedAt: serverTimestamp(),
  },);
};
