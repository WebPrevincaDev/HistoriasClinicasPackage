import { createSlice } from "@reduxjs/toolkit";
import { setHcdConfig } from "./thunks";

// a medida que agregue propiedades a hcd las anoto acá para tenerlo de machete
/* {
  llamadaMotivo: string
  llamadaColor: string
  ubicacion_atencion: string
  paciente_ausente: undefined | boolean
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
} */

export const initialState = {
  isLoading: false,
  error: "",
  hcdConfig: null,
  hcd: {},
  pantallaHCD: "",
};

export const sharedSlice = createSlice({
  name: "hcd",
  initialState,
  reducers: {
    setLlamado: (state, action) => {
      const { motivo, color } = action.payload;
      state.hcd.llamadaMotivo = motivo;
      state.hcd.llamadaColor = color;
    },
    setTipoHistoria: (state, action) => {
      state.hcd.ubicacion_atencion = action.payload;
    },
    setDatosPaciente: (state, action) => {
      state.hcd = { ...state.hcd, ...action.payload };
    },
    setHcdScreen: (state, action) => {
      state.pantallaHCD = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { setHcdScreen, setLlamado, setTipoHistoria, setDatosPaciente } =
  sharedSlice.actions;

export default sharedSlice.reducer;
