import fileManagerInstance from "../../data/fileManagerInstance";

export const getAsyncStorage = async (key) => {
  try {
    const data = await fileManagerInstance.getItem(key);
    return data
  } catch (error) {
    console.error("Error al ejecutar setItem: ", error);
  }
};
