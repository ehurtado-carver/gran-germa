import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { actualizarUbicacionUsuario } from "../firebaseConfig";

export default function useUbicacion() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permiso de ubicación denegado");
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,     // cada 5s
          distanceInterval: 10,   // o cada 10m
        },
        (loc) => {
            console.log(loc);
          const nuevaCoords = {
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
          };

          setCoords(nuevaCoords);

          // 🔹 actualizamos Firestore en cada cambio
          actualizarUbicacionUsuario(nuevaCoords.lat, nuevaCoords.lng);
        }
      );
    })();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  return coords;
}
