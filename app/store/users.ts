'use client'

import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: []
    },
    reducers: {
        updateUsers(state, action) {
            const users = action.payload;
            if (users) {
                state.users = users;
            }
        }
    }
})

export const usersActions = usersSlice.actions;