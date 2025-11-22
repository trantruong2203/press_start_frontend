import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderById, createOrder, updateOrder, deleteOrder, fetchAllOrders } from "./OrderApi";
import type { OrderCreate, OrderResponse } from "../../interface/OrdersRespones";
import { handleApiError } from "../../utils/errorHandler";

// Lấy tất cả order
export const getOrdersThunk = createAsyncThunk<OrderResponse[], void, { rejectValue: string }>(
  'order/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllOrders();
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

// Lấy order theo ID
export const getOrderByIdThunk = createAsyncThunk<OrderResponse, number, { rejectValue: string }>(
  'order/getById',
  async (id, { rejectWithValue }) => {
    try {
      return await getOrderById(id);
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

// Tạo order mới
export const createOrderThunk = createAsyncThunk<OrderResponse, OrderCreate, { rejectValue: string }>(
  'order/create',
  async (order, { rejectWithValue }) => {
    try {
      return await createOrder(order);
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

// Cập nhật order
export const updateOrderThunk = createAsyncThunk<OrderResponse, {id: number, order: OrderResponse}, { rejectValue: string }>(
  'order/update',
  async ({id, order}, { rejectWithValue }) => {
    try {
      const response = await updateOrder(id, order);
      return response;
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

// Xóa order
export const deleteOrderThunk = createAsyncThunk<OrderResponse, number, { rejectValue: string }>(
  'order/delete',
  async (id, { rejectWithValue }) => {
    try {
      return await deleteOrder(id);
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);
