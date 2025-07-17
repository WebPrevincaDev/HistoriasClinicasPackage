import fileManagerInstance from "../../data/fileManagerInstance";
import * as Sentry from "@sentry/react-native";

export const saveAsyncStorage = async (datos, key) => {
  const datajs = JSON.stringify(datos);
  try {
    await fileManagerInstance.setItem(key, datajs);
  } catch (error) {
    Sentry.captureException(error)
    console.error("Error al ejecutar setItem: ", error);
  }
};
