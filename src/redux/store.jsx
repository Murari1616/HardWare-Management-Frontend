// store.js
import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import typeSlice from "./features/typeSlice";
import workSlice from "./features/workSlice";
// import healthcareAdminSlice from "./features/healthcareadminSlice";
// import physioSlice from './features/physioSlice';
// import appointmentSlice from "./features/appointmentbookingSlice";
// import PhysioAvailability from "./features/physioavailabiltySlice";
// import sessionsSlice from "./features/sessionSlice";
// import VideoCallSlice from "./features/videoCallSlice";
// import configurationSlice from "./features/configurationSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
    types: typeSlice,
    works: workSlice,
    // admin: healthcareAdminSlice,
    // physio: physioSlice,
    // appointment: appointmentSlice,
    // availability: PhysioAvailability,
    // session: sessionsSlice,
    // videoCall: VideoCallSlice,
    // configuration: configurationSlice,
  },
});

export default store;
