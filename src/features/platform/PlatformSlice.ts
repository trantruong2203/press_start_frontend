import { createSlice } from '@reduxjs/toolkit';
import { createPlatformThunk, getPlatformByIdThunk, updatePlatformThunk, getPlatformsThunk, deletePlatformThunk } from './PlatformThunks';
import type { PlatformResponse } from '../../interface/PlatformResponse';

interface PlatformState {
  items: PlatformResponse[];
  platform: {
    id?: number;
    name: string;
    status: boolean;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchKeyword: string;
  isEditing: boolean;
}

const innerValue = {
  name: '',
  status: false,
};

const platformSlice = createSlice({
  name: 'platform',
  initialState: {
    items: [] as PlatformResponse[],
    platform: innerValue, 
    status: 'idle',
    error: null as string | null,
    searchKeyword: '',
    isEditing: false,
  } as PlatformState,
  reducers: {
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    handleChange: (state, action) => {
      state.platform = {
        ...state.platform,
        ...action.payload,
      };
    }, 
    setPlatforms: (state, action) => {
      state.platform = {
        ...state.platform,
        ...action.payload,
      };
    },
    resetPlatform: (state) => {
      state.platform = innerValue;
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
      // GET ALL PLATFORMS
      .addCase(getPlatformsThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getPlatformsThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(getPlatformsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Lỗi khi tải danh sách platform';
      })

      // CREATE PLATFORM
      .addCase(createPlatformThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createPlatformThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = 'succeeded';
        state.error = null;
        state.platform = innerValue; // Reset form
      })
      .addCase(createPlatformThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Lỗi khi tạo platform';
      })

      // GET BY ID
      .addCase(getPlatformByIdThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getPlatformByIdThunk.fulfilled, (state, action) => {
        state.platform = {
          ...state.platform,
          ...action.payload,
        };
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(getPlatformByIdThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Lỗi khi tải thông tin platform';
      })

      // UPDATE PLATFORM
      .addCase(updatePlatformThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updatePlatformThunk.fulfilled, (state, action) => {            
        const index = state.items.findIndex(
          (platform) => platform.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.platform = innerValue; // Reset form
        state.isEditing = false;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(updatePlatformThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Lỗi khi cập nhật platform';
      })

      // DELETE PLATFORM
      .addCase(deletePlatformThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deletePlatformThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(deletePlatformThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Lỗi khi xóa platform';
      });
  },
});

export const { 
  setSearchKeyword, 
  handleChange, 
  setPlatforms, 
  resetPlatform, 
  setEditingMode, 
  clearError 
} = platformSlice.actions;
export default platformSlice.reducer;   