'use client'

import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        email: ""
    },
    reducers: {
        updateEmail(state, action) {
            const email = action.payload;
            state.email = email;
        }
    }
})

export const paymentActions = paymentSlice.actions;