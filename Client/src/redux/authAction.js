import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const base_url = "https://lama-shop-307rishbah.vercel.app/api/";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${base_url}auth/register`, {
        username,
        email,
        password,
      });

      return res.data;
    } catch (error) {
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
      const res = await axios.post(`${base_url}auth/login`, {
        username,
        password,
      });

      return res.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
