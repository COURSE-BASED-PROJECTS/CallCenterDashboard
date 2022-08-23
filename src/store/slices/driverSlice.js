import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { driverAPI } from 'service/API';

export const fetchDrivers = createAsyncThunk('driver/fetchDrivers', async () => {
    try {
        console.log('CALL API: ' + driverAPI);
        const response = await axios.get(driverAPI);
        return [...response.data];
    } catch (error) {
        console.log(error);
        return error.message;
    }
});

export const fetchDriver = createAsyncThunk('driver/fetchDriver', async (id) => {
    try {
        console.log('CALL API: ' + driverAPI + id);
        const response = await axios.get(driverAPI + id);
        return [...response.data];
    } catch (error) {
        console.log(error);
        return error.message;
    }
});

export const driverSlice = createSlice({
    name: 'driver',
    initialState: {
        statusFetchDrivers: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        drivers: null,
        errorFetchDrivers: null,

        statusFetchDriver: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        driver: null,
        errorFetchDriver: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // driver/fetchDrivers
        builder.addCase(fetchDrivers.pending, (state) => {
            state.statusFetchDrivers = 'loading';
        });
        builder.addCase(fetchDrivers.fulfilled, (state, action) => {
            state.statusFetchDrivers = 'succeeded';
            state.drivers = action.payload;
        });
        builder.addCase(fetchDrivers.rejected, (state, action) => {
            state.statusFetchDrivers = 'failed';
            state.errorFetchDrivers = action.payload.data;
        });

        // driver/fetchDriver
        builder.addCase(fetchDriver.pending, (state) => {
            state.statusFetchDriver = 'loading';
        });
        builder.addCase(fetchDriver.fulfilled, (state, action) => {
            state.statusFetchDriver = 'succeeded';
            state.driver = action.payload;
        });
        builder.addCase(fetchDriver.rejected, (state, action) => {
            state.statusFetchDriver = 'failed';
            state.errorFetchDriver = action.payload.data;
        });
    },
});

export const selectStatusFetchDrivers = (state) => state.driver.statusFetchDrivers;
export const selectDrivers = (state) => state.driver.drivers;
export const selectErrorFetchDrivers = (state) => state.driver.errorFetchDrivers;

export const selectStatusFetchDriver = (state) => state.driver.statusFetchDriver;
export const selectDriver = (state) => state.driver.driver;
export const selectErrorFetchDriver = (state) => state.driver.errorFetchDriver;

export default driverSlice.reducer;
