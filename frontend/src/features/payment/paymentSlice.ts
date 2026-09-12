import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/axios';

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  recipientId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface PaymentState {
  items: Payment[];
  loading: boolean;
  error: string | null;
  creating: boolean;
  createError: string | null;
}

const initialState: PaymentState = {
  items: [],
  loading: false,
  error: null,
  creating: false,
  createError: null,
};

export const fetchPayments = createAsyncThunk<
  Payment[],
  void,
  { rejectValue: string }
>(
  'payment/fetchPayments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/payments');
      return response.data as Payment[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ?? 'Unable to fetch payments.'
      );
    }
  }
);

export const createPayment = createAsyncThunk<
  Payment,
  { amount: number; currency: string; recipientId: string },
  { rejectValue: string }
>(
  'payment/createPayment',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post('/payments', payload);
      return response.data as Payment;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ?? 'Unable to create payment.'
      );
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unable to fetch payments.';
      })
      .addCase(createPayment.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.creating = false;
        state.items = [action.payload, ...state.items];
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload ?? 'Unable to create payment.';
      });
  },
});

export default paymentSlice.reducer;
