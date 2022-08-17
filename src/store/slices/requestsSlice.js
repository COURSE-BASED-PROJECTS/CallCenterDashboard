import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:9090/api/request/callcenter';

export const fetchRequests = createAsyncThunk(
    'requests/fetchRequests',
    async () => {
        try {
            console.log('CALL API: ' + apiUrl);
            const response = await axios.get(apiUrl);
            return [...response.data];
        } catch (error) {
            return error.message;
        }
    }
);

export const requestsSlice = createSlice({
    name: 'requests',
    initialState: {
        statusFetchRequests: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        requests: null,
        errorFetchRequests: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        // requests/fetchRequests
        builder.addCase(fetchRequests.pending, (state) => {
            state.statusFetchRequests = 'loading';
        });
        builder.addCase(fetchRequests.fulfilled, (state, action) => {
            state.statusFetchRequests = 'succeeded';
            state.requests = action.payload;
            console.log(state.requests);
        });
        builder.addCase(fetchRequests.rejected, (state, action) => {
            state.statusFetchRequests = 'failed';
            state.errorFetchRequests = action.payload.data;
        });
    },
});

export const selectStatusFetchRequests = (state) => state.requests.statusFetchRequests;
export const selectRequests = (state) => state.requests.requests;
export const selectErrorFetchRequests = (state) => state.requests.errorFetchRequests;

export default requestsSlice.reducer;
