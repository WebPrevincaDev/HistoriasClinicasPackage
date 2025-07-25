import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addHcd, syncHcd } from "./thunks";
import { diagnosisCodes as codes } from "../../../constants";
import { getAsyncStorage } from "../../../helpers/data";
import * as Sentry from "@sentry/react-native";

// a medida que agregue propiedades a hcd las anoto acá para tenerlo de machete
/* {
  // HomeHCD (inicio)
  fecha: new Date().toISOString() ("2024-01-12T19:43:38.983Z")
  // Motivo del llamado
  llamadaMotivo: string
  llamadaColor: string
  // Tipo de historia
  ubicacion_atencion: string
  // Paciente
  paciente_ausente?: undefined | boolean
  pac_dni
  pac_cobertura
  pac_plan
  pac_nro_socio
  pac_apellido
  pac_nombre
  pac_edad
  pac_localidad
  pac_calle
  pac_interseccion
  pac_nro
  pac_piso
  pac_dto
  // Datos iniciales
  antecedentes: string
  dias
  horas
  minutos
  medicionesSignosVitales: [{ hora, tas, tad, temperatura, frres, fc, llcap, glucemia, sat_oxigeno }, ...]
  // Opcionales
  edemas
  piel_mucosa
  examen_neuro
  ap_respiratorio
  cyc
  cardio
  ecg_desc
  sist_oseoart_muscular
  abdomen
  urogen
  gco
  psiquiatrico
  trauma
  // Diagnostico
  diagnostico
  procedimiento
  epicrisis
  medicamentos
  // Desenlace
  alLlegar
  desenlace
  evolucion
  instituto
  firma_med_derivante: { id: string id, uri: string (base64) }
  matricula_medico_derivante
  nombre_medico_derivante
  // Finalizacion
  abona_copago: boolean
  aclaracion_pac_acompanante
  dni_pac_acompanante
  firma_pac_acompanante: { id: string id, uri: string (base64) }
  // ScoreGlasgow
  medicionesScoreGlasgow: [{ hora, ocular, verbal, motora, total }]
  // Trauma
  historia_traumas: { zona1: "trauma_tipo1", zona2: "trauma_tipo2", ... }
  mecanismo
  // InformeEcg
  imagenesEcg: [{ id: string, src: string }, ...]
} */

// hcdConfig
/* {
  medico (user logueado)
  movil
  chofer
  enfermero
} */

export const loadInitialData = createAsyncThunk(
  'hcd/loadInitialData',
  async () => {
    try {
      const data = await getAsyncStorage('Historias_sin_sincronizar');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      Sentry.captureException(error)
      throw error;
    }
  }
);

export const initialState = {
  isLoading: false,
  error: "",
  hcdConfig: null,
  arr_hcd: [],
  hcd: {},
  pantallaHCD: "",
};

