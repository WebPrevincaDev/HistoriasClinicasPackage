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
    console.log("getItem:", key);
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

  async save_download_directory(keys) {
    console.log("Guardando archivo:", keys);

    const permissions = await ExpoFileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (!permissions.granted) {
      alert('Permission to save files was denied');
      return null;
    }

    // Gets SAF URI from response
    const uri = permissions.directoryUri;
    console.log("URI", uri);

    for (const key of keys) {
      console.log("Guardando archivo:", key);
      const path = this.getPathBase(key);
      const data = await this.getItem(key);
      console.log("Guardando archivo en direccion:", path);

      await ExpoFileSystem.writeAsStringAsync(path, data || "");
      console.log("Guardando archivo desde direccion:", path);

      try {
        const newUri = await ExpoFileSystem.StorageAccessFramework.createFileAsync(
          uri,
          key,
          "text/plain"
        );
        console.log("New URI", newUri);

        await ExpoFileSystem.writeAsStringAsync(newUri, data || "");
        console.log("Guardado Terminado");
      } catch (error) {
        console.log("Error creando el archivo:", error);
        Sentry.captureException(error)
      }
    }
  }

  async readDirectory(directory) {
    return await ExpoFileSystem.readDirectoryAsync(directory);
  }

  async getAllInDirectory() {
    const path = await this.get_path_guardado();
    const archivos = await this.readDirectory(path);
    return archivos.filter((file) => file.startsWith('Historias_'));
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
    console.log("Firmas Sincronizadas", firmas_sincronizadas.length);

    console.log("Path de sincronizado", path_sincronizado);

    const nuevo_path = await this.createPath([path_sincronizado, element]);
    const options = {
      from: origen,
      to: nuevo_path,
    };

    console.log("Mover archivos", options);

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

  async getAllByKey(key) {
    console.log("getAllByKey key:", key);
    const path = await this.get_path_guardado();
    const archivos = await this.readDirectory(path);

    const archivos_sincronizados = archivos.filter((element) => {
      return element.includes(key);
    });

    return archivos_sincronizados
  }
}
