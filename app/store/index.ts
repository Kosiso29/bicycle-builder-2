'use client'

import { configureStore } from "@reduxjs/toolkit";
import { componentsSlice } from "./components";
import { authSlice } from "./auth";

const store = configureStore({ reducer: { componentsReducer: componentsSlice.reducer, authReducer: authSlice.reducer } })

export default store;