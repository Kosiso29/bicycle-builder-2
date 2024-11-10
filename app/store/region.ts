'use client'

import { createSlice } from "@reduxjs/toolkit";

export const regionSlice = createSlice({
    name: 'region',
    initialState: {
        region: "sg"
    },
    reducers: {
        updateregion(state, action) {
            const region = action.payload;
            state.region = region;
        }
    }
})

export const regionActions = regionSlice.actions;