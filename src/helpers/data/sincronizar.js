import OdooServer from "../../data/OdooServer";
import { saveAsyncStorage } from "./saveAsyncStorage";

export const sincronizar = async (payload) => {
  try {
    const { tabla, campos } = payload;
    let datos = await OdooServer.search([], campos, tabla);
    if (!datos) return;

    if (datos instanceof Error) {
      console.log("Error al conectarse", tabla, datos);
      return;
    }

    if (campos.length > 0) {
      datos.forEach((element) => {
        if (element.opcion_doble) {
          element.opcion_doble = false;
          element.nombre = element[campos[0]].toUpperCase() + " IZQUIERDO";

          datos.push({
            nombre: element[campos[0]].toUpperCase() + " DERECHO",
          });
        } else {
          element["nombre"] = element[campos[0]].toUpperCase();
          element["value"] = false;
        }
      });
    }

    await saveAsyncStorage(datos, tabla);
  } catch (error) {
    console.error("Error al conectarse: ", error);
  }
};
