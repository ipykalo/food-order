import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../reducers/token";
import createStore from "react-redux"

export default configureStore({
  reducer: {
    token: tokenReducer
  }
});

//export default createStore({})