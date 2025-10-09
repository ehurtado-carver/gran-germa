import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, calcularDistancia, db } from "../firebaseConfig";
import useUbicacion from "./useUbication";

export function useUsuariosCerca(radioMetros: number = 500) {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const ubicacion = useUbicacion(); // tu hook que se va actualizando

  useEffect(() => {
    if (!ubicacion) return;
    const uidActual = auth.currentUser?.uid;

    const unsubscribe = onSnapshot(collection(db, "users"), (snap) => {
      const cerca: any[] = [];
      snap.forEach((doc) => {
        if (doc.id === uidActual) return; // no incluirme a mí
        const data = doc.data();
        if (data.lastLocation?.lat && data.lastLocation?.lng) {
          const dist = calcularDistancia(
            ubicacion.lat,
            ubicacion.lng,
            data.lastLocation.lat,
            data.lastLocation.lng
          );
          if (dist <= radioMetros) {
            cerca.push({ id: doc.id, ...data, distancia: dist });
          }
        }
      });
      cerca.sort((a, b) => a.distancia - b.distancia);
      setUsuarios(cerca);
    });

    return () => unsubscribe();
  }, [ubicacion, radioMetros]);

  return usuarios;
}