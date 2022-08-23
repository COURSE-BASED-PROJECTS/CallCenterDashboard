import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { locationAPI } from '../../service/API';

export const fetchLocations = createAsyncThunk('location/fetchLocations', async () => {
    try {
        console.log('CALL API: ' + locationAPI);
        const response = await axios.get(locationAPI);
        console.log(response.data);
        return [...response.data];
    } catch (error) {
        console.log(error);
        return error.message;
    }
});

export const locationSlice = createSlice({
    name: 'location',
    initialState: {
        statusFetchLocations: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        locations: null,
        errorFetchLocations: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        // location/fetchLocations
        builder.addCase(fetchLocations.pending, (state) => {
            state.statusFetchLocations = 'loading';
        });
        builder.addCase(fetchLocations.fulfilled, (state, action) => {
            state.statusFetchLocations = 'succeeded';
            state.locations = action.payload;
        });
        builder.addCase(fetchLocations.rejected, (state, action) => {
            state.statusFetchLocations = 'failed';
            state.errorFetchLocations = action.payload.data;
        });
    },
});

export const selectStatusFetchLocations = (state) => state.location.statusFetchLocations;
export const selectLocations = (state) => state.location.locations;
export const selectErrorFetchLocations = (state) => state.location.errorFetchLocations;

export default locationSlice.reducer;
