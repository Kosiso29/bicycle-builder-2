'use client'

import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        permission: '',
        userEmail: '',
        user: {}
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
        },
        updateUser(state, action) {
            const user = action.payload;
            if (user) {
                state.user = user;
            }
        },
    }
})

export const authActions = authSlice.actions;