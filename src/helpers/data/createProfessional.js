import OdooServer from "../../data/OdooServer";

// ProfessionalManager CrearProfesional
export const createProfessional = async (userData) => {
  const user = {
    app_nombre: userData.nombre,
    app_matricula: userData.matricula,
    app_mail: userData.email,
    app_password: userData.password,
    id_value: null,
  };
  console.log("createProfessional profesional a guardar:", user);

  let response = await OdooServer.create("asw.usuario_app", user, {});
  console.log("OdooServer.create res:", response);
  user.id = response;

  return user;
};
