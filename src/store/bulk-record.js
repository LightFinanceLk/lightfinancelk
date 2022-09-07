import { createSlice } from "@reduxjs/toolkit";

const bulkRecordSlice = createSlice({
  name: "bulkRecord",
  initialState: {
    bulkRecords: [],
  },
  reducers: {
    getBulkRecords(state, res) {
      state.bulkRecords = res.payload;
    },
  },
});

export const bulkRecordActions = bulkRecordSlice.actions;

export default bulkRecordSlice.reducer;
