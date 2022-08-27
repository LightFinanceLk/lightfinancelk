import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import accountReducer from "./account";

const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    // counter:counterReducer
  },
});

export default store;
