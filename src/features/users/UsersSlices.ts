import { createSlice } from '@reduxjs/toolkit';
import { createUser, getUsers, loginUser, updatePasswordThunk, updateUserThunk } from './UsersThunks';
import type { UserResponse } from '../../interface/UserResponse';


interface UserState {
  users: UserResponse[];
  user: {
    username: string;
    password: string;
    email: string;
    phone: string;
    avatar?: string;
    status?: number;
    role?: string;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchKeyword: string;
}

const innerValue = {
  username: '',
  password: '',
  email: '',
  phone: '',
  avatar: '',
  status: 0,
  role: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [] as UserResponse[],
    user: innerValue, 
    status: 'idle',
    error: null as string | null,
    searchKeyword: '',
  } as UserState,
  reducers: {
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    handleChange: (state, action) => {
      state.user = action.payload;   
    }, 
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload as UserResponse[];
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || null;
      })

      // CREATE
      .addCase(createUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.users.push(action.payload as UserResponse);
        }
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload as string || null;
      })

      // LOGIN
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload as unknown as UserResponse;
        state.error = null; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string || null;
      })

      // UPDATE
      .addCase(updateUserThunk.fulfilled, (state, action) => {            
        const index = state.users.findIndex(
          (user) => user.email === action.payload.email
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.error = null;
        console.log(state.users);
        console.log(action.payload);
      })
    
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.error = action.payload as string || null;
      })

      // UPDATE PASSWORD
      .addCase(updatePasswordThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updatePasswordThunk.rejected, (state, action) => {
        state.error = action.payload as string || null;
      })
  },
});

export const { setSearchKeyword , handleChange, setUser } = userSlice.actions;
export default userSlice.reducer;