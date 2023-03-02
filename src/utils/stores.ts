import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { sessionSlice } from '@/slices/session.slice';
import { configureStore } from '@reduxjs/toolkit';

export function makeStore() {
  return configureStore({
    reducer: {
      session: sessionSlice.reducer
    }
  });
}

const store = makeStore();
export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
