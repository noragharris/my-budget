import { configureStore } from '@reduxjs/toolkit';
import { transactionsReducer } from './reducers';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
