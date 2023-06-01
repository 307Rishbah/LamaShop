import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authAction";

const userToken = localStorage.getItem("accessToken")
  ? localStorage.getItem("accessToken")
  : null;

const initialState = {
  isLoading: false,
  userInfo: null, // for user object
  userToken,
  isError: null,
  isSuccess: false, // for register process
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.isLoading = false;
      state.userInfo = null;
      state.isError = null;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    //register user

    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true; //registration Successfull
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    //login user

    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload;
      state.userToken = action.payload.accessToken;
      state.isSuccess = true; //signUp Successfull
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
