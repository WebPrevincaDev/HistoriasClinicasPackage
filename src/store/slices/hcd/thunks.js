import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllByKey, saveAsyncStorage,getAsyncStorage, getAsyncAllStorage } from "../../../helpers/data";
import OdooServer from "../../../data/OdooServer";
import { FilesFirmaManager } from "../../../data/FilesFirmaManager";
import { FilesImagenesEcgManager } from "../../../data/FilesImagenesEcgManager";
import { TableHCD } from "../../../data/TableHCD";
import * as Sentry from "@sentry/react-native";

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

export const syncHcd = createAsyncThunk(
  "hcd/syncHcd",
  async ({ new_arr_hcd }) => {    
    /* todo: falta lógica si conexion !== "ONLINE" */
    console.log("---------- sincronizarFirmas ----------");
    await new FilesFirmaManager().sincronizarFirmas();
    console.log("---------- sincronizarImagenes ----------");
    await new FilesImagenesEcgManager().sincronizarImagenes();

    console.log("---------- sicronizar_firebase ----------");
    const pendientes = new_arr_hcd;
    console.log("Total de HCD", pendientes.length);
    // for (let shc in pendientes) {
    //   const enviar = pendientes[shc];
    //   const params = {
    //     ...enviar,        
    //   };
    //   console.log("Firebase params =", params);
    //   console.log("Id Firebase enviar.id_firebase", enviar.id_firebase);
    //   if (!params.id_firebase) {
    //     const id = await new TableHCD().addRegistro(params);
    //     console.log("Id Firebase", id);
    //     if (id) enviar.id_firebase = id;
    //   }
    // }

    // sincronizar - sincronizar_odoo
    console.log("---------- sincronizar_odoo ----------");
    const narr = [];
    const sincronizadas = [];

    for (let item in new_arr_hcd) {
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
        historia_medico: enviar.historia_medico,
        historia_chofer: enviar.historia_chofer,
        historia_enfermero: enviar.historia_enfermero,
        historia_movil_id: enviar.historia_movil_id,
        // Signature
        archivo_firma: enviar.archivo_firma,
      };
      console.log("Odoo params =", params);  
      let sincronizado = false    
      try {
        const response = await OdooServer.create("asw.historia", params, {});
        console.log("OdooServer.create response", response);
        sincronizadas.push(enviar);
        sincronizado = true;
      } catch (error) {
        Sentry.captureException(error)
        console.error("Error al sincronizar con Odoo", error, sincronizado);    
      }      
      narr.push({...enviar, sincronizado});
    }

    const sin_enviar = narr.filter((item) => !item.sincronizado);

    console.log("Antes", new_arr_hcd.length);
    console.log("Despues", sin_enviar.length);
   
    const fecha = new Date();
    const file_sinchro = "Historias_sincronizadas" + fecha.getTime();

    await saveAsyncStorage(sin_enviar, "Historias_sin_sincronizar");

    if(sincronizadas.length > 0) await saveAsyncStorage(sincronizadas, file_sinchro);

    console.log("fin sincronizar");

    return sin_enviar
})

// agregarHCD
export const addHcd = createAsyncThunk(
  "hcd/addHcd",
  async ({ new_arr_hcd }) => {
    await saveAsyncStorage(new_arr_hcd, "Historias_sin_sincronizar");
    return new_arr_hcd;
  }
);

// Sincronizar firmas perdidas
export const syncFirmas = createAsyncThunk(
  "hcd/syncFirmas",
  async () => {
    console.log("---------- sincronizarFirmas perdidas ----------");
    const archivos_sincronizados = await getAsyncAllStorage("Historias_sincronizadas");
    if (!archivos_sincronizados) return;

    console.log("Archivos Sincronizadas", archivos_sincronizados.length);

    const historias_clinicas_checkear = []
    const hcd_dict = {}
    for (const archivo of archivos_sincronizados) {
      console.log("Checkeando archivo:", archivo);
      try {
        const historias = await getAllByKey(archivo);      
        if (!historias || historias.length === 0) {
          console.log("No hay historias en el archivo:", archivo);
          continue;
        }
        
        for(const historia of historias) {
          if (historia.firma_pac_acompanante) {
            historias_clinicas_checkear.push(historia);
            hcd_dict[historia.id_interno] = historia;
          }
        }
      }
      catch (error) {
        console.error("Error al obtener historias:", error);
      }
    }

    console.log("Historias a checkear:", historias_clinicas_checkear);
    const response = await OdooServer.search([["id_interno", "in", Object.keys(hcd_dict)], ["historia_archivo_firma_pac_acompanante", "=", false]],
      ['id', 'id_interno', 'historia_archivo_firma_pac_acompanante', 'historia_archivo_firma_med_derivante'],
      "asw.historia");
    console.log("OdooServer.search response:", response);
    if (response && response.length > 0) {
      for (const record of response) {
        try {
          const update_data = {
            "historia_archivo_firma_pac_acompanante": hcd_dict[record.id_interno].firma_pac_acompanante,
            "historia_archivo_firma_med_derivante": hcd_dict[record.id_interno].firma_med_derivante
          }
          console.log("Actualizando historia:", record.id, update_data);
          const res_update = await OdooServer.update(
            update_data,
            record.id,
            "asw.historia");
          console.log("OdooServer.update response:", res_update);
        } catch (error) {
          console.error("Error al actualizar historia:", error);
        }      
      }
    }
  }
);


