import { createSlice } from "@reduxjs/toolkit";

const recordSlice = createSlice({
  name: "record",
  initialState: {
    records: [],
  },
  reducers: {
    getRecords(state, res) {
      state.records = [...state.records, res.payload];
    },
  },
});

export const recordActions = recordSlice.actions;

export default recordSlice.reducer;
