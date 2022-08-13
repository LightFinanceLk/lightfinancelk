import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    accounts: [],
  },
  reducers: {
    setAccounts(state, res) {
      state.accounts = res.payload;
    },
  },
});

export const accountActions = accountSlice.actions;

export default accountSlice.reducer;
