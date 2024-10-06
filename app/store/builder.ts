'use client'

import { createSlice } from "@reduxjs/toolkit";

export const builderSlice = createSlice({
    name: 'builder',
    initialState: {
        buildStart: false
    },
    reducers: {
        updatebuildStart(state, action) {
            const buildStart = action.payload;
            state.buildStart = buildStart;
        }
    }
})

export const builderActions = builderSlice.actions;