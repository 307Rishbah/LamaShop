import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../requestMethods";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      console.log("reg action succezs");
      const res = await publicRequest.post("auth/register", {
        username,
        email,
        password,
      });
      return res.data;
    } catch (error) {
      console.log("reg action err", error);
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      console.log("login action succezs");
      const { data } = await publicRequest.post("auth/login", {
        username,
        password,
      });
      // store user's token in local storage
      // localStorage.setItem("userToken", data.userToken);

      return data;
    } catch (error) {
      console.log("login action err", error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
