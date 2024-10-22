'use client'

import { createSlice } from "@reduxjs/toolkit";

export const builderSlice = createSlice({
    name: 'builder',
    initialState: {
        loadingScreen: false,
        buildStart: false,
        selectedFeatureBuild: ""
    },
    reducers: {
        updateloadingScreen(state, action) {
            const loadingScreen = action.payload;
            state.loadingScreen = loadingScreen;
        },
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