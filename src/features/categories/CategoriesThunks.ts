import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoryById, createCategory, updateCategory, deleteCategory } from "./CategoriesApi";
import type { CategoriesResponse } from "../../interface/CategoriesResponse";
import { fetchAllCategories } from "./CategoriesApi";
import type { CategoriesCreate } from "../../interface/CategoriesResponse";
import { handleApiError } from "../../utils/errorHandler";

// Lấy tất cả danh mục
export const getCategoriesThunk = createAsyncThunk<CategoriesResponse[], void, { rejectValue: string }>(
  'category/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllCategories();
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

// Lấy danh mục theo ID
export const getCategoryByIdThunk = createAsyncThunk<CategoriesResponse, number, { rejectValue: string }>(
  'category/getById',
  async (id, { rejectWithValue }) => {
    try {
      return await getCategoryById(id);
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

// Tạo danh mục mới
export const createCategoryThunk = createAsyncThunk<CategoriesResponse, CategoriesCreate, { rejectValue: string }>(
  'category/create',
  async (category, { rejectWithValue }) => {
    try {
      return await createCategory(category);
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

// Cập nhật danh mục
export const updateCategoryThunk = createAsyncThunk<CategoriesResponse, {id: number, category: CategoriesCreate}, { rejectValue: string }>(
  'category/update',
  async ({id, category}, { rejectWithValue }) => {
    try {
      const response = await updateCategory(id, category);
      return response;
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

// Xóa danh mục
export const deleteCategoryThunk = createAsyncThunk<CategoriesResponse, number, { rejectValue: string }>(
  'category/delete',
  async (id, { rejectWithValue }) => {
    try {
      return await deleteCategory(id);
    } catch (err: unknown) {
      return rejectWithValue(handleApiError(err));
    }
  }
);
