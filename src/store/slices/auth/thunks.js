import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  get_usuario,
  saveAsyncStorage,
  sincronizarAll,
} from "../../../helpers/data";

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

export const login = createAsyncThunk("auth/login", async (data) => {
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

  return user;
});
