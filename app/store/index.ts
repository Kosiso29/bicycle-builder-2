'use client'

import { configureStore } from "@reduxjs/toolkit";
import { componentsSlice } from "./components";
import { authSlice } from "./auth";
import { usersSlice } from "./users";

const store = configureStore({
    reducer: {
        componentsReducer: componentsSlice.reducer,
        authReducer: authSlice.reducer,
        usersReducer: usersSlice.reducer
    }
})

export default store;