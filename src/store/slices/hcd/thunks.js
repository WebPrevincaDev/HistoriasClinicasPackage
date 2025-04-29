import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllByKey, saveAsyncStorage } from "../../../helpers/data";
import OdooServer from "../../../data/OdooServer";
import { FilesFirmaManager } from "../../../data/FilesFirmaManager";
import { FilesImagenesEcgManager } from "../../../data/FilesImagenesEcgManager";
import { TableHCD } from "../../../data/TableHCD";

export const agregarPaciente = createAsyncThunk(
  "hcd/agregarPaciente",
  async (data) => {
    const pacientes = await getAllByKey("asw.paciente");
    const index = pacientes.findIndex(
      (paciente) => paciente.pac_dni === data.pac_dni
    );
    if (index === -1) {
      console.log("paciente NO encontrado. lo agrego a la lista");
      pacientes.push(data);
    } else {
      console.log("paciente encontrado. modifico sus datos en la lista");
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

// agregarHCD
export const addHcd = createAsyncThunk(
  "hcd/addHcd",
  async ({ new_arr_hcd, hcdConfig, user }) => {
    await saveAsyncStorage(new_arr_hcd, "Historias_sin_sincronizar");
    /* todo: falta lógica si conexion !== "ONLINE" */
    console.log("---------- sincronizarFirmas ----------");
    await new FilesFirmaManager().sincronizarFirmas();
    console.log("---------- sincronizarImagenes ----------");
    await new FilesImagenesEcgManager().sincronizarImagenes();

    console.log("---------- sicronizar_firebase ----------");
    const pendientes = new_arr_hcd;
    console.log("Total de HCD", pendientes.length);
    for (let shc in pendientes) {
      const enviar = pendientes[shc];
      const params = {
        ...enviar,
        ...hcdConfig,
        firma: user.firma.id,
        // firmas de hcd pueden ser undefined
        firma_pac_acompanante: enviar.firma_pac_acompanante?.id || "",
        firma_med_derivante: enviar.firma_med_derivante?.id || "",
      };
      console.log("Firebase params =", params);
      console.log("Id Firebase enviar.id_firebase", enviar.id_firebase);
      if (!params.id_firebase) {
        const id = await new TableHCD().addRegistro(params);
        console.log("Id Firebase", id);
        if (id) enviar.id_firebase = id;
      }
    }

    // sincronizar - sincronizar_odoo
    console.log("---------- sincronizar_odoo ----------");
    const narr = [];
    const sincronizadas = [];

    for (let item in new_arr_hcd) {
      try {
        const enviar = new_arr_hcd[item];
        console.log("Odoo enviar =", enviar);
        const params = {
          id_firebase: enviar.id_firebase,
          id_interno: enviar.id_interno,
          key: enviar.key,
          version_app: enviar.version_app,
          // Motivo cancelación
          motivo_cancelacion: enviar.motivo_cancelacion,
          // Motivo del llamado
          historia_motivo_llamada_motivo: enviar.llamadaMotivo,
          historia_motivo_llamada_color: enviar.llamadaColor,
          // Tipo de historia
          historia_ubicacion_atencion: enviar.ubicacion_atencion,
          // Paciente
          hpa_dni: enviar.pac_dni,
          hpa_cobertura: enviar.pac_cobertura,
          hpa_plan: enviar.pac_plan,
          hpa_nro_socio: enviar.pac_nro_socio,
          hpa_apellido: enviar.pac_apellido,
          hpa_nombre: enviar.pac_nombre,
          hpa_edad: enviar.pac_edad,
          hpa_localidad: enviar.pac_localidad,
          hpa_calle: enviar.pac_calle,
          hpa_interseccion: enviar.pac_interseccion,
          hpa_nro: enviar.pac_nro,
          hpa_piso: enviar.pac_piso,
          hpa_dto: enviar.pac_dto,
          // Datos iniciales
          historia_antecedentes_id: enviar.antecedentes,
          historia_tiempo_dia: enviar.dias,
          historia_tiempo_hora: enviar.horas,
          historia_tiempo_minuto: enviar.minutos,
          medicionesSignosVitales: enviar.medicionesSignosVitales,
          // Opcionales
          historia_edemas: enviar.edemas,
          historia_piel_mucosa: enviar.piel_mucosa,
          historia_neuro: enviar.examen_neuro,
          historia_ap_respiratorio: enviar.ap_respiratorio,
          historia_cyc: enviar.cyc,
          historia_cardio: enviar.cardio,
          historia_ecg_desc: enviar.ecg_desc,
          historia_sist_oseoart_muscular: enviar.sist_oseoart_muscular,
          historia_abdomen: enviar.abdomen,
          historia_urogen: enviar.urogen,
          historia_gco: enviar.gco,
          historia_psiquiatrico: enviar.psiquiatrico,
          // Diagnostico
          historia_diagnos: enviar.diagnostico,
          historia_proc: enviar.procedimiento,
          historia_epicrisis: enviar.epicrisis,
          historia_medicamentos: enviar.medicamentos,
          // Desenlace
          historia_al_llegar_id: enviar.alLlegar,
          historia_des_id: enviar.desenlace,
          historia_evol_id: enviar.evolucion,
          historia_hosp: enviar.instituto,
          historia_archivo_firma_med_derivante: enviar.firma_med_derivante?.id,
          historia_mat_med_derivante: enviar.matricula_medico_derivante,
          historia_nombre_med_derivante: enviar.nombre_medico_derivante,
          // Finalizacion
          historia_abona_copago: enviar.abona_copago,
          historia_aclaracion_pac_acompanante:
            enviar.aclaracion_pac_acompanante,
          historia_dni_pac_acompanante: enviar.dni_pac_acompanante,
          historia_archivo_firma_pac_acompanante:
            enviar.firma_pac_acompanante?.id,
          // ScoreGlasgow
          medicionesScoreGlasgow: enviar.medicionesScoreGlasgow,
          // Trauma
          historia_traumas: enviar.historia_traumas,
          historia_mec_id: enviar.mecanismo,
          // InformeEcg
          imagenesEcg: enviar.imagenesEcg /* TODO: revisar sincronización */,
          // Home / Configuracion
          historia_fecha: enviar.fecha,
          historia_medico: hcdConfig.medico,
          historia_chofer: hcdConfig.chofer,
          historia_enfermero: hcdConfig.enfermero,
          historia_movil_id: hcdConfig.movil,
          // Signature
          archivo_firma: user.firma.id,
        };
        console.log("Odoo params =", params);
        const response = await OdooServer.create("asw.historia", params, {});
        console.log("OdooServer.create response", response);
        sincronizadas.push(enviar);
        enviar.sincronizado = true;
        narr.push(enviar);
      } catch (error) {
        console.error("Error al sincronizar con Odoo", error);
        throw new Error(error);
      }
    }

    const sin_enviar = narr.filter((item) => item.sincronizado == undefined);

    console.log("Antes", new_arr_hcd.length);
    console.log("Despues", sin_enviar.length);

    new_arr_hcd = sin_enviar;
    const fecha = new Date();
    const file_sinchro = "Historias_sincronizadas" + fecha.getTime();

    await saveAsyncStorage(new_arr_hcd, "Historias_sin_sincronizar");
    await saveAsyncStorage(sincronizadas, file_sinchro);

    console.log("fin sincronizar");

    return new_arr_hcd;
  }
);
