import { configureStore } from "@reduxjs/toolkit";

import popups from "./popups.reducer";
import userSlice from "./userSlice";
import progressSlice from "./progressSlice";
import bidSlice from "./bidSlice";
import socketSlice from "./socket";

const store = configureStore({
  reducer: {
    popups,
    userReducer:userSlice,
    uploadReducer:progressSlice,
    bidReducer:bidSlice,
    socketReducer:socketSlice,

  },
});

export default store;
