import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  token: null,
  uId: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, res) {
      state.isAuthenticated = true;
      state.token = res.payload.token;
      state.uId = res.payload.uId;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.uId = null;
      localStorage.removeItem("userData");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
