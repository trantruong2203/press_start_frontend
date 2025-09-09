import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/UsersSlices'
import categoriesReducer from '../features/categories/CategoriesSlice'
import productCateReducer from '../features/productcate/ProductCateSlice'
import productReducer from '../features/production/ProductSlice'
import platformReducer from '../features/platform/PlatformSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    categories: categoriesReducer,
    productCate: productCateReducer,
    product: productReducer,
    platform: platformReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch