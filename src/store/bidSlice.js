import { createSlice } from '@reduxjs/toolkit';

const bidSlice = createSlice({
  name: 'uploadProgress',
  initialState: {
    bid:{
        amount:null,
        message_bid:[],
        prod_id:null,
        winner_id:null,
        owner:null,
        last_amount:null,
        mode:null,
        status:null
    },
    countdown:15,
    search:[],
    last_amount:null
  },
  reducers: {
    setBidCreated: (state, action) => {
      state.bid = action.payload;
    },
    setAmountLast: (state, action) => {
      state.last_amount = action.payload;
    },
    addNewBid: (state, action) => {
        console.log(action.payload);
        state.bid.message_bid.unshift(action.payload);
    },
    addSumAmount: (state, action) => {
        state.bid.amount += parseInt(action.payload);
    },
    getCountDown: (state, action) => {
        state.bid.amount = action.payload;
    },
    getStatusCount: (state, action) => {
        state.bid.status = action.payload;
    },
    setWinnerBidUser: (state, action) => {
        state.bid.winner = action.payload;
    },
    setSearchBid: (state, action) => {
        state.search = action.payload;
    },
  },
});

export const { setBidCreated,addNewBid,addSumAmount,getCountDown,getStatusCount,setWinnerBidUser,setSearchBid,setAmountLast} = bidSlice.actions;
export const selectBid = (state) => state.bidReducer.bid;
export const selectCount = (state) => state.bidReducer.countdown;
export const selectSearch = (state) => state.bidReducer.search;
export const selectPrice = (state) => state.bidReducer.last_amount;

export default bidSlice.reducer;
