import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: localStorage.getItem('token')
  },
  reducers: {
    removeToken: state => {
      localStorage.removeItem('token');
      state.value = null;
    },
    setToken: (state, action) => {
      action.payload && localStorage.setItem('token', action.payload);
      state.value = action.payload;
    }
  }
});

export const { setToken, removeToken } = tokenSlice.actions;

export default tokenSlice.reducer;