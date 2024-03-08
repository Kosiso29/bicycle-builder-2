'use client'

import { configureStore, createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: []
    },
    reducers: {
        updateCategories(state, actions) {
            const categories = actions.payload;
            if (categories) {
                state.categories = categories;
            }
        }
    }
});

const store = configureStore({ reducer: { categoriesReducer: categoriesSlice.reducer } })

export const categoriesActions = categoriesSlice.actions;

export default store;