'use client'

import { createSlice } from "@reduxjs/toolkit";

export const componentsSlice = createSlice({
    name: 'components',
    initialState: {
        models: [],
        categories: [],
        brands: [],
        presets: [],
        modelsPresets: [],
        colors: [],
        accessories: [],
        accessoryModels: []
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
        updateColors(state, actions) {
            const colors = actions.payload;
            if (colors) {
                state.colors = colors;
            }
        },
        updateAccessories(state, actions) {
            const accessories = actions.payload;
            if (accessories) {
                state.accessories = accessories;
            }
        },
        updateAccessoryModels(state, actions) {
            const accessoryModels = actions.payload;
            if (accessoryModels) {
                state.accessoryModels = accessoryModels;
            }
        },
    }
});

export const componentsActions = componentsSlice.actions;