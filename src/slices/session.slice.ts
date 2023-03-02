import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '@/utils/stores';
import { signIn } from '@/services/api';

export interface SessionState {
  jwt: string | null;
  status: 'loading' | 'idle';
}

const initialState = {
  jwt: null,
  status: 'loading',
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setJwt: (state, action) => {
      state.jwt = action.payload;
      state.status = 'idle';

      localStorage.setItem('jwt', action.payload);
    },
    clear: (state) => {
      state.jwt = null;
      state.status = 'idle';

      localStorage.removeItem('jwt');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.jwt = action.payload.result;
        state.status = 'idle';
      });
  },
});

export const loginAsync = createAsyncThunk(
  'session/signIn',
  async (payload: { email: string; password: string }) => {
    const response = await signIn(payload.email, payload.password);
    return response;
  }
);

export const { setJwt, clear } = sessionSlice.actions;
export const selectSession = (state: AppState) => state.session;
