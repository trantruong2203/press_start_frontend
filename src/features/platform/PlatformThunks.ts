import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPlatformById, createPlatform, updatePlatform, deletePlatform, fetchAllPlatforms } from "./PlatformApi";
import type { PlatformResponse } from "../../interface/PlatformResponse";
import { handleApiError } from "../../utils/errorHandler";

// Lấy tất cả platform
export const getPlatformsThunk = createAsyncThunk<PlatformResponse[], void, { rejectValue: string }>(
  'platform/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllPlatforms();
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

// Lấy platform theo ID
export const getPlatformByIdThunk = createAsyncThunk<PlatformResponse, number, { rejectValue: string }>(
  'platform/getById',
  async (id, { rejectWithValue }) => {
    try {
      return await getPlatformById(id);
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

// Tạo platform mới
export const createPlatformThunk = createAsyncThunk<PlatformResponse, PlatformResponse, { rejectValue: string }>(
  'platform/create',
  async (platform, { rejectWithValue }) => {
    try {
      return await createPlatform(platform);
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

// Cập nhật platform
export const updatePlatformThunk = createAsyncThunk<PlatformResponse, {id: number, platform: PlatformResponse}, { rejectValue: string }>(
  'platform/update',
  async ({id, platform}, { rejectWithValue }) => {
    try {
      const response = await updatePlatform(id, platform);
      return response;
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

// Xóa platform
export const deletePlatformThunk = createAsyncThunk<PlatformResponse, number, { rejectValue: string }>(
  'platform/delete',
  async (id, { rejectWithValue }) => {
    try {
      return await deletePlatform(id);
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);
