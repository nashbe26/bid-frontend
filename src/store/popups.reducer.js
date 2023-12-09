import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "Popups",
  initialState: {
    cookies_open: false,
    auth_open: false,
    thanks_signup: false,
  },
  reducers: {
    close: (state, action) => {
      state.cookies_open = false;
      state.auth_open = false;
      state.thanks_signup = false;
    },
    // Cookies
    open_cookies: (state, _) => {
      state.cookies_open = true;
    },
    close_cookies: (state, _) => {
      state.cookies_open = false;
    },
    // Auth
    open_auth: (state, _) => {
      state.auth_open = true;
    },
    close_auth: (state, _) => {
      state.auth_open = false;
    },
    // Thanks Signup
    open_thanks_signup: (state, _) => {
      state.thanks_signup = true;
    },
    close_thanks_signup: (state, _) => {
      state.thanks_signup = false;
    },
  },
  extraReducers: {},
});

export const {
  close,
  open_cookies,
  open_auth,
  open_thanks_signup,
  close_cookies,
  close_auth,
  close_thanks_signup,
} = usersSlice.actions;

export default usersSlice.reducer;
