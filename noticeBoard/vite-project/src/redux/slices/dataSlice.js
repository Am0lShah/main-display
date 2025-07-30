import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "dataSet",
  initialState: {
    data: []
  },
  reducers: {
    setData: (state, action) => {
      console.log(action.payload);
      state.data = action.payload;
    },
    addData: (state, action) => {
      state.data.push(action.payload);
    }
  }
});

export const { setData, addData } = authSlice.actions;
export default authSlice.reducer;
