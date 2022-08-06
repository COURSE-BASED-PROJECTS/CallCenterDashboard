import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://localhost:9090/auth/';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (data, { rejectWithValue }) => {
        try {
            console.log('CALL API: ' + apiUrl + 'login');
            console.log(data);

            const response = await axios.post(apiUrl + 'login', data);
            console.log(response);

            if (response.status < 200 || response.status >= 300) {
                return rejectWithValue(response.data);
            }

            return response.data;
        } catch (error) {
            console.log(error.response);
            return rejectWithValue(error.response);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'

        currentUser: null,

        errorLogin: null,
    },
    reducers: {
        logout: (state) => {
            state.currentUser = null;
            state.errorLogin = null;
            state.login = 'idle';
        },
    },
    extraReducers: (builder) => {
        // auth/loginUser
        builder.addCase(loginUser.pending, (state) => {
            state.login = 'loading';
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.login = 'succeeded';
            state.currentUser = action.payload;
            console.log(state.currentUser);
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.login = 'failed';
            state.errorLogin = action.payload.data;
        });
    },
});

export const selectLogin = (state) => state.auth.login;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectErrorLogin = (state) => state.auth.errorLogin;

export const { logout } = authSlice.actions;

export default authSlice.reducer;
