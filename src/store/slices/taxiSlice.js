import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:9090/api/taxi/';

export const fetchTaxis = createAsyncThunk('taxi/fetchTaxis', async () => {
    try {
        console.log('CALL API: ' + apiUrl);
        const response = await axios.get(apiUrl);
        return [...response.data];
    } catch (error) {
        return error.message;
    }
});

export const taxiSlice = createSlice({
    name: 'taxi',
    initialState: {
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'

        taxis: null,

        errorTaxis: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // taxi/fetchTaxis
        builder.addCase(fetchTaxis.pending, (state) => {
            state.login = 'loading';
        });
        builder.addCase(fetchTaxis.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.taxis = action.payload;
        });
        builder.addCase(fetchTaxis.rejected, (state, action) => {
            state.status = 'failed';
            state.errorTaxis = action.payload.data;
        });
    },
});

export const selectStatus = (state) => state.taxi.status;
export const selectTaxis = (state) => state.taxi.taxis;
export const selectErrorTaxis = (state) => state.taxi.errorTaxis;

export default taxiSlice.reducer;
