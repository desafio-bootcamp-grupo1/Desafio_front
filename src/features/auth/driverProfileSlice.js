
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "Miguel",
  lastName: "Hernández",
  driverId: "D-1024",
  vehicle: {
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    plate: "1234-ABC",
    fuelType: "Gasolina",
  },
  preferences: {
    notificacionesPush: false,
    alertasTrafico: false,
    reportesSemanales: false,
    modoPrivacidad: false,
  },
};

const driverProfileSlice = createSlice({
  name: "driverProfile",
  initialState,
  reducers: {
    setDriverProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetDriverProfile: () => initialState,
  },
});

export const { setDriverProfile, resetDriverProfile } = driverProfileSlice.actions;
export default driverProfileSlice.reducer;
