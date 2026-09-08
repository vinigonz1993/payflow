import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

interface User {
    id: string;
    email: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    loading: false,
    error: null,
};

export const register = createAsyncThunk(
    'auth/register',
    async (
        credentials: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try{
            const response = await api.post('/auth/register', credentials);
            const { accessToken, user } = response.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('user', JSON.stringify(user));

            return { accessToken, user };
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (
        credentials: { email: string; password: string },
        { rejectWithValue }
    ) => {
        console.log('Logging in with credentials:', credentials);
        try {
            const response = await api.post('/auth/login', credentials);
            const { accessToken, user } = response.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('user', JSON.stringify(user));

            return { accessToken, user };
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null,
            state.accessToken = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;