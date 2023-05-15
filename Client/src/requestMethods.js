import axios from "axios";

const BASE_URL = "https://lama-shop-307rishbah.vercel.app/api/";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth)
//   .userInfo.accessToken;
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjZlZWNjM2VjNzJjOWU0NDY4ZTM3NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MjYyMTMyNSwiZXhwIjoxNjgyODgwNTI1fQ.qypRXbcJozprzOercNdMJf_wzW5YzU2rrMrWwj2xABo";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
