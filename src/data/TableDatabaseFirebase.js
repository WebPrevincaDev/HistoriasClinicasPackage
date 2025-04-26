import { db } from "../helpers/firebase/firebaseconfig";
import { ref, onValue, push } from "firebase/database";

export default class TableDatabaseFirebase {
  get_tabla() {
    return "";
  }

  consultar_datos() {
    const table = this.get_tabla();
    const tableRef = ref(db, table);

    onValue(tableRef, (snap) => {
      console.log("datos recibidos", table, snap);
      const datos = this.to_array(snap);
      console.log(datos);
      this.saveAsyncStorage(datos, table);
    });
  }

  async addRegistro(registro) {
    console.log("=== addRegistro ===");
    const tableRef = ref(db, this.get_tabla());
    console.log("tableRef", tableRef);
    try {
      const newHcdRef = await push(tableRef, registro);
      console.log("newHcdRef", newHcdRef);
      return newHcdRef.key;
    } catch (error) {
      console.error("Error addRegistro", error);
    }

    return null;
  }

  to_array(datos) {
    const result = [];

    datos.forEach((element) => {
      const aux = element.val();
      aux["key"] = element.key;
      result.push(aux);
    });

    return result;
  }
}
