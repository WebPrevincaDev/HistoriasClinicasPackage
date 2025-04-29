export const isSessionValid = (user) => {
  if (!user) return false;

  const cierre = new Date(user.cierre);
  const ahora = new Date();

  // Devuelve true siempre que la fecha del próximo cierre sea mayor a la hora actual
  const diferencia = cierre.getTime() - ahora.getTime();
  const isValid = diferencia > 0;
  // console.log("Sesion es válida:", isValid);

  return isValid;
};
