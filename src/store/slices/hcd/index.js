import { createSlice } from "@reduxjs/toolkit";
import { addHcd, setHcdConfig } from "./thunks";

// a medida que agregue propiedades a hcd las anoto acá para tenerlo de machete
/* {
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
  firma_med_derivante
  matricula_medico_derivante
  nombre_medico_derivante
  // Finalizacion
  abona_copago: boolean
  aclaracion_pac_acompanante
  dni_pac_acompanante
  firma_pac_acompanante
  // ScoreGlasgow
  medicionesScoreGlasgow: [{ hora, ocular, verbal, motora, total }]
  // Trauma
  historia_traumas: { zona1: "trauma_tipo1", zona2: "trauma_tipo2", ... }
  mecanismo
  // InformeEcg
  imagenesEcg: [{ id: string, src: string }, ...]
} */

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
      // setHcdConfig
      .addCase(setHcdConfig.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.hcdConfig = null;
      })
      .addCase(setHcdConfig.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(setHcdConfig.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hcdConfig = action.payload;
      })

      // addHcd
      .addCase(addHcd.fulfilled, (state, action) => {
        state.arr_hcd = action.payload;
        state.hcd = {};
      });
  },
});

export const getOpcionales = (state) => {
  const hcd = state.hcd.hcd;

  const getTextoPielMucosa = () => {
    const datos = [];
    if (hcd.piel_mucosa) datos.push(hcd.piel_mucosa);
    if (hcd.edemas) datos.push(hcd.edemas);
    return datos.join(" / ");
  };

  const ds = [
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
    },
    {
      label: "EXAMEN NEUROLÓGICO",
      name: "examen_neuro",
      screen: "ExamenNeurologico",
      value: hcd.examen_neuro,
    },
    {
      label: "AP. RESPIRATORIO",
      name: "ap_respiratorio",
      screen: "ApRespiratorio",
      value: hcd.ap_respiratorio,
    },
    {
      label: "CABEZA Y CUELLO",
      name: "cyc",
      screen: "CabezaCuello",
      value: hcd.cyc,
    },
    {
      label: "APARATO CARDIOVASCULAR",
      name: "cardio",
      screen: "AparatoCardiovascular",
      value: hcd.cardio,
    },
    {
      label: "INFORME ECG",
      name: "ecg_desc",
      screen: "InformeEcg",
      value: hcd.ecg_desc,
      shouldRenderNormalBtn: false,
    },
    {
      label: "SIST. OSEOARTC. Y MUSCULAR",
      name: "sist_oseoart_muscular",
      screen: "SistOseoartMuscular",
      value: hcd.sist_oseoart_muscular,
    },
    {
      label: "ABDOMEN",
      name: "abdomen",
      screen: "Abdomen",
      value: hcd.abdomen,
    },
    {
      label: "UROGENITAL",
      name: "urogen",
      screen: "Urogenital",
      value: hcd.urogen,
    },
    {
      label: "GINECOBSTETRICO",
      name: "gco",
      screen: "Ginecobstetrico",
      value: hcd.gco,
    },
    {
      label: "PSIQUIATRICO",
      name: "psiquiatrico",
      screen: "Psiquiatrico",
      value: hcd.psiquiatrico,
    },
    {
      label: "TRAUMA",
      name: "trauma",
      screen: "Trauma",
      value: hcd.trauma,
      textoNormalBtn: "Sin Trauma Aparente",
    },
  ];

  return ds;
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
  setHcdScreen,
  updateHcd,
  addScoreGlasgowToHcd,
  addTraumaToHcd,
  addSignosVitalesToHcd,
} = sharedSlice.actions;

export default sharedSlice.reducer;
