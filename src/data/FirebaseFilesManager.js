import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../helpers/firebase/firebaseconfig";

export class FirebaseFilesManager {
  async save_firestore(path, nombre, path_guardado) {
    const response = await fetch(path);
    const blob = await response.blob();
    console.log("Sincronizando con firebase");

    try {
      const storageRef = ref(storage, `${path_guardado}/${nombre}`);
      await uploadBytes(storageRef, blob);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
