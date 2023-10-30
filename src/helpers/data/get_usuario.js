import fileManagerInstance from "../../data/fileManagerInstance";

export const get_usuario = async (matricula) => {
  console.log("arranco get_usuario");
  const users = await fileManagerInstance.getItem("asw.usuario_app");
  const usersParsed = JSON.parse(users);
  // console.log('usersParsed', usersParsed)
  const userFound = usersParsed.find(
    (user) => user.app_matricula === matricula
  );

  console.log("termino get_usuario. userFound: ", userFound);

  return userFound;
};
