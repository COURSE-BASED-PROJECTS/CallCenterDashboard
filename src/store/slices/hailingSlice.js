import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { hailingAPI } from 'service/API';

export const fetchListOfHailing = createAsyncThunk('hailing/fetchListOfHailing', async () => {
    try {
        console.log('CALL API: ' + hailingAPI);
        const response = await axios.get(hailingAPI);
        return [...response.data];
    } catch (error) {
        return error.message;
    }
});

export const hailingSlice = createSlice({
    name: 'hailing',
    initialState: {
        statusFetchHailing: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        listHailing: null,
        errorFetchHailing: null,
    },
    reducers: {
        setTravelInfomation: (state, action) => {
            state.travelInformation = {
                ...state.travelInformation,
                ...action.payload,
            };
        },
        setStatusPackage: (state, action) => {
            state.statusPackage = action.payload;
        },
    },

    extraReducers: (builder) => {
        // hailing/fetchListOfHailing
        builder.addCase(fetchListOfHailing.pending, (state) => {
            state.statusFetchHailing = 'loading';
        });
        builder.addCase(fetchListOfHailing.fulfilled, (state, action) => {
            state.statusFetchHailing = 'succeeded';
            state.listHailing = action.payload;
        });
        builder.addCase(fetchListOfHailing.rejected, (state, action) => {
            state.statusFetchHailing = 'failed';
            state.errorFetchListOfHailing = action.payload.data;
        });
    },
});

export const selectStatusFetchHailing = (state) => state.hailing.statusFetchHailing;
export const selectListHailing = (state) => state.hailing.listHailing;
export const selectErrorFetchListOfHailing = (state) => state.hailing.errorFetchListOfHailing;

export const { setTravelInfomation, setStatusPackage } = hailingSlice.actions;
export const hailingSelector = (state) => state.hailing;

export default hailingSlice.reducer;
