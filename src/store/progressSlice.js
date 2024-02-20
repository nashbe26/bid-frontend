import { createSlice } from '@reduxjs/toolkit';

const uploadProgressSlice = createSlice({
  name: 'uploadProgress',
  initialState: {
    progress: 0,
  },
  reducers: {
    setUploadProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
});

export const { setUploadProgress } = uploadProgressSlice.actions;
export const selectUploadProgress = (state) => state.uploadReducer.value;

export default uploadProgressSlice.reducer;
