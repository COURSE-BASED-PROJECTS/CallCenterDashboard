import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice.js';
import taxiSlice from './slices/taxiSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        taxi: taxiSlice,
    },
});
