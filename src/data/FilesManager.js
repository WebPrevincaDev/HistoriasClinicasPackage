import "react-native-get-random-values";
import * as ExpoFileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { v5 as uuidv5 } from "uuid";
import { FirebaseFilesManager } from "./FirebaseFilesManager";
import * as Sentry from "@sentry/react-native";

export class FilesManager {
  constructor() {
    this.ffManager = new FirebaseFilesManager();
  }

  get_uid(archivo) {
    let uid = uuidv5(archivo, uuidv5.DNS);
    return uid;
  }

  get_directorio_guardado() {
    return "";
  }

  async createPath(directorios) {
    const path = directorios.join("/");
    const infoPath = await ExpoFileSystem.getInfoAsync(path);
    console.log("infoPath", infoPath);
    return path;
  }

  async get_path_guardado() {
    const path = this.getPathBase(this.get_directorio_guardado());
    await this.createIfnoExist(path);
    return path;
  }

  async createIfnoExist(path) {
    console.log("createIfnoExist");
    const infoPath = await ExpoFileSystem.getInfoAsync(path);

    if (!infoPath.exists) {
      await ExpoFileSystem.makeDirectoryAsync(path);
    }
    console.log("Path", path);
  }

  async copy_archivo_directorio(archivo, nombre) {
    const directorio_base = await this.get_path_guardado();
    const filename = await this.createPath([directorio_base, nombre]);
    const options = {
      from: archivo,
      to: filename,
    };

    await ExpoFileSystem.copyAsync(options);

    const tfile = await ExpoFileSystem.getInfoAsync(filename);

    return tfile;
  }

  async setItem(key, data) {
    const path = this.getPathBase(key);
    console.log("setItem FilesManager:", path);

    try {
      await ExpoFileSystem.writeAsStringAsync(path, data);
    } catch (error) {
      console.log(error);
      Sentry.captureException(error)
    }
  }

  async deleteItem(key) {
    try {
      await ExpoFileSystem.deleteAsync(key);
    } catch (error) {
      console.log(error);
      Sentry.captureException(error)
    }
  }

  async getItem(key) {
    // console.log("getItem:", key);
    const path = this.getPathBase(key);
    const datos_archivo = await ExpoFileSystem.getInfoAsync(path);
    if (datos_archivo.exists) {
      try {
        const file = await ExpoFileSystem.readAsStringAsync(path);
        return file;
      } catch (error) {
        console.log(error);
        Sentry.captureException(error)
      }
    }

    return null;
  }

  async restore_download_directory(key) {
    console.log("Guardando archivo:", key);
    const uri = this.getPathBase(key);
    await ExpoFileSystem.copyAsync({
      from: "file:///storage/emulated/0/AMCE BACKUP/backup.txt",
      to: uri,
    });
    console.log("Restaurado con Exito");
  }

  //TODO: Test this method
  async save_download_directory(key) {
    console.log("Guardando archivo:", key);

    // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    console.log("Permisos:", status);
    // if (status === "granted") {
    const uri = this.getPathBase(key);
    const fileUri = uri + ".txt";
    const data = await this.getItem(key);
    console.log("Guardando archivo en direccion:", fileUri);
    await ExpoFileSystem.writeAsStringAsync(fileUri, data || "");
    console.log("Guardando archivo desde direccion:", fileUri);
    const asset = await MediaLibrary.createAssetAsync(fileUri);
    await MediaLibrary.createAlbumAsync("AMCE BACKUP", asset, false);
    console.log("Guardando Terminado");
    // }
  }

  async readDirectory(directory) {
    return await ExpoFileSystem.readDirectoryAsync(directory);
  }

  getPathBase(fileName) {
    return ExpoFileSystem.documentDirectory + fileName;
  }

  async eliminarDirectorio() {
    const path_base = await this.get_path_guardado();
    const path_sincronizado = await this.createPath([
      path_base,
      "sincronizados",
    ]);
    await ExpoFileSystem.deleteAsync(path_sincronizado);
    await ExpoFileSystem.deleteAsync(path_base);
  }

  async mover_sincronizado(element, origen) {
    const path_base = await this.get_path_guardado();
    const path_sincronizado = await this.createPath([
      path_base,
      "sincronizados",
    ]);

    // return
    await this.createIfnoExist(path_sincronizado);
    const firmas_sincronizadas = await this.readDirectory(path_sincronizado);
    // console.log("Firmas Sincronizadas", firmas_sincronizadas.length);

    // console.log("Path de sincronizado", path_sincronizado);

    const nuevo_path = await this.createPath([path_sincronizado, element]);
    const options = {
      from: origen,
      to: nuevo_path,
    };

    // console.log("Mover archivos", options);

    try {
      await ExpoFileSystem.moveAsync(options);
    } catch (error) {
      console.log(error);
      Sentry.captureException(error)
    }
  }

  async limpiar_directorio() {
    const path = await this.get_path_guardado();
    const archivos = await this.readDirectory(path);

    archivos.forEach(async (element) => {
      console.log("Eliminando elemento", element);
      const path_img = archivos + "/" + element;
      try {
        await ExpoFileSystem.deleteAsync(path_img);
        console.log("se eliminó el elemento", element);
      } catch (error) {
        console.log(error);
        Sentry.captureException(error)
      }
    });
  }
}
