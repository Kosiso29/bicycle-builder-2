'use client'

import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        country: "",
        phone: "",
        postalCode: ""
    },
    reducers: {
        updateEmail(state, action) {
            const email = action.payload;
            state.email = email;
        },
        updateFirstName(state, action) {
            const firstName = action.payload;
            state.firstName = firstName;
        },
        updateAddress(state, action) {
            const address = action.payload;
            state.address = address;
        },
        updateCity(state, action) {
            const city = action.payload;
            state.city = city;
        },
        updateState(state, action) {
            const stateValue = action.payload;
            state.state = stateValue;
        },
        updateCountry(state, action) {
            const country = action.payload;
            state.country = country;
        },
        updatePostalCode(state, action) {
            const postalCode = action.payload;
            state.postalCode = postalCode;
        },
    }
})

export const paymentActions = paymentSlice.actions;