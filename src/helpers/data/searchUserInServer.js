import OdooServer from "../../data/OdooServer";

// ProfessionalManager Existe
export const searchUserInServer = async (matricula) => {
  let datos = await OdooServer.search(
    [["app_matricula", "=", matricula]],
    [],
    "asw.usuario_app"
  );
  // console.log("OdooServer.search res:", datos);

  if (!datos) return;

  if (datos.length > 0) {
    let registro = datos[0];
    return registro;
  }

  return false;
};
