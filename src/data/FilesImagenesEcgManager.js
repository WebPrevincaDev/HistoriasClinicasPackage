import { FilesManager } from "./FilesManager";
import * as Sentry from "@sentry/react-native";

export class FilesImagenesEcgManager extends FilesManager {
  constructor() {
    super();

    this.esta_sincronizando = false;
  }

  async save_imagenesEcg(archivo) {
    const nombre_archivo = archivo.split("/");
    await this.copy_archivo_directorio(
      archivo,
      nombre_archivo[nombre_archivo.length - 1]
    );
    return archivo;
  }

  async get_path_imagenesEcg(keys) {
    const path_base = await this.get_path_guardado();
    const pathsImagenes = [];
    for (const key of keys) {
      const path_imagen = await this.createPath([path_base, key + ".jpg"]);
      pathsImagenes.push(path_imagen);
    }
    return pathsImagenes;
  }

  get_directorio_guardado() {
    return "imagenes";
  }

  async listar_imagenes() {
    const path = await this.get_path_guardado();
    const result = await this.readDirectory(path);
    return result;
  }

  async delete_image(filename) {
    const result = await this.deleteItem(filename);
    return result;
  }

  async obtener_imagenes_formato() {
    const path = await this.get_path_guardado();
    const result = await this.readDirectory(path);
    const path_base = await this.get_path_guardado();
    const parseImagenes = [];
    result.forEach((element) => {
      if (element === "sincronizados") return;
      const path_imagen = this.createPath([path_base, element]);
      parseImagenes.push(path_imagen);
    });
    const test = await Promise.all(parseImagenes);
    return test;
  }

  async sincronizarImagenes() {
    if (this.esta_sincronizando) return;

    console.log("Sincronizando Imagenes");

    this.esta_sincronizando = true;

    try {
      const imagenes = await this.listar_imagenes();
      const path_base = await this.get_path_guardado();

      for (let i = 0; i < imagenes.length; i++) {
        const element = imagenes[i];
        if (element === "sincronizados") continue;
        console.log("Por sincronizar elemento", element);

        const path_img = await this.createPath([path_base, element]);
        const result = await this.ffManager.save_firestore(
          path_img,
          element,
          this.get_directorio_guardado()
        );
        if (result) {
          await this.mover_sincronizado(element, path_img);
        }
      }
    } catch (error) {
      Sentry.captureException(error)
      console.log(error);
    }

    this.esta_sincronizando = false;
  }
}
