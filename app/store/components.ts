'use client'

import { configureStore, createSlice } from "@reduxjs/toolkit";

const componentsSlice = createSlice({
    name: 'components',
    initialState: {
        models: [],
        categories: [],
        brands: []
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
    }
});

const store = configureStore({ reducer: { componentsReducer: componentsSlice.reducer } })

export const componentsActions = componentsSlice.actions;

export default store;