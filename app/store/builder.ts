'use client'

import { createSlice } from "@reduxjs/toolkit";

export const builderSlice = createSlice({
    name: 'builder',
    initialState: {
        buildStart: false,
        selectedFeatureBuild: ""
    },
    reducers: {
        updatebuildStart(state, action) {
            const buildStart = action.payload;
            state.buildStart = buildStart;
        },
        updateSelectedFeatureBuild(state, action) {
            const selectedFeatureBuild = action.payload;
            state.selectedFeatureBuild = selectedFeatureBuild;
        },
    }
})

export const builderActions = builderSlice.actions;