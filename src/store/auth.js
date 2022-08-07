import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, res) {
      state.isAuthenticated = true;
      state.token = res.payload.token;
      localStorage.setItem(
        "userData",
        JSON.stringify({ token: res.payload.token })
      );
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("userData");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
