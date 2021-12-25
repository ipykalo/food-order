import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    tokenData: JSON.parse(localStorage.getItem('tokenData'))
  },
  reducers: {
    removeToken: state => {
      localStorage.removeItem('tokenData');
      state.tokenData = null;
    },
    setToken: (state, action) => {
      action.payload && localStorage.setItem('tokenData', JSON.stringify(action.payload));
      state.tokenData = action.payload;
    }
  }
});

export const { setToken, removeToken } = tokenSlice.actions;

export default tokenSlice.reducer;