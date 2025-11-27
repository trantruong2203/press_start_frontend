import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllUsers, getUserByAccount, login, register, updatePassword, updateUser } from "./UsersApi";
import type { LoginRequest, LoginResponse, UserResponse } from "../../interface/UserResponse";
import { handleApiError } from "../../utils/errorHandler";

// Lấy tất cả user
export const getUsers = createAsyncThunk<UserResponse[], void, { rejectValue: string }>(
  'user/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllUsers();
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

// Lấy user theo email
export const getUserByAccountThunk = createAsyncThunk<UserResponse, string, { rejectValue: string }>(
  'user/getUserByAccount',
  async (email, { rejectWithValue }) => {
    try {
      return await getUserByAccount(email);
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

// Đăng nhập
export const loginUser = createAsyncThunk<LoginResponse, LoginRequest, { rejectValue: string }>(
  'user/login',
  async (account, { rejectWithValue }) => {
    try {
      return await login(account);
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

// Đăng ký
export const createUser = createAsyncThunk<UserResponse, UserResponse, { rejectValue: string }>(
  'user/create',
  async (account, { rejectWithValue }) => {
    try {
      await register(account);
      return account;
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

// Cập nhật user
export const updateUserThunk = createAsyncThunk<UserResponse, {email: string, phone: string, avatar: string}, { rejectValue: string }>(
  'user/update',
  async ({email, phone, avatar}, { rejectWithValue }) => {
    try {
      return await updateUser(email, phone, avatar);
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

// Cập nhật mật khẩu
export const updatePasswordThunk = createAsyncThunk<UserResponse, {email: string, password: string}, { rejectValue: string }>(
  'user/updatePassword',
  async ({email, password}, { rejectWithValue }) => {
    try {
      return await updatePassword(email, password);
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);
