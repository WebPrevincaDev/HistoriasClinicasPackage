import * as FileSystem from "expo-file-system";
import { FilesManager } from "./FilesManager";

export class FilesFirmaManager extends FilesManager {
  constructor() {
    super();

    this.esta_sincronizando = false;
  }

  async save_firma(archivo, extencion) {
    const uid = this.get_uid(archivo);
    const nombre_archivo = uid + "." + extencion;
    const path = FileSystem.cacheDirectory + nombre_archivo;
    await FileSystem.writeAsStringAsync(
      path,
      archivo.replace("data:image/png;base64,", ""),
      { encoding: FileSystem.EncodingType.Base64 }
    );

    await this.copy_archivo_directorio(path, nombre_archivo);
    return uid;
  }

  async get_path_firma(key) {
    const path_base = await this.get_path_guardado();
    console.log("Path Base: ", path_base);
    const path_archivo = this.createPath([path_base, key + ".png"]);
    console.log("path_archivo: ", await path_archivo);

    return path_archivo;
  }

  async get_base64_path_firma(key) {
    const path = await this.get_path_firma(key);
    console.log("path de base64: ", path);
    try {
      const result = await FileSystem.readAsStringAsync(path, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return result;
    } catch (error) {
      console.log("Catcheando error de get_base64_path_firma");

      const splitStr = path.split("/");
      splitStr.pop();
      splitStr.pop();
      const joinedStr = splitStr.join("/");
      const firmasDirectoryStr = `${joinedStr}/firmas/sincronizados`;
      const firmaUriStr = `${joinedStr}/firmaUri`;

      const arraySincroFirmas = await FileSystem.readDirectoryAsync(
        firmasDirectoryStr
      );
      const firmaUri = await FileSystem.readAsStringAsync(firmaUriStr);
      const proSignature = arraySincroFirmas.filter((el) =>
        el.includes(firmaUri)
      );

      const result = await FileSystem.readAsStringAsync(
        `${firmasDirectoryStr}/${proSignature[0]}`,
        { encoding: FileSystem.EncodingType.Base64 }
      );

      return result;
    }
  }

  get_directorio_guardado() {
    return "firmas";
  }

  async listar_firmas() {
    const path = await this.get_path_guardado();
    const result = await this.readDirectory(path);
    // console.log("Lectura del directorio", result);
    return result;
  }

  async sincronizarFirmas() {
    if (this.esta_sincronizando) return;

    console.log("Sincronizando Firmas");

    this.esta_sincronizando = true;

    try {
      const firmas = await this.listar_firmas();
      const path_base = await this.get_path_guardado();

      console.log("Cnt Firmas", firmas.length);

      for (let i = 0; i < firmas.length; i++) {
        const element = firmas[i];
        if (element === "sincronizados") continue;
        console.log("Por sincronizar elemento", element);

        const path_img = await this.createPath([path_base, element]);
        console.log(`Path imagen antes de sincronizar: ${path_img}`);
        const result = await this.ffManager.save_firestore(
          path_img,
          element,
          this.get_directorio_guardado()
        );
        console.log(
          "Resultado de subida a Firestore ",
          result,
          " Archivo ",
          element
        );
        if (result) {
          await this.mover_sincronizado(element, path_img);
        }
      }
    } catch (error) {
      console.log("Error al sincronizar una firma");
      console.log(error);
    }

    this.esta_sincronizando = false;
  }
}
