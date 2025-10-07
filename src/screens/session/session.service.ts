import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

export class SessionService {

    //REGISTRAR USUARIO
    public async registrarUsuario(email: string, password: string, displayName: string) {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(cred.user).then(()=>{console.log("bien")}).catch((error)=>{console.log("mal", error)});
      const uid = cred.user.uid;
    
      // Opcional: añadir displayName al perfil de Firebase Auth
      await updateProfile(cred.user, { displayName });
    
      // Guardar usuario en Firestore
      await setDoc(doc(db, "users", uid), {
        displayName,
        email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLocation: { lat: 0, lng: 0 },
        photoURL: "https://i.pravatar.cc/150",
        gruposDisponibles: 1,
        lastGroupCreatedAt: null,
        personasEncontradas: 0,
        matches: 0,
        gruposEncontrados: 0,
      }, { merge: true });
    
      return uid;
    }
    
    //LOGIN USUARIO
    public async loginUsuario(email: string, password: string) {
      const cred = await signInWithEmailAndPassword(auth, email, password);

      if (!cred.user.emailVerified) {
        return false;
      }

      return true;
    }
}