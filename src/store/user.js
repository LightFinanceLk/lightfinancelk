import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    advisor: "",
    city: "",
    dob: "",
    firstName: "",
    gender: "",
    lastName: "",
    maritalStatus: "",
    occupation: "",
    phone: "",
  },
  reducers: {
    getUser(state, res) {
      state.advisor = res.payload.advisor;
      state.city = res.payload.city;
      state.dob = res.payload.dob;
      state.firstName = res.payload.firstName;
      state.gender = res.payload.gender;
      state.lastName = res.payload.lastName;
      state.maritalStatus = res.payload.maritalStatus;
      state.occupation = res.payload.occupation;
      state.phone = res.payload.phone;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
