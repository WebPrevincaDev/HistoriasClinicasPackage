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
  fc
  frres
  glucemia
  hora
  horas
  llcap
  minutos
  sat_oxigeno
  tad
  tas
  temperatura
  // Opcionales
  edemas
  piel_mucosa
  examen_neuro
  ap_respiratorio
  cyc
  cardio
  historia_ecg_desc
  sist_oseoart_muscular
  historia_abdomen
  historia_urogen
  historia_gco
  historia_psiquiatrico
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
      name: "historia_ecg_desc",
      screen: "InformeEcg",
      value: hcd.historia_ecg_desc,
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
      name: "historia_abdomen",
      screen: "Abdomen",
      value: hcd.historia_abdomen,
    },
    {
      label: "UROGENITAL",
      name: "historia_urogen",
      screen: "Urogenital",
      value: hcd.historia_urogen,
    },
    {
      label: "GINECOBSTETRICO",
      name: "historia_gco",
      screen: "Ginecobstetrico",
      value: hcd.historia_gco,
    },
    {
      label: "PSIQUIATRICO",
      name: "historia_psiquiatrico",
      screen: "Psiquiatrico",
      value: hcd.historia_psiquiatrico,
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

export const { setHcdScreen, updateHcd, addScoreGlasgowToHcd } =
  sharedSlice.actions;

export default sharedSlice.reducer;
