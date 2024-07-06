// reducers/userReducer.js
import { createReducer } from "@reduxjs/toolkit";
import { setUser, clearUser, toggleTableRefresh } from "./slicer";

// Initial state for the user
const initialState = {
  email: "",
  id: null,
  token: "",
  refreshTable: false,
};

// Create a reducer using createReducer from Redux Toolkit
export const userReducer = createReducer(initialState, (builder) => {
  console.log("Initial User State:", initialState);
  builder
    .addCase(setUser, (state, action) => {
      console.log(action.payload);
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.token = action.payload.token;
      console.log("User State after setUser:", state);
      console.log("User action after setUser:", action.payload);
    })
    .addCase(clearUser, (state) => {
      state.id = initialState.id;
      state.email = initialState.email;
      state.token = initialState.token;
    })
    .addCase(toggleTableRefresh, (state) => {
      state.refreshTable = !state.refreshTable;
    });
});
