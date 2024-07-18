import { sincronizar } from "./sincronizar";

const profesionales = {
  tabla: "asw.profesionales",
  campos: ["name", "pro_grupo", "pro_matricula", "pro_password", "email"],
};

export const sincronizarProfesionales = async () => {
  await sincronizar(profesionales);
};
