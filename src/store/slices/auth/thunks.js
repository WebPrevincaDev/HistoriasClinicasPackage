import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProfessional,
  get_usuario,
  registerUserInFirebase,
  searchUserInServer,
  sincronizarAll,
  sincronizarProfesionales,
  sincronizarUsuariosApp,
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
  // mientras el usuario inicia sesión voy fetcheando la data en 2do plano
  sincronizarAll();

  // busca al usuario entre los que ya tiene guardados de forma local
  let user;
  user = await get_usuario(data.matricula);
  if (!user) {
    // si no lo encuentra => busca usuarios en la db
    await sincronizarUsuariosApp();
    user = await get_usuario(data.matricula);
  }

  if (!user) throw new Error("Usuario no registrado");

  if (user.app_password !== data.password)
    throw new Error("Contraseña incorrecta");

  console.log("login exitoso");

  return {
    matricula: user.app_matricula,
    mail: user.app_mail,
    nombre: user.app_nombre,
    // password: user.app_password,
    // id: user.id,
    cierre: get_proximo_cierre(),
  };
});

export const signUp = createAsyncThunk("auth/signUp", async (data) => {
  // Nota: no hace falta sincronizarAll() pq ya se ejecuta al apretar el login button

  // let usuario_app = await ProfesionalManager.Existe
  let user = await searchUserInServer(data.matricula);
  console.log("thunk searchUserInServer user", user);

  if (!user) {
    console.log("usuario NO encontrado en odoo. lo creo");
    user = await createProfessional(data);
    console.log("respuesta de creacion:", user);
  }

  console.log("user final:", user);

  if (!user.id) throw new Error("Ocurrió un error al conectarse al sevidor");

  await registerUserInFirebase(data.email, data.password);
  sincronizarProfesionales();

  console.log("register (y login) exitoso");

  return {
    matricula: user.app_matricula,
    mail: user.app_mail,
    nombre: user.app_nombre,
    // password: user.app_password,
    // id: user.id,
    cierre: get_proximo_cierre(),
  };
});
