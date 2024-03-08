'use client'

import { Provider } from "react-redux";
import store from "./categories";

export const Providers = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
        {children}
    </Provider>
)