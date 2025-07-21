import fileManagerInstance from "../../data/fileManagerInstance";
import * as Sentry from "@sentry/react-native";

export const getAsyncStorage = async (key) => {
  try {
    const data = await fileManagerInstance.getItem(key);
    return data
  } catch (error) {
    console.error("Error al ejecutar setItem: ", error);
    Sentry.captureException(error)
  }
};

export const getAsyncAllStorage = async (key) => {
  console.log("getAsyncAllStorage key:", key);
  try {
    const data = await fileManagerInstance.getAllByKey(key);
    return data;
  } catch (error) {
    console.error("Error al ejecutar getAllByKey: ", error);
    Sentry.captureException(error);
  }
}
