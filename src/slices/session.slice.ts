import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '@/utils/stores';

export interface SessionState {
  jwt: string | null;
  status: 'loading' | 'idle';
}

const initialState: SessionState = {
  jwt: null,
  status: 'loading'
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setJwt: (state, action) => {
      state.jwt = action.payload;
      state.status = 'idle';

      localStorage.setItem('jwt', action.payload as string);
    },
    clear: (state) => {
      state.jwt = null;
      state.status = 'idle';

      localStorage.removeItem('jwt');
    }
  }
});

export const { setJwt, clear } = sessionSlice.actions;
export const selectSession = (state: AppState) => state.session;
