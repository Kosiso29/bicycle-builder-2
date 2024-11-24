'use client'

import { configureStore } from "@reduxjs/toolkit";
import { componentsSlice } from "./components";
import { authSlice } from "./auth";
import { usersSlice } from "./users";
import { builderSlice } from "./builder";
import { regionSlice } from "./region";
import { paymentSlice } from "./payment";

const store = configureStore({
    reducer: {
        componentsReducer: componentsSlice.reducer,
        authReducer: authSlice.reducer,
        usersReducer: usersSlice.reducer,
        builderReducer: builderSlice.reducer,
        regionReducer: regionSlice.reducer,
        paymentReducer: paymentSlice.reducer,
    }
})

export default store;
export type IRootState = ReturnType<typeof store.getState>;