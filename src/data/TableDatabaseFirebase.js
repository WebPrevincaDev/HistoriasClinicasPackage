import firebase from "firebase";

export default class TableDatabaseFirebase {
  get_tabla() {
    return "";
  }

  consultar_datos() {
    const table = this.get_tabla();
    firebase
      .database()
      .ref(table)
      .on("value", function (snap) {
        console.log("datos recibidos", table, snap);
        const datos = this.to_array(snap);
        console.log(datos);
        this.saveAsyncStorage(datos, table);
      });
  }

  async addRegistro(registro) {
    console.log("=== addRegistro ===");
    const table = firebase.database().ref(this.get_tabla());
    console.log("table", table);
    try {
      const newHcd = await table.push(registro);
      console.log("newHcd", newHcd);
      return newHcd.key;
    } catch (error) {
      console.log("Error addRegistro");
      console.error(error);
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
