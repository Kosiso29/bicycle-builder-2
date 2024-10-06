'use client'

import { configureStore } from "@reduxjs/toolkit";
import { componentsSlice } from "./components";
import { authSlice } from "./auth";
import { usersSlice } from "./users";
import { builderSlice } from "./builder";

const store = configureStore({
    reducer: {
        componentsReducer: componentsSlice.reducer,
        authReducer: authSlice.reducer,
        usersReducer: usersSlice.reducer,
        builderReducer: builderSlice.reducer
    }
})

export default store;