import { configureStore, combineReducers } from '@reduxjs/toolkit'
import cartSlice from './cartSlice';

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ReturnType<typeof store.dispatch>

export default store;