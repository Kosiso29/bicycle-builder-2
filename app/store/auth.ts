'use client'

import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        permission: '',
        userEmail: ''
    },
    reducers: {
        updatePermission(state, action) {
            const permission = action.payload;
            if (permission) {
                state.permission = permission;
            }
        },
        updateUserEmail(state, action) {
            const userEmail = action.payload;
            if (userEmail) {
                state.userEmail = userEmail;
            }
        }
    }
})

export const authActions = authSlice.actions;