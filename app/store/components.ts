'use client'

import { createSlice } from "@reduxjs/toolkit";

export const componentsSlice = createSlice({
    name: 'components',
    initialState: {
        models: [],
        categories: [],
        brands: [],
        presets: [],
        modelsPresets: []
    },
    reducers: {
        updateModels(state, actions) {
            const models = actions.payload;
            if (models) {
                state.models = models;
            }
        },
        updateCategories(state, actions) {
            const categories = actions.payload;
            if (categories) {
                state.categories = categories;
            }
        },
        updateBrands(state, actions) {
            const brands = actions.payload;
            if (brands) {
                state.brands = brands;
            }
        },
        updatePresets(state, actions) {
            const presets = actions.payload;
            if (presets) {
                state.presets = presets;
            }
        },
        updateModelsPresets(state, actions) {
            const modelsPresets = actions.payload;
            if (modelsPresets) {
                state.modelsPresets = modelsPresets;
            }
        },
    }
});

export const componentsActions = componentsSlice.actions;