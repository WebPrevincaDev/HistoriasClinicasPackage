export const obtener_hora = () => {
  const fecha = new Date();
  const hora = fecha.getHours();
  const minutos = fecha.getMinutes();
  let relleno_min = "";
  if (minutos <= 9) relleno_min = "0";
  const horaFinal = hora + ":" + relleno_min + minutos;
  return horaFinal;
};
