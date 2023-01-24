import { createSlice } from '@reduxjs/toolkit';

const initialBalance = 100;

const initialState = {
  balance: initialBalance,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    topUp: (state, action) => {
      state.balance += action.payload;
    },
  },
});

export const { topUp } = balanceSlice.actions;

export default balanceSlice.reducer;
