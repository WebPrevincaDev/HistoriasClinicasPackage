import fileManagerInstance from "../../data/fileManagerInstance";

export const saveAsyncStorage = async (datos, key) => {
  const datajs = JSON.stringify(datos);
  try {
    await fileManagerInstance.setItem(key, datajs);
  } catch (error) {
    console.error("Error al ejecutar setItem: ", error);
  }
};
