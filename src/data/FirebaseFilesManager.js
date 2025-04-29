import firebase from "firebase/app";
import "firebase/firestore";

export class FirebaseFilesManager {
  async save_firestore(path, nombre, path_guardado) {
    const response = await fetch(path);
    const blob = await response.blob();
    console.log("Sincronizando con firebase");

    try {
      const ref = firebase.storage().ref(path_guardado).child(nombre);
      await ref.put(blob);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
