import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import accountReducer from "./account";
import userReducer from "./user";
import bulkRecordReducer from "./bulk-record";
import recordReducer from "./record";

const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    user: userReducer,
    bulkRecord: bulkRecordReducer,
    record: recordReducer,
  },
});

export default store;
