import { sincronizar } from "./sincronizar";

const usuariosApp = {
  tabla: "asw.usuario_app",
  campos: ["app_nombre", "app_matricula", "app_mail", "app_password"],
};

export const sincronizarUsuariosApp = async () => {
  await sincronizar(usuariosApp);
};
