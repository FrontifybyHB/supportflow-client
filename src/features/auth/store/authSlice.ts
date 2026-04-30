import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_COOKIE } from "@/lib/api/httpClient";
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
      Cookies.set(ACCESS_TOKEN_COOKIE, action.payload.accessToken, {
        expires: 7,
        sameSite: "strict",
      });
    },
    clearSession: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      Cookies.remove(ACCESS_TOKEN_COOKIE);
    },
  },
});

export const { clearSession, setSession } = authSlice.actions;
export default authSlice.reducer;
