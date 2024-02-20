import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  is_connected:false,
  user: {},
  type:null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.is_connected = true;
    },
    resetUser: (state) => {
      state.user = initialState.user;
      state.is_connected = false;
    },
    setTypeUser: (state, action) => {
        state.type = action.payload ;
      },
  },
});

export const { createUser, resetUser,setTypeUser } = userSlice.actions;
export const selectUser = (state) => state.userReducer.user;
export const selectIsConnected = (state) => state.userReducer.is_connected;
export const selectType = (state) => state.userReducer.type;

export default userSlice.reducer;