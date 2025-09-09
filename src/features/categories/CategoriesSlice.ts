import { createSlice } from '@reduxjs/toolkit';
import { createCategoryThunk, getCategoryByIdThunk, updateCategoryThunk, getCategoriesThunk, deleteCategoryThunk } from './CategoriesThunks';
import type { CategoriesResponse } from '../../interface/CategoriesResponse';

interface CategoryState {
  items: CategoriesResponse[];
  category: {
    id?: number;
    name: string;
    description: string;
    status: boolean;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchKeyword: string;
  isEditing: boolean;
}

const innerValue = {
  name: '',
  description: '',
  status: true,
};

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    items: [] as CategoriesResponse[],
    category: innerValue, 
    status: 'idle',
    error: null as string | null,
    searchKeyword: '',
    isEditing: false,
  } as CategoryState,
  reducers: {
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    handleChange: (state, action) => {
      state.category = {
        ...state.category,
        ...action.payload,
      };
    }, 
    setCategory: (state, action) => {
      state.category = {
        ...state.category,
        ...action.payload,
      };
    },
    resetCategory: (state) => {
      state.category = innerValue;
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
      // GET ALL CATEGORIES
      .addCase(getCategoriesThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getCategoriesThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(getCategoriesThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Lỗi khi tải danh sách danh mục';
      })

      // CREATE CATEGORY
      .addCase(createCategoryThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createCategoryThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = 'succeeded';
        state.error = null;
        state.category = innerValue; // Reset form
      })
      .addCase(createCategoryThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Lỗi khi tạo danh mục';
      })

      // GET BY ID
      .addCase(getCategoryByIdThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getCategoryByIdThunk.fulfilled, (state, action) => {
        state.category = {
          ...state.category,
          ...action.payload,
        };
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(getCategoryByIdThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Lỗi khi tải thông tin danh mục';
      })

      // UPDATE CATEGORY
      .addCase(updateCategoryThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {            
        const index = state.items.findIndex(
          (category) => category.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.category = innerValue; // Reset form
        state.isEditing = false;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(updateCategoryThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Lỗi khi cập nhật danh mục';
      })

      // DELETE CATEGORY
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Lỗi khi xóa danh mục';
      });
  },
});

export const { 
  setSearchKeyword, 
  handleChange, 
  setCategory, 
  resetCategory, 
  setEditingMode, 
  clearError 
} = categorySlice.actions;
export default categorySlice.reducer;