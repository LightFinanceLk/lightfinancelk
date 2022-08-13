import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    accounts: [],
  },
  reducers: {
    getAccounts(state, res) {
      state.accounts = res.payload;
    },
  },
});

export const accountActions = accountSlice.actions;

export default accountSlice.reducer;
