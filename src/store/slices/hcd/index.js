import { createSlice } from "@reduxjs/toolkit";
import { setHcdConfig } from "./thunks";

// a medida que agregue propiedades a hcd las anoto acá para tenerlo de machete
/* {
  llamadaMotivo: string
  llamadaColor: string
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

export const { setHcdScreen, setLlamado } = sharedSlice.actions;

export default sharedSlice.reducer;
