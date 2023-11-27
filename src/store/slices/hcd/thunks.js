import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllByKey, saveAsyncStorage } from "../../../helpers/data";

export const setHcdConfig = createAsyncThunk(
  "hcd/setHcdConfig",
  async (data) => {
    await saveAsyncStorage(data.movil, "movil");
    await saveAsyncStorage(data.chofer, "chofer");
    await saveAsyncStorage(data.enfermero, "enfermero");
    await saveAsyncStorage(data.medico, "medico");
    return data;
  }
);

export const agregarPaciente = createAsyncThunk(
  "hcd/agregarPaciente",
  async (data) => {
    const pacientes = await getAllByKey("asw.paciente");
    const index = pacientes.findIndex(
      (paciente) => paciente.pac_dni === data.pac_dni
    );
    if (index === -1) {
      pacientes.push(data);
    } else {
      pacientes[index] = {
        pac_dni: data.pac_dni,
        pac_cobertura: data.pac_cobertura,
        pac_plan: data.pac_plan,
        pac_nro_socio: data.pac_nro_socio,
        pac_nombre: data.pac_nombre,
        pac_apellido: data.pac_apellido,
        pac_localidad: data.pac_localidad,
        pac_calle: data.pac_calle,
        pac_interseccion: data.pac_interseccion,
        pac_nro: data.pac_nro,
        pac_piso: data.pac_piso,
        pac_dto: data.pac_dto,
        pac_antecedentes: data.pac_antecedentes,
      };
    }
    await saveAsyncStorage(pacientes, "asw.paciente");
    return data;
  }
);

export const addHcd = createAsyncThunk(
  "hcd/addHcd",
  async ({ newHcd, arr_hcd }) => {
    const new_arr_hcd = [...arr_hcd, newHcd];
    await saveAsyncStorage(new_arr_hcd, "Historias_sin_sincronizar");
    return new_arr_hcd;
  }
);
