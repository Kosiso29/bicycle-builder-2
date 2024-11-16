'use client'

import { createSlice } from "@reduxjs/toolkit";

const countryCurrencyMapping: any = {
    "us": { symbol: "$", currencyCode: "USD", countryCode: "US" },
    "sg": { symbol: "$", currencyCode: "SGD", countryCode: "SG" },
    "gb": { symbol: "£", currencyCode: "GBP", countryCode: "GB" },
    "in": { symbol: "₹", currencyCode: "INR", countryCode: "IN" },
}

export const regionSlice = createSlice({
    name: 'region',
    initialState: {
        region: "us",
        currencySymbol: "$",
        currencyCode: "USD",
        countryCode: "US"
    },
    reducers: {
        updateRegion(state, action) {
            const region = action.payload;
            state.region = region;
            state.currencySymbol = countryCurrencyMapping[region].symbol;
            state.currencyCode = countryCurrencyMapping[region].currencyCode;
            state.countryCode = countryCurrencyMapping[region].countryCode;
        }
    }
})

export const regionActions = regionSlice.actions;