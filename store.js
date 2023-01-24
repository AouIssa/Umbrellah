import { configureStore } from '@reduxjs/toolkit';
import navReducer from './slices/navSlice.js';
import balanceReducer from './slices/balanceSlice.js';
import balanceSlice from './slices/balanceSlice.js';

export const store = configureStore({
  reducer: {
    nav: navReducer,
    balance: balanceReducer,
  },
});
