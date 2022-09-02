import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  token: null,
  userId: null,
  id: null,
  role: null,
  expiry: null,
  initPassword: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, res) {
      state.isAuthenticated = true;
      state.token = res.payload.token;
      state.userId = res.payload.userId;
      state.id = res.payload.id;
      state.role = res.payload.role;
      state.expiry = res.payload.expiry;
      state.initPassword = res.payload.initPassword;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
      state.id = null;
      state.role = null;
      state.expiry = null;
      state.initPassword = null;
    },
    initPassword(state, res) {
      state.initPassword = res.payload.initPassword;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
