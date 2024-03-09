'use client'

import { configureStore, createSlice } from "@reduxjs/toolkit";

const componentsSlice = createSlice({
    name: 'components',
    initialState: {
        models: []
    },
    reducers: {
        updateModels(state, actions) {
            const models = actions.payload;
            if (models) {
                state.models = models;
            }
        }
    }
});

const store = configureStore({ reducer: { componentsReducer: componentsSlice.reducer } })

export const componentsActions = componentsSlice.actions;

export default store;