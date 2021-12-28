import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../reducers/token";

export default configureStore({
  reducer: {
    token: tokenReducer
  }
});