import { getAllByKey } from "./getAllByKey";

export const get_usuario = async (matricula) => {
  console.log("arranco get_usuario");
  const users = await getAllByKey("asw.usuario_app");
  // console.log('users', users)
  const userFound = users?.find((user) => user.app_matricula === matricula);

  console.log("termino get_usuario. userFound: ", userFound);

  return userFound;
};
