'use client'

import { createSlice } from "@reduxjs/toolkit";

export const regionSlice = createSlice({
    name: 'region',
    initialState: {
        region: "us"
    },
    reducers: {
        updateRegion(state, action) {
            const region = action.payload;
            state.region = region;
        }
    }
})

export const regionActions = regionSlice.actions;