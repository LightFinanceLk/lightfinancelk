import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import accountReducer from "./account";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    user: userReducer,
    // counter:counterReducer
  },
});

export default store;
