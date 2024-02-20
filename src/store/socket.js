import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    socket: null,

}
const valuesSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocket: (state, action) => {
            state.socket = action.payload;
        },
    },
});

export const { setSocket } = valuesSlice.actions;
export const getSocket = (state) => state.socketReducer.socket;

export default valuesSlice.reducer;