import { configureStore } from "@reduxjs/toolkit";

import popups from "./popups.reducer";

const store = configureStore({
  reducer: {
    popups,
  },
});

export default store;
