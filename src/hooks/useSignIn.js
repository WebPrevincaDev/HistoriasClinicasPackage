import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { sincronizarAll, get_usuario, saveAsyncStorage } from "../helpers/data";

const get_proximo_cierre = () => {
  let result = new Date();

  let hora_cierre = 0;
  console.log("fecha Inicial:", result);

  if (result.getUTCHours() < 11) {
    hora_cierre = 8;
  } else if (result.getUTCHours() >= 23) {
    result.setDate(result.getDate() + 1);
    hora_cierre = 8;
  } else {
    hora_cierre = 20;
  }

  result.setDate(result.getUTCDate());
  result.setMonth(result.getUTCMonth());
  result.setFullYear(result.getUTCFullYear());
  result.setHours(hora_cierre);
  result.setSeconds(0);
  result.setMinutes(0);
  result.setMilliseconds(0);
  console.log("fecha ultima:", result);
  return result;
};

export const useSignIn = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data) => {
    try {
      if (isLoading) return;
      setIsLoading(true);

      await sincronizarAll();

      const user = await get_usuario(data.matricula);
      if (!user) throw new Error("Usuario no registrado");

      if (user.app_password !== data.password)
        throw new Error("Contraseña incorrecta");

      console.log("login exitoso");

      // login_exitoso => guardarSesion
      const sesion = {
        username: data.matricula,
        password: data.password,
        medico: user,
        cierre: get_proximo_cierre(),
      };
      await saveAsyncStorage(sesion, "sesion");
      console.log("sesion guardada");

      navigation.navigate("HomeTab");
    } catch (error) {
      console.error(error);
      Alert.alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, login };
};
