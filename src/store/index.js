import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice.js';
import requestsReducer from './slices/requestsSlice.js';
import taxiReducer from './slices/taxiSlice.js';
import driverReducer from './slices/driverSlice.js';
import hailingReducer from './slices/hailingSlice.js';
import locationReducer from './slices/locationSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        taxi: taxiReducer,
        requests: requestsReducer,
        hailing: hailingReducer,
        location: locationReducer,
        driver: driverReducer,
    },
});
