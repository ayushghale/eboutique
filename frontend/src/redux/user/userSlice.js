import { createSlice } from "@reduxjs/toolkit";
import {
  clearUserData,
  getUserData,
  setUserData,
} from "../../utils/authStorage.utils.js";

const initialState = {
  value: 0,
  token: getUserData().token,
  userData: getUserData().userData,
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },

    setData: (state, action) => {
      console.log(action.payload);

      setUserData({
        userData: action.payload.userData,
        token: action.payload.token,
      });
      state.token = action.payload.token;
      state.userData = action.payload.userData;
    },

    clearData: (state) => {
      clearUserData();

      state.token = undefined;
      state.userData = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setData, clearData } =
  counterSlice.actions;

export default counterSlice.reducer;
