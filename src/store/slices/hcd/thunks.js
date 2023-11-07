import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveAsyncStorage } from "../../../helpers/data";

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
