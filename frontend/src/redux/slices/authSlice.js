import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk for API Calls
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, thunkAPI) => {
  try {
    const response = await axios.post("/api/auth/login", userData);
    localStorage.setItem("token", response.data.token); // Store token
    localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const savedUser= JSON.parse(localStorage.getItem("user"))

const authSlice = createSlice({
  name: "user",
  initialState: {
    user: savedUser || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {

    logout: (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },
    setUser:(state,action)=>{
      state.user=null;
      console.log(action.payload);
      
      localStorage.setItem("user",JSON.stringify(action.payload))
      window.location.href='/'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setUser, logout } = authSlice.actions;
export default authSlice.reducer;
