import { getAllByKey } from "./getAllByKey";

// filtrar_por_grupo renamed to filterProfessionalsByGroup
export const filterProfessionalsByGroup = async (grupo) => {
  const profesionales = await getAllByKey("asw.profesionales");
  const profesionalesFiltrados = profesionales.filter(
    (profesional) =>
      profesional.pro_grupo != false &&
      profesional.pro_grupo[1].startsWith(grupo.toUpperCase())
  );

  return profesionalesFiltrados;
};
