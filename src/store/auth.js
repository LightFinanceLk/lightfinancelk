import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  token: null,
  uId: null,
  role: null,
  expiry: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, res) {
      state.isAuthenticated = true;
      state.token = res.payload.token;
      state.uId = res.payload.uId;
      state.role = res.payload.role;
      state.expiry = res.payload.expiry;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.uId = null;
      state.role = null;
      state.expiry = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
