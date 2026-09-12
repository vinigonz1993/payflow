import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import paymentReducer from '../features/payment/paymentSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        payment: paymentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;