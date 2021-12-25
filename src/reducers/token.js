import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: null
  },
  reducers: {
    logout: state => {
      state.value = null;
    },
    login: state => {
      state.value = 'token'
    }
  }
});

export const { login, logout } = tokenSlice.actions;

export default tokenSlice.reducer;