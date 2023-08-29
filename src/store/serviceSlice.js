import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    userName: "",

    authToken: localStorage.getItem("authToken")
      ? localStorage.getItem("authToken")
      : "",
  },
  reducers: {
    setToken: (state, action) => {
      state.authToken = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setRefetchArticlesFnc: (state, action) => {
      state.refetchArticlesFnc = action.payload;
    },
  },
});

export default serviceSlice;
