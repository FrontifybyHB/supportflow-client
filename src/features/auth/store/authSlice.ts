import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthSession, User } from "../types/auth.types";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<AuthSession>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    clearSession: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { clearSession, setSession } = authSlice.actions;
export default authSlice.reducer;
