import { createSlice } from '@reduxjs/toolkit';
import { createOrderThunk, getOrderByIdThunk, updateOrderThunk, getOrdersThunk, deleteOrderThunk } from './OrderThunks';
import type { OrderResponse } from '../../interface/OrdersRespones';

interface OrderState {
  orders: OrderResponse[];
  order: {
    id?: number;
    buyer_id: number;
    order_code: string;
    total: number;
    created_at: string;
    paid_at: string;
    status: boolean;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchKeyword: string;
  isEditing: boolean;
}

const innerValue = {
  buyer_id: 0,
  order_code: '',
  total: 0,
  created_at: '',
  paid_at: '',
  status: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [] as OrderResponse[],
    order: innerValue, 
    status: 'idle',
    error: null as string | null,
    searchKeyword: '',
    isEditing: false,
  } as OrderState,
  reducers: {
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    handleChange: (state, action) => {
      state.order = {
        ...state.order,
        ...action.payload,
      };
    }, 
    setOrders: (state, action) => {
      state.order = {
        ...state.order,
        ...action.payload,
      };
    },
    resetOrder: (state) => {
      state.order = innerValue;
      state.isEditing = false;
      state.error = null;
    },
    setEditingMode: (state, action) => {
      state.isEditing = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL ORDERS
      .addCase(getOrdersThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Lỗi khi tải danh sách order';
      })

      // CREATE ORDER
      .addCase(createOrderThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.status = 'succeeded';
        state.error = null;
        state.order = innerValue; // Reset form
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Lỗi khi tạo order';
      })

      // GET BY ID
      .addCase(getOrderByIdThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getOrderByIdThunk.fulfilled, (state, action) => {
        state.order = {
          ...state.order,
          ...action.payload,
        };
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(getOrderByIdThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Lỗi khi tải thông tin order';
      })

      // UPDATE ORDER
      .addCase(updateOrderThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateOrderThunk.fulfilled, (state, action) => {            
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        state.order = innerValue; // Reset form
        state.isEditing = false;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(updateOrderThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Lỗi khi cập nhật order';
      })

        // DELETE ORDER
      .addCase(deleteOrderThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteOrderThunk.fulfilled, (state, action) => {
        state.orders = state.orders.filter((item) => item.id !== action.payload.id);
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(deleteOrderThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Lỗi khi xóa order';
      });
  },
});

export const { 
  setSearchKeyword, 
  handleChange, 
  setOrders, 
  resetOrder, 
  setEditingMode, 
  clearError 
} = orderSlice.actions;
export default orderSlice.reducer;   