export const sharedSlice = createSlice({
  name: "hcd",
  initialState,
  reducers: {
    resetHcdStore: () => {
      return initialState;
    },
    setHcdConfig: (state, action) => {
      state.hcdConfig = { ...state.hcdConfig, ...action.payload };
    },
    updateHcd: (state, action) => {
      state.hcd = { ...state.hcd, ...action.payload };
    },
    addScoreGlasgowToHcd: (state, action) => {
      state.hcd.medicionesScoreGlasgow
        ? state.hcd.medicionesScoreGlasgow.push(action.payload)
        : (state.hcd.medicionesScoreGlasgow = [action.payload]);
    },
    addTraumaToHcd: (state, action) => {
      const { zona, trauma_tipo } = action.payload;
      state.hcd.trauma = "Con datos cargados";
      state.hcd.historia_traumas
        ? (state.hcd.historia_traumas[zona] = trauma_tipo)
        : (state.hcd.historia_traumas = { [zona]: trauma_tipo });
    },
    addSignosVitalesToHcd: (state, action) => {
      state.hcd.medicionesSignosVitales
        ? state.hcd.medicionesSignosVitales.push(action.payload)
        : (state.hcd.medicionesSignosVitales = [action.payload]);
    },
    setHcdScreen: (state, action) => {
      state.pantallaHCD = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // addHcd
      .addCase(addHcd.fulfilled, (state, action) => {
        state.arr_hcd = action.payload;
        state.hcd = {};
      })
      .addCase(addHcd.rejected, (state, action) => {
        console.error("addHcd rejected:", action.error);
      })
      .addCase(loadInitialData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadInitialData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.arr_hcd = action.payload;
      })
      .addCase(loadInitialData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(syncHcd.pending, (state) => {
        state.error = ""
        state.isLoading = true;
      })
      .addCase(syncHcd.fulfilled, (state, action) => {                
        state.arr_hcd = action.payload;
        state.isLoading = false;
        if (state.arr_hcd.length > 0) {
          state.error = "Algunos registros no pudieron sincronizarse correctamente"
        }
      })
      .addCase(syncHcd.rejected, (state, action) => {
        state.isLoading = false;
        console.error("addHcd rejected:", action.error);
        state.error = action.error.message;
      })
  },
});

export const getOpcionales = (state) => {
  const hcd = state.hcd.hcd;
  const diagnostico = state.hcd.hcd.diagnostico?.toLowerCase() || "";

  const getTextoPielMucosa = () => {
    const datos = [];
    if (hcd.piel_mucosa) datos.push(hcd.piel_mucosa);
    if (hcd.edemas) datos.push(hcd.edemas);
    return datos.join(" / ");
  };

  const isRequired = (keywords) =>
    keywords.some((keyword) => diagnostico.includes(keyword.toLowerCase()));

  const fields = [
    {
      label: "SCORE DE GLASGOW",
      name: "score_de_glasgow",
      screen: "ScoreGlasgow",
      value: "",
      shouldRenderNormalBtn: false,
    },
    {
      label: "PIEL Y MUCOSA / EDEMAS",
      name: "piel_mucosa",
      screen: "PielMucosa",
      value: getTextoPielMucosa(),
      required: isRequired(codes.piel_mucosa),
    },
    {
      label: "EXAMEN NEUROLÓGICO",
      name: "examen_neuro",
      screen: "ExamenNeurologico",
      value: hcd.examen_neuro,
      required: isRequired(codes.examen_neuro),
    },
    {
      label: "AP. RESPIRATORIO",
      name: "ap_respiratorio",
      screen: "ApRespiratorio",
      value: hcd.ap_respiratorio,
      required: isRequired(codes.ap_respiratorio),
    },
    {
      label: "CABEZA Y CUELLO",
      name: "cyc",
      screen: "CabezaCuello",
      value: hcd.cyc,
      required: isRequired(codes.cyc),
    },
    {
      label: "APARATO CARDIOVASCULAR",
      name: "cardio",
      screen: "AparatoCardiovascular",
      value: hcd.cardio,
      required: isRequired(codes.cardio),
    },
    {
      label: "INFORME ECG",
      name: "ecg_desc",
      screen: "InformeEcg",
      value: hcd.ecg_desc,
      shouldRenderNormalBtn: false,
      required: (hcd.cardio && !hcd.cardio.includes("Normal")),
    },
    {
      label: "SIST. OSEOARTC. Y MUSCULAR",
      name: "sist_oseoart_muscular",
      screen: "SistOseoartMuscular",
      value: hcd.sist_oseoart_muscular,
      required: isRequired(codes.sist_oseoart_muscular),
    },
    {
      label: "ABDOMEN",
      name: "abdomen",
      screen: "Abdomen",
      value: hcd.abdomen,
      required: isRequired(codes.abdomen),
    },
    {
      label: "UROGENITAL",
      name: "urogen",
      screen: "Urogenital",
      value: hcd.urogen,
      required: isRequired(codes.urogen),
    },
    {
      label: "GINECOBSTETRICO",
      name: "gco",
      screen: "Ginecobstetrico",
      value: hcd.gco,
      required: isRequired(codes.gco),
    },
    {
      label: "PSIQUIATRICO",
      name: "psiquiatrico",
      screen: "Psiquiatrico",
      value: hcd.psiquiatrico,
      required: isRequired(codes.psiquiatrico),
    },
    {
      label: "TRAUMA",
      name: "trauma",
      screen: "Trauma",
      value: hcd.trauma,
      required: isRequired(codes.trauma),
      textoNormalBtn: "Sin Trauma Aparente",
    },
  ];

  const allRequiredFieldsComplete = fields.every((field) =>
    field.required ? field.value : true
  );

  return { fields, allRequiredFieldsComplete };
};

export const getTraumaLugares = (state) => {
  const historia_traumas = state.hcd.hcd.historia_traumas || {};

  const lugares = [
    {
      label: "ADBOMEN",
      name: "abdomen",
      value: historia_traumas.abdomen,
    },
    {
      label: "CARA",
      name: "cara",
      value: historia_traumas.cara,
    },
    {
      label: "CRANEO",
      name: "craneo",
      value: historia_traumas.craneo,
    },
    {
      label: "CUELLO",
      name: "cuello",
      value: historia_traumas.cuello,
    },
    {
      label: "GENITALES",
      name: "genitales",
      value: historia_traumas.genitales,
    },
    {
      label: "MIEMBRO INF DERECHO",
      name: "miembro_inf_derecho",
      value: historia_traumas.miembro_inf_derecho,
    },
    {
      label: "MIEMBRO INF IZQUIERDO",
      name: "miembro_inf_izquierdo",
      value: historia_traumas.miembro_inf_izquierdo,
    },
    {
      label: "MIEMBRO SUP DERECHO",
      name: "miembro_sup_derecho",
      value: historia_traumas.miembro_sup_derecho,
    },
    {
      label: "MIEMBRO SUP IZQUIERDO",
      name: "miembro_sup_izquierdo",
      value: historia_traumas.miembro_sup_izquierdo,
    },
    {
      label: "PELVIS",
      name: "pelvis",
      value: historia_traumas.pelvis,
    },
    {
      label: "PERINE",
      name: "perine",
      value: historia_traumas.perine,
    },
    {
      label: "RAQUIS",
      name: "raquis",
      value: historia_traumas.raquis,
    },
    {
      label: "TORAX",
      name: "torax",
      value: historia_traumas.torax,
    },
    {
      label: "MECANISMO",
      name: "mecanismo",
      screen: "Mecanismo",
      value: state.hcd.hcd.mecanismo,
    },
  ];

  return lugares;
};

export const {
  resetHcdStore,
  setHcdConfig,
  setHcdScreen,
  updateHcd,
  addScoreGlasgowToHcd,
  addTraumaToHcd,
  addSignosVitalesToHcd,
} = sharedSlice.actions;

export default sharedSlice.reducer;
